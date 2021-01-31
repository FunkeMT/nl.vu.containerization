# Helm3 + Istio

## Setup

Numbers before steps are a bit arbitrary, autogenerated by markdown depending on formatting, don't exactly know how markdown works yet.

1. Enable istio and wait untill pods are running/completed
`microk8s enable istio && kubectl get pods -n istio-system`

1. Create namespace for seperation.  
`kubectl create namespace inventory-app-helm`

1. Enable istio injection for namespace  
`kubectl label namespace inventory-app-helm istio-injection=enabled`

1. Create DB path  
`sudo mkdir -p /opt/postgres/helm-data`

1. Create keys
```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/O=example Inc./CN=example.com' -keyout example.com.key -out example.com.crt

openssl req -out inventory-app.example.com.csr -newkey rsa:2048 -nodes -keyout inventory-app.example.com.key -subj "/CN=10.50.100.5/O=VU organization" -addext "subjectAltName = IP:10.50.100.5"

openssl x509 -req -days 365 -CA example.com.crt -CAkey example.com.key -set_serial 0 -in inventory-app.example.com.csr -out inventory-app.example.com.crt

openssl pkcs12 -export -out inventory-app-certificate.pfx -inkey inventory-app.example.com.key -in inventory-app.example.com.crt  -certfile example.com.crt
```

1. Add CA AND client certifcate (either .pfx or .key and .crt depending on browser for client cert) to browser or use them when curl'ing e.g.
`curl --cacert example.com.crt --cert inventory-app.example.com.crt --key inventory-app.example.com.key https://10.50.100.5`

1. Create secrets that can be mounted by ingress (exact name matters)

`kubectl create -n istio-system secret tls istio-ingressgateway-certs --key inventory-app.example.com.key  --cert inventory-app.example.com.crt`
`kubectl create -n istio-system secret generic istio-ingressgateway-ca-certs --from-file=example.com.crt`

1. Install Helm charts
`helm install inventory-app-helm ./inventory-app-chart/ -n inventory-app-helm`

## Usage

- You can start Prometheus by doing microk8s istioctl dashboard prometheus
- Example queries:
```
istio_requests_total{destination_service=~".*-service.inventory-app-helm.svc.cluster.local"}
istio_request_duration_seconds_count{destination_service=~".*-service.inventory-app-helm.svc.cluster.local"}
istio_request_duration_seconds_sum{destination_service=~".*-service.inventory-app-helm.svc.cluster.local"}
```