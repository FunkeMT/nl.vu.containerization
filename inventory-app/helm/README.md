# Helm3

## Setup

1. Create namespace  
`kubectl create namespace inventory-app-helm`

1. Create DB path  
`sudo mkdir -p /opt/postgres/helm-data`

1. Verify Helm charts

```
helm install inventory-app-helm ./inventory-app-chart/ -n inventory-app-helm --dry-run
```

1. Install Helm charts

```
helm install inventory-app-helm ./inventory-app-chart/ -n inventory-app-helm
```
