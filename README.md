To start the application locally without runnin docker, run the following commands
- Uncomment the "DATABASE_URL" under "run local" and comment out "DATABASE_URL" and "POSTGRES_PASSWORD" under "run docker container"
- npm  install
- npm run start
- npm run dev**

This will startup the application locally on port 3300 http://localhost:3300/ 

TO test this application when running locally  

- node dist/cli.js fetch <username>
- node dist/cli.js list
- node dist/cli.js list-location <location>
- node dist/cli.js list-location 'Newcastle - England'



However, to run this application using docker, this will run two containers named index(application container) and db(database container)  

The following commands will startup application using docker  

- Uncomment the database URL named "run docker container" and comment out "run local"
- **docker-compose --build -d** This run the containers in the background and the --build flag is to ensure that the docker image is built the first time  

Subsequently, to startup the containers, docker-compose -d should suffice unless changes are made to the package.json or Dockerfile.  

To test this application when running on docker,
http://localhost:3300/github/users This will fecth all the usersin in the database  

http://localhost:3300/github/fetch/{github_username} this will fecth the credentials of any github user when specifying the github username  
http://localhost:3300/github/users/location/{location} this fetches user according to the location


TO test this application when running locally  

- node dist/cli.js fetch <username>
- node dist/cli.js list
- node dist/cli.js list-location <location>
- node dist/cli.js list-location 'Newcastle - England'


Docker Image Hardening solutions on the application explained  

Docker Compose File:

security_opt: no-new-privileges:true
This option ensures that processes in the container cannot gain new privileges. It will help to mitigate attacks from excalating.

cap_drop: - ALL
By dropping all Linux capabilities, this limits the attack surface in the event of an attack

Environment Variable Management:
I managed all environment variables in the .env file so no secrets will be managed in the repo.

Dockerfile:

Base Image: Base image was pulled from official repo alpine linux

Non-Root User:
This application creates and uses a non-root user (appuser) for running the application. This reduces the risk of privilege escalation attacks and limits the impact of potential vulnerabilities in the application.

Directory Permissions:
The RUN addgroup -S appgroup && adduser -S appuser -G appgroup command ensures that the application runs with restricted permissions by creating a non-root user and group.

Improvements:

Log aggregation: Pulling all logs from the docker container and managing it one place using tools like splunk  

SSL: the connection done between the application and database is over http. however, this should be done via https if an ssl certifcate exists

