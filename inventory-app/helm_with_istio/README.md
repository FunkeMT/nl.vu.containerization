# Helm3 + Istio

## Setup

1. Enable istio and wait untill pods are running/completed
`microk8s enable istio && kubectl get pods -n istio-system`

1. Create namespace  
`kubectl create namespace inventory-app-istio`

1. Enable istio injection for namespace  
```
kubectl label namespace inventory-app-istio istio-injection=enabled
```

1. Apply istio gateway/virtual service defintion  
```
kubectl apply -f inventory-app-gateway.yaml -n inventory-app-istio
```

1. Create DB path  
`sudo mkdir -p /opt/postgres/helm-data`

1. Verify Helm charts

```
helm install inventory-app-helm ./inventory-app-chart/ -n inventory-app-istio --dry-run
```

1. Install Helm charts

```
helm install inventory-app-helm ./inventory-app-chart/ -n inventory-app-istio
```

## Usage

Set the hosts field in both the gateway and virtual service in inventory-app-gateway.yaml to either:
  - inventory-app-helm.com
  - "*"

If set to inventory-app-helm.com the services are only available when setting the Host header for example `curl -s -I -HHost:inventory-app-helm.com "http://$INGRESS_HOST:$INGRESS_PORT/"`
Otherwise you can just access the page in your browser using "http://$INGRESS_HOST:$INGRESS_PORT/". Port should just be 80 (so nothing probs) and the ingress host is the external IP of the istio-ingressgateway service. There is some different url matching/routing going on which can be seen in inventory-app-gateway to expose the api from a single IP.

- You can start Prometheus by doing microk8s istioctl dashboard prometheus