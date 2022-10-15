# Development
## General 
This project consists of a frontend, which is seperated into a react app and firebase cloud functions and a backend 
that consists of a flask application in python, built to be deployed in a container hosted on AWS. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Frontend 

#### Hot reload 
To run the front end locally, go into the financeo-frontend folder and press `npm start`

#### Deployment
To deploy the frontend inclusively firebase' Google Cloud Functions, first build the frontend by entering 
`npm run build` in the frontend folder, followed by entering the deploy instruction `firebase deploy`


