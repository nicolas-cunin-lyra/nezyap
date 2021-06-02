# nezyap

Simple app to demonstrate various possibilities of OpenShift cluster with an App "payment oriented".

## Demo sprint 1

### Prerequisite
For helm to work
- helm commands indicated in the scenario must be run from `deploy/openshift` folder
- Before running helm commands, you must go to OpenShift console and copy the credentials (`https://oauth-openshift.apps.poc.pandrieux.sattamax.com/oauth/token/display`)

To be able to see project metrics:
- `cd deploy/openshift/infra`
- `kubectl apply -f monitoring/cluster-monitoring-config.yaml`
- `kubectl apply -f monitoring/openshift-user-workload-monitoring.yaml`

### Scenario
0. Create a new project `oc new-project nezyap`
1. Deploy an app base on Source-to-Image from the terminal with helm: `helm install test nezyap`
2. Show the code in GitHub, show there is no Dockerfile
3. In OpenShift console, go to developer view, click on "Start Build" for every single pod
4. Wait until pods get up
5. Call `./scripts/make-v2.sh`
6. Push to git, observe a new build starts
7. Wait until new pods get up
8. Restore v1 `./scripts/restore-v1.sh` and push
9. Remove the app from the cluster `helm uninstall test`