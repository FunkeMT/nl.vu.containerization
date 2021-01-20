# Software Containerization 2021

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
CREATE TABLE IF NOT EXISTS {} (
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