# Software Containerization 2021

## Setup for `inventory-app`

### General
Generate configuration yaml file with `kustomization`:

`kubectl kustomize ./ > compiled.yaml`

Then apply the comiled configuration to kubernetes:

`kubectl apply -f compiled.yaml`

### TLS / HTTPS
If you want a self signed certificate with an own created certificate authority, follow these steps: https://stackoverflow.com/a/60516812 .

After you have created either a single self signed certificate or also the certificate authority, you have to create the Kubernetes secret out of the generated certifacte:

```kubectl create secret tls mtfunke-ca-tls-secret \
    --cert=mtfunke-vu-ubuntu.com.crt\
    --key=mtfunke-vu-ubuntu.com.key
```

Then start the Kubernetes ingress controller with the certificate:

1. Stop Ingress  
`microk8s disable ingress`

1. Restart with certificate
`microk8s enable ingress:default-ssl-certificate=default/mtfunke-ca-tls-secret`