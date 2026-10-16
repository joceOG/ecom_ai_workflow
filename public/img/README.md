# Photos produits — mode d'emploi

Les visuels produits sont des aplats typographiques en attendant le shoot.
Pour mettre de vraies photos (les tiennes ou celles choisies sur Unsplash) :

1. Télécharge chaque photo en 1200×1500 (portrait) JPG qualité 80.
2. Nomme-les exactement comme les slugs :
   - robe-fleurie-4-ans.jpg
   - lot-3-bodies-naissance.jpg
   - pantalon-garcon-8-ans.jpg
   - baskets-enfant-32.jpg
   - sweat-capuche-mixte-12-ans.jpg
   - pack-rentree-tenue-complete.jpg
   - pyjama-bebe-12-mois.jpg
   - doudoune-junior-14-ans.jpg
3. Dépose-les dans ce dossier `public/img/`.
4. Dans `mocks/catalog.ts`, remplace `image: img('...')` par
   `image: '/img/<slug>.jpg'`.
5. Ajoute le crédit photographe dans `CREDITS.md` et dans le footer.

Les pages catalogue, fiche produit et panier affichent
automatiquement la photo dès que `image` est renseigné.
