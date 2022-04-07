# EventManagement-WebApp-Server
An Express Js based server for event management webapp.

# How to run locally

Following are the steps to run the project locally without any installing, the only prerequisite is docker so make sure docker is installed and running properly in the system.

## Step - 1 - Check Docker running or Not

We can run the following command to check if any container is running and also verify if docker is running or not.

```bash
docker ps
```

Sample output

```bash
PS C:\Users\Tushar> docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                           NAMES
268b79893558   postgres         "docker-entrypoint.s…"   24 minutes ago   Up 24 minutes   0.0.0.0:5432->5432/tcp          pg_container
1b1817846440   dpage/pgadmin4   "/entrypoint.sh"         24 minutes ago   Up 24 minutes   443/tcp, 0.0.0.0:5050->80/tcp   pgadmin4_container
eb156d43fc4d   sjb/exp          "docker-entrypoint.s…"   24 minutes ago   Up 24 minutes   0.0.0.0:3030->3000/tcp          server_container
```

## Step - 2 - Creation of Network

We run the following command to check the networks available.

```bash
docker network ls
```

Sample output

```bash
PS C:\Users\Tushar> docker network ls
NETWORK ID     NAME        DRIVER    SCOPE
1b068dc9c1d2   bridge      bridge    local
70abbb302dec   db_events   bridge    local
```

we will create a new network using the following command

```bash
docker network create -d bridge events
```

Sample output

```bash
PS C:\Users\Tushar> docker network create -d bridge events
3576b6dc743648643053d83eac5fc9c39f1114f171b2048037b67427ed487060
```

```bash
PS C:\Users\Tushar> docker network ls
NETWORK ID     NAME        DRIVER    SCOPE
1b068dc9c1d2   bridge      bridge    local
70abbb302dec   db_events   bridge    local
3576b6dc7436   events      bridge    local
```

## Step - 3 - Creation of Docker Image Of Server

Run the following command to make docker image.

```bash
docker build . -t sjb/exp
```

Sample run with directory reference

```bash
PS C:\Users\Tushar\Desktop\Project\EventManagement-WebApp-Server> docker build . -t sjb/exp
```

## Step - 4 - Docker Compose up

Navigate to the MOCK folder and run the following command to star the server.

```bash
 docker compose up -d
```

Sample run with directory reference

```bash
PS C:\Users\Tushar\Desktop\Project\EventManagement-WebApp-Server\Mock> docker compose up -d
```

The services will be up and running, to check you can execute the following command , for endpoints to check the server refer the design document.

```bash
PS C:\Users\Tushar> docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED              STATUS              PORTS                           NAMES
8554c7d4b6e2   dpage/pgadmin4   "/entrypoint.sh"         About a minute ago   Up About a minute   443/tcp, 0.0.0.0:5050->80/tcp   pgadmin4_container
05e8e69ca3ea   postgres         "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp          pg_container
66a6725fbbcb   sjb/exp          "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3030->3000/tcp          server_container
```

to stop services execute the following command from the Mock folder only.

```bash
docker compose down
```

Sample run with directory reference

```bash
PS C:\Users\Tushar\Desktop\Project\EventManagement-WebApp-Server\Mock> docker compose down
```

To start the containers again just navigate to Mock folder and then execute docker compose up
