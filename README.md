# nezyap

## Demo sprint 1
1. Aller sur la vue Developeur
2. Déploiement d'une app depuis le terminal sur le poste de dev avec helm `helm install test nezyap`
3. Montrer le dashboard projet avec les pods, les déploiements, les logs
4. Montrer la vue principale "topology" en mode "archi" avec les services et la possibilité d'ajouter des liens pour montrer l'idée de l'app multi containers
5. Montrer les quelques fonctionnalités de l'App (catalog, paiement, liste de transactions et détail)
6. Mettre un app unhealthy et voir que le pod se relance tout seul (indisponibilité temporaire du service car un seul pod)
7. Augmentation du nombre de pods avec utilisation d'un hpa pour scale-out/scale-in des pods `helm upgrade test nezyap --set autoscaling.enabled=true`
8. Metrique métier répartie par pod `sum(nb_transactions) by (pod)` et consolidés par service `sum(nb_transactions) by (service)`
9. Rolling upgrade vers nouveau code (le fond d'écran passe du bleu au vert) avec déploiement depuis le poste de dev `helm upgrade test nezyap --set image.version=v2`
10. Rollback depuis la console d'administration (le fond d'écran repasse au bleu)