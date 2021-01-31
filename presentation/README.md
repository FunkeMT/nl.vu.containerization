# Presentation Commands

## Architecture
> Describe the architecture of the application. Describe the artifacts you created to build the docker images and to deploy the application to Kubernetes.

* Docker architecture

* Kubernetes architecture

* Application

* Show nginx CORS config  
`inventory-api/inventory-api-ingress.yaml`

* TLS  
    * Show Certificate in Browser
    * Show Secret in Kubernetes  
    `kubectl  get secrets`  
    `kubectl describe secret inventory-app-tls-secret`

## Configuration
> Show how you configured the pre-requisites for the application (Load Balancer, Service Mesh, Storage Class, Registry etc).

* Show microk8s nodes  
    * `kubectl get nodes`
    * `kubectl describe node mtfunke-vu-ubuntu`  
    (point to IP adress and CPU)

* Show microk8s status  
`microk8s status`  
(point to plugins like MetalLB and HELM3 and ISTIO)

* Show MetalLB Load Balancer  
`kubectl -n metallb-system describe configmap config`

* Show default StorageClass  
`kubectl get sc`

* Show registry  
`microk8s ctr images ls |grep localhost`

## Deployment HELM
> Show how you build the container images and publish to a registry. Show how you deploy the application. Show how to scale the application horizontally (stateless parts only). Show how to uninstall the application.

* Build and tag Docker container images API
    * `docker build -t inventory-api:v10 inventory-app/inventory-api/api-server/`
    * `docker tag inventory-api:v10 localhost:32000/inventory-api:v10`
    * `docker push localhost:32000/inventory-api:v10`

* Build and tag Docker container images UI
    * `docker build -t inventory-ui:v10 inventory-app/inventory-ui/ui-client/`
    * `docker tag inventory-ui:v10 localhost:32000/inventory-ui:v10`
    * `docker push localhost:32000/inventory-ui:v10`

* Crate namespace  
`kubectl create namespace inventory-app-helm`

* Install HELM chart  
`helm install inventory-app-helm inventory-app/helm/inventory-app-chart/ -n inventory-app-helm`

* Scale horizontally  
`kubectl -n inventory-app-helm scale deployment/inventory-api-deployment --replicas=5`

* Uninstall HELM chart  
`helm uninstall inventory-app-helm -n inventory-app-helm`


## Upgrade
> Show how you re-build the application after a source code change. Show how you upgrade the running application in two ways: deployment rollout and canary update.

* Implement API change  
    * `app.py`
    * `..v3 DEMO CHANGE`

* Build Docker Image  
    * `docker build -t inventory-api:v7 inventory-app/inventory-api/api-server/`

* Tag and push Image for Localhost  
    * `docker tag inventory-api:v7-helm localhost:32000/inventory-api:v7-helm`
    * `docker push localhost:32000/inventory-ui:v7-helm`

* Change HELM chart appVersion
    * `helm/inventory-app-chart/charts/inventoryAPI/Chart.yaml`

* Upgrade HELM
    * `helm upgrade inventory-app-helm inventory-app/helm/inventory-app-chart/ -n inventory-app-helm`

* Watch rollout
    * `kubectl -n inventory-app-helm get pods -w`

* Canary update
    * Run two versions in paralell
    * apply (manually) deployment for canary update  
    `kubectl -n inventory-app-helm apply -f inventory-api-canary.yaml`
    * Show labels  
    `kubectl -n inventory-app-helm get pods --show-labels -w`

## GCloud
* See video recording for commands and further explanations.

## Istio
* see `../inventory-app-istio/README.md`
