# My Storage

### Prod link: http://173.249.22.169:3005

## Installation

### Required Dependences
- Node JS
- Docker
- docker-compose cli

### Run local
- run ``` docker-compose up -d ``` for starting database
- Go to the server directories and run 
``` 
    npm install 
    npm run migrate
    npm run generate
    npm start
``` 
- Go to the client dierctories and run ``` npm install ``` then run ``` npm start ```

### Deploy on server
- change .env on server directories, remove "localhost" and change to the @IP your server
- run ``` docker-compose up build ``` for starting the database
- Go to the server directories and run 
``` 
    npm install 
    npm run migrate
    npm run generate
```
- Go inside src folder then run in pm2 ``` pm2 start app.js ```

## More functionalities added
- Ajout de dossier pour facilité le rangement du stockage des utilisateurs
- Supprimer des fichier
- Telecharger des fichier