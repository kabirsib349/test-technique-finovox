# File Downloader - Projet Full Stack

## 1. Présentation du projet
Cette application web permet de lister et de télécharger des fichiers depuis un serveur. Le projet est composé d'un frontend développé en **React** et d'un backend développé en **Python** avec le framework **Flask**. La qualité de l'interface utilisateur (UI) et l'expérience utilisateur (UX) sont gérées grâce à l'utilisation de Material UI, tout en maintenant un backend simple et efficace.

## 2. Instructions d'installation
### Pré-requis
Avant de commencer, assurez-vous d'avoir installé:
* **Node.js** (version 16 ou supérieure)
* **Python** (version 3.10 ou supérieure)
### Installation des dépendances
Le projet étant séparé en deux parties, il faut installer les dépendances pour chaque partie.

**A) Backend (Python)**
1. Naviguez jusqu'au dossier `backend` : 
    cd backend
2. Créez et activez  un environnement virtuel:
* Créer l'environnement avec la commande suivante : python -m venv venv
* Activer l'environnement avec la commande suivante (sur Windows PowerShell) : .\venv\Scripts\Activate
3. Installer les dépendances depuis le fichier `requirements.txt` :
    pip install -r requirements.txt
  
**B) Frontend (React)**
1. Dans un autre terminal, naviguez jusqu'au dossier `file-downloader` : 
    cd file-downloader
2. Installer les dépendances Node.js :
    npm install

## 3. Commandes pour lancer l'application
**A) Lancer le backend**
1. Assurez-vous d'etre dans le dossier `backend` avec l'environnement virtuel activé.
2. Lancer le serveur Flask : 
    flask --app backend run
3. Le backend sera accessible à l'adresse http://localhost:5000
   
**B) Lancer le frontend**
1. Assurez-vous d'etre dans le dossier `file-downloader`.
2. Lancer le de développement Vite : 
    npm run dev
3. L'application sera accessible à l'adresse http://localhost:5173 (ou une autre adresse indiquée par Vite).

## 4. Exemples d'appels API
Le backend expose les deux endpoints suivants :
* `GET /api/files` : Renvoie la liste de tous les fichiers disponibles dans le dossier `files` du backend, au format JSON.
* `GET /download<nom_du_fichier>` : Déclenche le téléchargement du fichier spécifié.

## 5. ¨Procédure pour exécuter les tests
**A) Tests du backend**
1. Placez-vous dans le dossier `backend` avec l'environnement virtuel activé.
2. Lancez `pytest` : 
    pytest
**B) Tests du frontend**
1. Placez-vous dans le dossier `file-downloader`.
2. Lancez `vitest` via le script npm : 
    npm test

## 6. Choix Technique & UX
* **Frontend** : L'utilisation de **React** avec **Material UI** a permis de construire rapidement une interface réactive et esthétique. Grace aux principes de React sur la décomposition du code en plusieurs composants, nous pouvons facilement lire et maintenir le code. Les hooks personnalisés (`useFileBrowser`, `useFileDownloader`) séparent la logique de l'affichage pour une meilleure maintenabilité. L'expérience utilisateur est enrichie par des indicateurs de chargement (skeletons), un feedback visuel détaillé pour chaque téléchargement et un mode sombre.
* **Backend** : **Flask** a été choisi pour sa simplicité et sa légèreté, ce qui est idéal pour une API avec peu de routes comme la notre. La sécurité des téléchargements est assurée par la fonction `send_from_directory` de Flask.







