# projet-7.v.01 Groupomania

# Installation

### Database setup
Ouverture du serveur

Utiliser MAMP pour accéder vers my phpadmin puis importé le fichier sql venant de ce cheminement :
```
/backend/database_mysql/groupomania.sql
```
Créer un fichier avec l'extention .ENV puis copier-les:
```
DB_HOST=localhost
DB_USER=your_databse_user
DB_PASS=your_user_password
DB_NAME=groupomania
TOKEN= Taper comme vous le souhaiter
Ps: N'oublier pas de mettre sur gitignore.
----------

Pour l'accés d'administration de modération entrer sur les champ de formulaire de "Connexion" :
```
Email:
admin@groupomania.com

Password:
TestA0
```

### Installer npm (node)
```
cd backend => npm install
```
Installer nodemon puis entrer dans le terminal comme ceci :
```
nodemon server
```
### Accés vers le projet
```
cd frontend
```
Installer encore le npm
```
npm install
```
Installer vuejs comme ceci :
```
npm install -g @vue/cli
```
Puis entrer la commande :
```
npm run serve
```
Bon visionnage !
