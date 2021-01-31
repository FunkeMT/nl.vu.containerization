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

