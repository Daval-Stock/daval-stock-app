# daval-stock-app
Projet de fin d'étude Responsable de Projet Informatique
---

# Application de Gestion de Stock pour une pharmacie

L'application de Gestion de Stock est une solution moderne pour gérer les stocks de produits, suivre les mouvements de stock et obtenir un aperçu clair des articles en stock.

## Fonctionnalités

- **Inventaire des produits** : Ajoutez, mettez à jour et supprimez des produits avec des détails tels que le nom, la description, le prix et la quantité en stock.
- **Mouvements de stock** : Suivez les entrées et sorties de stock pour chaque produit.
- **Alertes de stock bas** : Recevez des notifications au niveau de l'interface ou par mail pour le fournisseur
     lorsque la quantité d'un produit est inférieure à un seuil prédéfini.
- **Alertes d'expiration des produits**: recevez des notification lorsqu'un produits arrive à expiration
- **Tableau de bord** :Avoir un aperçu global sur l'état du stock.

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/Daval-Stock/daval-stock-app.git
```

2. Installez les dépendances :
```bash
cd daval-stock-app/
npm install
```

3. Configurez votre base de données en modifiant le fichier `.env`.

4. Lancez l'application :
  Ouvrez deux terminal
    **placez vous au niveau du dossier racine du backend pour faire  
```bash
npm start
```
   ** placez vous au niveau du dossier racine du frontend pour faire  
```bash
npm run dev
```

L'application devrait maintenant tourner sur `http://localhost:3000`.

## Utilisation

1. Créez un compte utilisateur.
2. Ajoutez vos produits via l'interface de gestion des produits.
3. Mettez à jour le stock comme nécessaire.
4. Gestion des utilisateurs et attributions des rôles lorsqu'on est admin
5. Gestion des différents sites de la pharmacie

## Remerciements

- Merci à @BaldeAl , @DG-Elom et @alaminediassy pour avoir contribués à la conception et à la réalisation de cette application.
- Merci à tous ceux qui ont contribué au code et à la documentation.

---

