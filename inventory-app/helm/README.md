# Helm3

## Setup

1. Create namespace  
`kubectl create namespace inventory-app-helm`

1. Create DB path  
`sudo mkdir /opt/postgres/helm-data`

1. Install Helm charts

```
helm install -f ./inventory-db.yaml inventory-db ./postgres -n inventory-app-helm
helm install -f ./inventory-api.yaml inventory-api ./app -n inventory-app-helm
helm install -f ./inventory-ui.yaml inventory-ui ./app -n inventory-app-helm
helm install -f ./inventory-api-ingress.yaml inventory-api-ingress ./ingress -n inventory-app-helm
helm install -f ./inventory-ui-ingress.yaml inventory-ui-ingress ./ingress -n inventory-app-helm
```