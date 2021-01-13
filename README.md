# Software Containerization 2021

## Setup for `simple-app`

### General
1. Create namespace  
`kubectl create ns simpleapp-reactapp`

### Backend - Database
1. Apply MongoDB deployment  
`kubectl apply -f simple-app/database/db-deployment.yml`

1. Connect to MongoDB to test the connection

    * find pod  
    `kubectl -n simpleapp-reactapp get pods -o wide`
    * connect to pod  
    `kubectl exec -n simpleapp-reactapp backend-db-8544dd5f94-4sp8f -it -- sh`
    * connect to MongoDB  
    `mongo mongodb://root:root@mongo-cluster:27017/admin`
    * insert sample data  
    `db.createCollection("contacts")`  
    `db.contacts.insert([{fname:'abcd',lname:'cccc',email:'abc@email.com',phone:'1234567',address:'34, test city,CA,USA'},{fname:'name1',lname:'user',email:'email2@abc.com',phone:'234567',address:'99,our city,TX,USA'}])`

### Backend - API - Flask
1. Create Docker image   

    * build image  
    `docker build simple-app/backend/Dockerfile`
    * list images to get image-ID  
    `docker images`
    * tag image  
    `docker tag 1a0297baaf3c simple-app-backend-api:v1`

1. Tag and push image to local registry

    * create image for local-registry  
    `docker tag simple-app-backend-api:v1 localhost:32000/simple-app-backend-api:v1`
    * push to local registry  
    `docker push localhost:32000/simple-app-backend-api`

1. Apply Flask deployment  
`kubectl apply -f simple-app/backend/flask-deployment.yml`

1. Check if pod is running  
`kubectl -n simpleapp-reactapp describe pod backend-api`

1. Check services  
`kubectl -n simpleapp-reactapp get svc`

1. Test if Flask is running  
`curl http://10.152.183.212:5000` -> `My Simple App`

1. It is also possible to check if Flask is running by forwarding the port (forwarding is not persistent!)  
`microk8s kubectl port-forward -n simpleapp-reactapp service/flask-api-cluster  --address 10.0.2.15 5055:5000`  
`curl -k http://10.0.2.15:5055`

### Frontend - react - nginx
The react app will be build automatically while the docker image is created.

1. Create Docker image  

    * build image  
    `docker build simple-app/frontend/Dockerfile`
    * list images to get image-ID  
    `docker images`
    * tag image  
    `docker tag 1a0297baaf3c simple-app-frontend:v1`

1. Tag and push image to local registry

    * create image for local-registry  
    `docker tag simple-app-frontend:v1 localhost:32000/simple-app-frontend:v1`
    * push to local registry  
    `docker push localhost:32000/simple-app-frontend`

1. Apply nginx deployment  
`kubectl apply -f simple-app/frontend/nginx-deployment.yml`

1. Inspect NodePort of `react-client`  
`kubectl -n simpleapp-reactapp get services`

1. Inspect node IP from the host system  
`kubectl get nodes -o wide`

1. The app is now from outside accesible via  
`http://hostIP:nodePort`  
`http://10.0.2.15:32741`