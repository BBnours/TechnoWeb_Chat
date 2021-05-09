# TechnoWeb_Chat

Projet réaliser avec React et UI Material

## Pre-reqs
- NodeJS
- NPM 

### Pour récupérer le projet

``
https://github.com/BBnours/TechnoWeb_Chat.git
``

### Installer/mettre à jours les librairies nécessaires
Côté Client (cd Client)

``
npm install i
``

Côté Serveur (cd Serveur)

``
npm install i
``
### Lancer le serveur
Côté Client (cd Client)

``
npm run start
``

Côté Serveur (cd Serveur)

``
npm run start
``


## Projet 

Ce projet a pour sujet la reproduction d'un chat à la manière de telegram.
On peut :
- S'authentifier
- Se déconnecter
- S'inscrire
- Naviguer au travers de ses channels
- Voir les messages du chanel sélectionné
- Partager l'accès au canal avec d'autres utilisateurs
- Envoyer un nouveau message
- Modifier/supprimer son message
- Être représenté par un avatar
- Modifier son compte
- Changer l'apparance de l'application

### Interaction

Sur la page de connection nous avons deux boutons, un pour se connecter et un pour se créer un compte.

Sur la page de la création de compte nous avons deux boutons, un pour revenir à la page de connection et un pour se créer un compte.

Sur la page de bienvenue nous avons un bouton "Continuer" qui nous emmène à l'application.

Sur l'application en haut à droit on a deux boutons, le plus en haut est pour accèder aux paramètres et celui en dessous pour se déconner.
En bas de la page nous avons un bouton pour créer un channel et dans la discussion un bouton pour envoyer le message saisie

Sur la page Settings, il y a deux boutons : un pour revenir sur l'application a tout moment sans sauvegarder et un autre pour update. Avec update, on reste sur la page au cas où nous souhaitons faire d'autre modifications.

### Fonctionalité
####  Login
Nous nous connectons à l'application grâce à notre email et mot de passe. 
Si nous essayons de nous connecter sans compte, on ne pourra pas continuer vers les channels.

#### Création de compte
Pour la toute première utilisation, nous pouvons nous créer un compte, 
si et seulement si l'adresse mail utilisée n'appartient pas déjà à un compte.

#### Liste des channels
Une fois connecté et avoir passer la page de bienvenue, nous avons accès à nos channels déjà existant (si on en a).
Mais nous pouvons aussi en créer de nouveaux.

**Important**: Nous avons accès qu'aux channels que nous avons créer ou sommes invité.

#### Ajouter des utilisateurs dans les channels
Si nous le souhaitons nous pouvons à tout moment ajouter de nouveaux utilisateurs au channel.
Il suffit d'entrer les mails des utilisateurs séparé par un point-virgule.

#### Messages d'un channels
Lorsque nous cliquons sur un channel on peut voir les messages qui le compose.

#### Envouer un message
Nous pouvons voir les messages d'un channels mais également en envoyer.

#### Modifier/supprimer un message
Si nous le souhaitons nous pouvons supprimer/modifier un message que nous avons déjà envoyer.

**Important**: nous pouvons effectuer ses fonctions uniquement sur nos messages.

#### Modifier le thème
Dans les paramètres nous avons la possibilité de changer le thème de l'application pour qu'elle soit Dark ou Light.

#### Modifier le nom et l'avatar
Toujours dans les paramètres nous avons la possibilité de modifier le nom et l'avatar qu'on a.
*Attention*: les deux doivent être modifié en même temps.

#### Liste des languages(pas encore incorporé)
Dans la page des paramètres on a une liste déroulant des différents langue prise en compte par l'application

## Auteur 

GOMES Olivier / PONZETTO Romain

