-- Seed KidiShop (issu de mocks/catalog.ts)
INSERT INTO categories (slug, univers, name) VALUES
  ('bebe','bebe','Bébé 0-24M'),
  ('fille','fille','Fille 2-16A'),
  ('garcon','garcon','Garçon 2-16A'),
  ('chaussures','chaussures','Chaussures 16-42'),
  ('accessoires','accessoires','Accessoires'),
  ('packs','packs','Packs & Lots')
ON CONFLICT (slug) DO UPDATE SET univers=EXCLUDED.univers, name=EXCLUDED.name;

INSERT INTO shipping_zones (id, name, base_fee, per_kg, free_from, eta) VALUES
  ('locale','Ville locale (Dakar)',1500,0,50000,'24-48h'),
  ('nationale','Nationale',2500,500,80000,'2-4j'),
  ('inter','International',9000,2500,150000,'5-10j'),
  ('relais','Point relais',1000,0,50000,'48h'),
  ('retrait','Retrait boutique',0,0,0,'Prêt en 2h')
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, base_fee=EXCLUDED.base_fee,
  per_kg=EXCLUDED.per_kg, free_from=EXCLUDED.free_from, eta=EXCLUDED.eta;

INSERT INTO coupons (code, type, value, label, active) VALUES
  ('KIDS10','percent',10,'-10% avec KIDS10',TRUE),
  ('LIVRAISON','freeship',0,'Livraison offerte',TRUE),
  ('PACK21','percent',15,'-15% pack (mock 2+1)',TRUE)
ON CONFLICT (code) DO UPDATE SET type=EXCLUDED.type, value=EXCLUDED.value,
  label=EXCLUDED.label, active=EXCLUDED.active;

INSERT INTO size_guide (age, cm, poitrine, poids) VALUES
  ('0-3M','62','40','3-6kg'),
  ('3-6M','68','44','6-8kg'),
  ('12M','80','48','9-10kg'),
  ('24M','92','52','11-13kg'),
  ('2A','92','54','13kg'),
  ('4A','104','58','17kg'),
  ('6A','116','62','21kg'),
  ('8A','128','66','26kg'),
  ('10A','140','70','32kg'),
  ('12A','152','76','40kg'),
  ('14A','164','82','50kg'),
  ('16A','176','88','60kg')
ON CONFLICT (age) DO UPDATE SET cm=EXCLUDED.cm, poitrine=EXCLUDED.poitrine, poids=EXCLUDED.poids;

-- Products
INSERT INTO products (slug, name, univers, category, price, old_price, rating, reviews, material, colors, tags, is_new, promo, image, description) VALUES
  ('robe-fleurie-4-ans','Robe fleurie 4 ans','fille','Robes',8500,12000,4.6,42,'Coton bio','{Rose,Blanc}','{robe,fille,ete}',FALSE,TRUE,'','Robe légère coton bio, parfaite été et cérémonies. Taille grand, prendre taille habituelle.'),
  ('lot-3-bodies-naissance','Lot 3 bodies naissance','bebe','Bodies',9500,NULL,4.9,128,'Coton bio','{Blanc,Beige}','{body,bebe,lot,naissance}',TRUE,FALSE,'','Lot de 3 bodies manches longues, boutons pression sans nickel.'),
  ('pantalon-garcon-8-ans','Pantalon garçon 8 ans','garcon','Pantalons',11000,NULL,4.4,19,'Jean stretch','{Bleu}','{pantalon,garcon,jean}',FALSE,FALSE,'','Jean résistant genoux renforcés, taille ajustable.'),
  ('baskets-enfant-32','Baskets enfant','chaussures','Baskets',15000,18000,4.7,63,'Toile + gomme','{Blanc,Marine}','{basket,chaussure,sport}',FALSE,TRUE,'','Baskets scratch, semelle antidérapante, du 28 au 38.'),
  ('sweat-capuche-mixte-12-ans','Sweat capuche mixte 12 ans','garcon','Sweats',12500,NULL,4.8,31,'Molleton gratté','{Gris,Vert}','{sweat,mixte,hiver}',TRUE,FALSE,'','Sweat chaud, poche kangourou, aussi en taille Young S/M.'),
  ('pack-rentree-tenue-complete','Pack rentrée tenue complète','packs','Packs',25000,32000,5.0,12,'Coton + jean','{Mix}','{pack,rentree,lot}',FALSE,TRUE,'','Pack 3 pièces : t-shirt x2 + pantalon + chaussettes. Économise 7000 FCFA.'),
  ('pyjama-bebe-12-mois','Pyjama bébé 12 mois','bebe','Pyjamas',6500,NULL,4.5,27,'Velours','{Jaune}','{pyjama,bebe}',FALSE,FALSE,'','Pyjama velours ouverture devant, pieds antidérapants.'),
  ('doudoune-junior-14-ans','Doudoune junior 14 ans','fille','Vestes',28000,NULL,4.3,9,'Polyester recyclé','{Noir,Rose}','{doudoune,hiver,veste}',FALSE,FALSE,'','Doudoune chaude -5°C, capuche amovible, aussi Young.')
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, univers=EXCLUDED.univers, category=EXCLUDED.category,
  price=EXCLUDED.price, old_price=EXCLUDED.old_price, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews,
  material=EXCLUDED.material, colors=EXCLUDED.colors, tags=EXCLUDED.tags, is_new=EXCLUDED.is_new,
  promo=EXCLUDED.promo, description=EXCLUDED.description, updated_at=now();

-- Variants
INSERT INTO variants (sku, product_slug, age, size_cm, shoe, color, price, old_price, stock) VALUES
  ('ROBE4A-R-2A','robe-fleurie-4-ans','2A','92',NULL,'Rose',8500,12000,12),
  ('ROBE4A-R-4A','robe-fleurie-4-ans','4A','104',NULL,'Rose',8500,12000,5),
  ('ROBE4A-R-6A','robe-fleurie-4-ans','6A','116',NULL,'Rose',8900,NULL,0),
  ('BODY-0M','lot-3-bodies-naissance','0-3M','62',NULL,'Blanc',9500,NULL,30),
  ('BODY-6M','lot-3-bodies-naissance','3-6M','68',NULL,'Beige',9500,NULL,22),
  ('PANT-6A','pantalon-garcon-8-ans','6A','116',NULL,'Bleu',10500,NULL,8),
  ('PANT-8A','pantalon-garcon-8-ans','8A','128',NULL,'Bleu',11000,NULL,14),
  ('PANT-10A','pantalon-garcon-8-ans','10A','140',NULL,'Bleu',11500,NULL,3),
  ('BSK-30','baskets-enfant-32','6A',NULL,'30','Blanc',15000,18000,9),
  ('BSK-32','baskets-enfant-32','8A',NULL,'32','Blanc',15000,18000,6),
  ('BSK-34','baskets-enfant-32','10A',NULL,'34','Marine',15500,NULL,0),
  ('SWT-10A','sweat-capuche-mixte-12-ans','10A','140',NULL,'Gris',12000,NULL,11),
  ('SWT-12A','sweat-capuche-mixte-12-ans','12A','152',NULL,'Gris',12500,NULL,7),
  ('SWT-YM','sweat-capuche-mixte-12-ans','Young M','170',NULL,'Vert',13500,NULL,4),
  ('PACK-6A','pack-rentree-tenue-complete','6A','116',NULL,'Mix',25000,32000,10),
  ('PACK-8A','pack-rentree-tenue-complete','8A','128',NULL,'Mix',25500,32500,8),
  ('PYJ-6M','pyjama-bebe-12-mois','3-6M','68',NULL,'Jaune',6000,NULL,15),
  ('PYJ-12M','pyjama-bebe-12-mois','12M','80',NULL,'Jaune',6500,NULL,18),
  ('DOU-12A','doudoune-junior-14-ans','12A','152',NULL,'Noir',27000,NULL,5),
  ('DOU-14A','doudoune-junior-14-ans','14A','164',NULL,'Noir',28000,NULL,6)
ON CONFLICT (sku) DO UPDATE SET product_slug=EXCLUDED.product_slug, age=EXCLUDED.age,
  size_cm=EXCLUDED.size_cm, shoe=EXCLUDED.shoe, color=EXCLUDED.color, price=EXCLUDED.price,
  old_price=EXCLUDED.old_price, stock=EXCLUDED.stock;
