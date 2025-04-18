# Nestjs Rabbitmq, MySQL and Dev Container example

This is a simple example of a NestJS application that uses RabbitMQ and MySQL. It also includes a Dockerfile and a docker-compose.yml file to run the application in a development container.

## Prerequisites

- Docker
- Docker Compose
- VS Code
- Remote - Containers extension for VS Code

## Getting Started

1. Clone the repository
2. Open the project in VS Code
3. Press `F1` and select `Remote-Containers: Open Folder in Container...`
4. Select the project folder
5. Wait for the container to build and start
6. Open a terminal in the container
7. Run the following command to start the application:

   ```bash
   npm run start:dev
   ```

8. Open your browser and go to `http://localhost:3000` to see the application running
9. Open your RabbitMQ management console at `http://localhost:15672` (default username and password are both `guest`)
10. Open your MySQL client at `http://localhost:3306`  
11. If you using ssh to commit on git run the following command to add your ssh key to the container:

```bash
 sudo cp -r /home/youruser/.ssh/ /home/node/.ssh
```
