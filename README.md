# nezyap

Simple app to demonstrate various possibilities of OpenShift cluster with an App "payment oriented".

## Demo sprint 1

### Prerequisite
For helm to work
- helm commands indicated in the scenario must be run from `deploy/openshift` folder
- Before running helm commands, you must go to OpenShift console and copy the credentials (`https://oauth-openshift.apps.poc.pandrieux.sattamax.com/oauth/token/display`)
  
Publish images used by the application:
- authenticate with docker on openshift-image-registry (not using CI for this POC) `docker login -u kubeadmin -p `oc whoami -t` https://openshift-registry.apps.poc.pandrieux.sattamax.com`
- build source code with `./scripts/build-all.sh` then build images with `./scripts/build-all-docker.sh`
- Publish the current image versions to OpenShift registry by pushing these images, for instance: `./scripts/push-to-openshift-image-registry.sh local`
- Create a v2, build code, build images with `./scripts/make-v2.sh`
- Publish these image versions to OpenShift registry: `./scripts/push-to-openshift-image-registry.sh v2`
- Restore files with `./scripts/restore-v1.sh`

### Scenario
1. In OpenShift console, go to developer view
2. Deploy an app from the terminal with helm: `helm install test nezyap`
3. Introduce the project dashboard with pods, deployments, logs, metrics
4. Introduce the landing view: topology with the ability to add links in order to share a common understanding of the various services exposed and their dependencies
5. Introduce the main app features: catalog, payment, transaction list and transaction detail: `http://catalog.backend.apps.poc.pandrieux.sattamax.com/`
6. Make the catalog backend unhealthy: `http://catalog.backend.apps.poc.pandrieux.sattamax.com/health/break` and show the pod restarting by itself with a temporary unavailability of the service (go back to catalog view and show view is there but no catalog is shown inside the app)
7. Increase pod number by using an Horizontal Pod Autoscaler to scale-out/scale-in the pods according to the needs: `helm upgrade test nezyap --set autoscaling.enabled=true`
8. Show business metrics per pod `sum(nb_transactions) by (pod)` and consolidated per service `sum(nb_transactions) by (service)`
9. Rolling upgrade to a V2 of the code (blue background will become green): `helm upgrade test nezyap --set image.version=v2 --set autoscaling.enabled=true`
10. Rollback from the OpenShift console with the Helm view (backgroud goes back to blue)