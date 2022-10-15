# Development
## General 
This project consists of a frontend, which is seperated into a react app and firebase cloud functions and a backend 
that consists of a flask application in python, built to be deployed in a container hosted on AWS. 

## Backend

#### Building container 
To build the container, simply go into the financeo-backend container via terminal and enter 
`docker build -t flask-container .` whereas flask-container represents the container name. 

#### Running built container 
To run the backend locally, simply enter `docker run -p 5000:5000 flask-container` or use docker-desktop for running a 
new instance of the newly built container. 

