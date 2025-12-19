🛠️ Repair Shop Backend – DS2 Mini-Projet

📌 Description

Ce projet est une API REST backend développée avec NestJS, TypeScript et MySQL, destinée à une société de réparation et de reconditionnement d’appareils électroniques.

L’application permet de :

gérer les utilisateurs (Admins et Techniciens),

gérer le stock de pièces détachées,

suivre les appareils en réparation,

enregistrer les interventions effectuées par les techniciens.

🧱 Stack Technique

Framework : NestJS (TypeScript)

Base de données : MySQL

ORM : TypeORM

Sécurité :

Authentification JWT

Mots de passe hashés avec Bcrypt

Guards et gestion des rôles (ADMIN / TECH)

Qualité :

DTOs

Validation avec class-validator

Transactions pour les opérations critiques

👥 Rôles Utilisateurs

ADMIN (Manager)

Gère les utilisateurs

Gère le stock des pièces

Supervise les appareils et les interventions

TECH (Technicien)

Enregistre les appareils

Crée les interventions

Met à jour le statut des appareils

🔐 Module 1 – Authentification & Users

POST /auth/register
→ Création de compte (TECH par défaut, ADMIN uniquement par un admin)

POST /auth/login
→ Authentification et génération d’un JWT

GET /users/profile
→ Profil de l’utilisateur connecté (ADMIN uniquement)

🔹 Bonus Admin

GET /users → Liste des utilisateurs

PATCH /users/:id/role → Changer le rôle d’un utilisateur

DELETE /users/:id → Supprimer un compte

📦 Module 2 – Gestion du Stock (Spare Parts)

GET /parts → Voir le stock (utilisateurs authentifiés)

POST /parts → Créer une pièce (ADMIN)

PATCH /parts/:id → Modifier stock ou prix (ADMIN)

DELETE /parts/:id → Supprimer une pièce (ADMIN)

🔹 Bonus

GET /parts/:id

PATCH /parts/:id/add-stock

PATCH /parts/:id/remove-stock

📱 Module 3 – Gestion des Appareils (Devices)

POST /devices → Enregistrer un appareil

GET /devices → Liste des appareils

DELETE /devices/:id → Supprimer un appareil (ADMIN)

🔹 Bonus

GET /devices/:id

PATCH /devices/:id/status

PATCH /devices/:id/grade

🔧 Module 4 – Atelier (Interventions)

POST /interventions → Création d’une intervention (TECH uniquement)

Logique métier :

Le technicien connecté est assigné automatiquement

Vérification et décrémentation du stock des pièces (transaction)

Passage du device au statut REPAIRING

Création de l’intervention liée au device et aux pièces

🔹 Bonus

GET /interventions → Liste des interventions

GET /interventions/:id → Consultation sécurisée

🧪 Tests

Tests manuels réalisés avec Postman

Scénario utilisateur complet validé :

Création admin / technicien

Gestion stock

Enregistrement device

Création intervention avec mise à jour automatique

"Une collection Postman complète (ds2_repair_shop_backend.postman_collection.json) est disponible dans le dossier /postman. Elle inclut toutes les requêtes nécessaires pour tester les différents modules (Auth, Stock, Devices, Interventions) ainsi que le scénario de validation des transactions."

▶️ Lancer le projet
npm install
npm run start


Le serveur démarre sur :

http://localhost:3000

👩‍💻 Réalisé par

RIHAB BEN MAIZ
Mini-Projet DS2 – Développement Backend (NestJS)