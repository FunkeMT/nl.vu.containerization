# Software Containerization 2021
Implements the Dockerfiles and Kubernetes configuration for

* Backend API Server
  * Python Flask
* Frontend UI
  * nginx web-server
  * AngularJS
* Database
  * PostgreSQL

## Architecture
### Docker

![Docker Architecture](https://raw.githubusercontent.com/FunkeMT/nl.vu.containerization/main/presentation/figures/docker_architecture.svg)


### Kubernetes

![Kubernetes Architecture](https://raw.githubusercontent.com/FunkeMT/nl.vu.containerization/main/presentation/figures/kubernetes_architecture.svg)

## Setup for `inventory-app`

### Docker Images
Keep in mind that you have to create each Docker image before you can start with Kubernetes.

* `inventory-api/api-server/Dockerfile`
* `inventory-ui/ui-client/Dockerfile`

And don't forget to push the Images to the Docker registry, e.g.:

`docker push localhost:32000/inventory-ui:v3`

### General
Generate configuration yaml file with `kustomization`:

`kubectl kustomize ./ > compiled.yaml`

Then apply the comiled configuration to kubernetes:

`kubectl apply -f compiled.yaml`

### Database
Create Postgres DB table:

```sql
CREATE TABLE IF NOT EXISTS book (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    quantity INT NOT NULL
);
```

### Volumes
Create storage on hard disk before creating the volume and claim:

`sudo mkdir -p /opt/postgre/data`

### DNS
To access the UI add the domain to `etc/hosts`:

```
127.0.0.1 inventory-app.com api.inventory-app.com
```

### TLS / HTTPS
If you want a self signed certificate with an own created certificate authority, follow these steps: https://stackoverflow.com/a/60516812 .

Example `$NAME.ext` contents:

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
extendedKeyUsage=serverAuth,clientAuth
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = inventory-app.com
DNS.2 = *.inventory-app.com
```


After you have created either a single self signed certificate or also the certificate authority, you have to create the Kubernetes secret out of the generated certifacte:

```
kubectl create secret tls mtfunke-ca-tls-secret \
    --cert=mtfunke-vu-ubuntu.com.crt\
    --key=mtfunke-vu-ubuntu.com.key
```

Then start the Kubernetes ingress controller with the certificate:

1. Stop Ingress  
`microk8s disable ingress`

1. Restart with certificate
`microk8s enable ingress:default-ssl-certificate=default/mtfunke-ca-tls-secret`


## Development Environment

### Inventory API `flask`
#### Create ENV variables for DB access
1. Set configuration in `inventory-api/env.sh`
1. Export ENV with  
`. inventory-api/env.sh`
1. Do NOT check-in the file!

## Istio
First enable istio

  `microk8s enable istio`
  
Wait untill all pods have status Running or Completed

  `kubectl get pods -n istio-system`
  
  `kubectl get endpoints -n istio-system`
  
For convencience

  `echo "alias istioctl='microk8s istioctl'" >> ~/.bash_aliases`
  
  `source ~/.bash_aliases`
  
Enable injection and delete pods so they get recreated with istio sidecar

  `kubectl label namespace inventory-app istio-injection=enabled`
  
  `kubectl delete pod -n inventory-app -l app=postgres && kubectl delete pod -n inventory-app  -l app=inventory-ui && kubectl delete pod -n inventory-app  -l app=inventory-api`
  
### Prometheus
Apply nodeport service to make prometheus visible from the outside:

  `kubectl apply -f $(find "$(cd ..; pwd)" -name "prometheus-np-service.yaml")`
  
Prometheus should now be accessible by visiting localhost:30909 outside of the vm
