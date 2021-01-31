# Presentation

## Architecture
> Describe the architecture of the application. Describe the artifacts you created to build the docker images and to deploy the application to Kubernetes.

* [Slides] Docker architecture

* [Slides] Kubernetes architecture

* [Demo] Application

* [Demo] Show nginx CORS config  
`inventory-api/inventory-api-ingress.yaml`

* [Demo] TLS  
    * Show Certificate in Browser
    * Show Secret in Kubernetes  
    `kubectl  get secrets`  
    `kubectl describe secret inventory-app-tls-secret`

## Configuration
> Show how you configured the pre-requisites for the application (Load Balancer, Service Mesh, Storage Class, Registry etc).

* [Demo] Show microk8s nodes  
    * `kubectl get nodes`
    * `kubectl describe node mtfunke-vu-ubuntu`  
    (point to IP adress and CPU)

* [Demo] Show microk8s status  
`microk8s status`  
(point to plugins like MetalLB and HELM3 and ISTIO)

* [Demo] Show MetalLB Load Balancer  
`kubectl -n metallb-system describe configmap config`

* [Demo] Show default StorageClass  
`kubectl get sc`

* [Demo] Show registry  
`microk8s ctr images ls |grep localhost`

## Deployment
> Show how you build the container images and publish to a registry. Show how you deploy the application. Show how to scale the application horizontally (stateless parts only). Show how to uninstall the application.

## Upgrade
> Show how you re-build the application after a source code change. Show how you upgrade the running application in two ways: deployment rollout and canary update.

* [Demo] Implement API change  
    * `app.py`
    * `..v3 DEMO CHANGE`

* [Demo] Build Docker Image  
    * `docker build -t inventory-api:v7 Development/nl.vu.containerization/inventory-app/inventory-api/api-server/`

* [Demo] Tag Image for Localhost  
    * `docker tag inventory-api:v7-helm localhost:32000/inventory-api:v7-helm`

* [Demo] Change HELM chart appVersion
    * `helm/inventory-app-chart/charts/inventoryAPI/Chart.yaml`