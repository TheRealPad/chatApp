![CI/CD Pipeline](https://github.com/TheRealPad/chatApp/actions/workflows/ci.yml/badge.svg)

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![websocket](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![springboot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

# ChatApp

Chat application using redux and a websocket

## Run

> :warning: **You need docker to run these scripts**

> By default the api run on port **8080** and the client on port **3000**

```bash
./run-all.sh # to start both services
```

```bash
./stop-all.sh # to stop both services
```

To update the config, go to ```/api``` or ```/client```

## Backend

Spring boot + Kotlin + MySQL

Run the api docker:
```bash
make # if you can use makefile

## or

docker compose -f ./docker-compose.yml up --build -d
```

Run the api without docker:
use the **bootRun** command for gradle with the env variable **SPRING_PROFILES_ACTIVE** if you want a specific configuration (for example **dev.pa** if you want to use mine)

## Frontend

React + Typescript + Redux + Websocket

Run the client docker:
```bash
make # if you can use makefile

## or

docker compose -f ./docker-compose.yml up --build -d
```
Run the client without docker:

```bash
# download the dependencies
npm install
yarn

# start the app
npm run dev
yarn dev
```

## In App screenshots

![login page](public/loginPage.png "Login page")
![chat page](public/chatPage.png "Chat page")
![conversation page](public/conversationPage.png "Conversation page")
![phone screen](public/phoneScreen.png "Phone screen")
