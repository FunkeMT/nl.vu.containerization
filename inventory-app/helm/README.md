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
- Don't forget to make sure that the image required for the deployment is in the microk8s repository.


## DNS
To access the UI add the domain to `etc/hosts`:

```
127.0.0.1 inventory-app-helm.com api.inventory-app-helm.com
