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

## Repository structure

* `inventory-app`: Main application. Contains all necessary files and configurations for Docker and Kubernetes as shown in the presentation (except Istio).
  * `inventory-api`
    * `api-server`: Holds Flask app and the Dockerfile
    * `*.yaml`: Kubernetes configuration files (manual deployment)
  * `inventory-db`:
    * `*.yaml`: Kubernetes configuration files (manual deployment)
  * `inventory-ui`:
    * `ui-client`: Holds the AngularJS UI and the Dockerfile
    * `*.yaml`: Kubernetes configuration files (manual deployment)
  * `helm`: Helm chart for the entire application.
  * `gcloud`: Configuration for Google Cloud Platform.

* `inventory-app-istio`: Istio version. Contains several necessary application changes for Istio. If you want to use Istio, use and build all Docker images out of this sub-dir.

* `presentation`: Contains all files for the final presentation.

## Commands
> All commands used in the presentation video and further comands like configuration, deployment, upgrade, gcloud, istio can be found in `presentation/README.md`

## Commands required to build the images

### API

* `docker build -t inventory-api:vX inventory-app/inventory-api/api-server/`
* `docker tag inventory-api:vX localhost:32000/inventory-api:vX`
* `docker push localhost:32000/inventory-api:vX`

### UI

* `docker build -t inventory-ui:vX inventory-app/inventory-ui/ui-client/`
* `docker tag inventory-ui:vX localhost:32000/inventory-ui:vX`
* `docker push localhost:32000/inventory-ui:vX`

### DB
> Not necessary. DockerHub image is used.

## Commands required to deploy the Kubernetes application (HELM)

### Preparation
* Create storage on hard disk before creating the volume and claim  
`sudo mkdir -p /opt/postgre/data`

* DNS entry at `etc/hosts`
`127.0.0.1 inventory-app-helm.com api.inventory-app-helm.com`

* TLS certificate (script or manually)
`sh inventory-app/scripts/create_certificate`

### Kubernetes
* Crate namespace  
`kubectl create namespace inventory-app-helm`

* Install HELM chart  
`helm install inventory-app-helm inventory-app/helm/inventory-app-chart/ -n inventory-app-helm`

