# Software Containerization 2021

## Setup for `inventory-app`

### General
Generate configuration yaml file with `kustomization`:

`kubectl kustomize ./ > compiled.yaml`

Then apply the comiled configuration to kubernetes:

`kubectl apply -f compiled.yaml`