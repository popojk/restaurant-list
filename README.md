# My Restaurant List
## Introduction
Keep track of your own restaurant listings where you can browse restaurants, view details, and even link to a map.
## Function
- Register user.
- Login user.
- Login with facebook account.
- View all restaurants.
- Browse restaurant details.
- Search for a specific restaurant.
- Add restaurant.
- Edit restaurant.
- Delete restaurant.
## START
1. Make sure you have installed `node.js` and `npm`.
2. Clone the project locally.
3. After opening locally, enter the folder through the terminal and enter : `npm install`
4. create .env file with bellow settings:
```
MONGODB_URI=<your mongo db url>
SESSION_SECRET=<your secret>
PORT=3000
FACEBOOK_ID=<your facebook ID>
FACEBOOK_SECRET=<your facebook secret>
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```
5. Once installed, go ahead and type : `npm run start`
6. If you see this line of information, it means that it is running smoothly. Open your browser and enter the following URL : \
`Express is listening on localhost http://localhost:3000`
7. Stop using : `ctrl + c`
