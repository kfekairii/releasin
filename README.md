# Releasin Technical Test
## Live Demo 
>A production deployment hosted in GCP using Docker and NGINX as reverse proxy.
[Go To Link](https://digitrans.link)

> You can view the database with a selfhosted pgadmin. [pgadmin Link](https://pgadmin.digitrans.link) 
> * **email**: admin@digitrans.link
> * **password**: admin


## Run it locally
### Install docker and docker-compose
> using the Development image

```[bash]
docker-compose -f docker-compose.development.yaml up --build
``` 
> Note: if you have a local server running in PORT 80 change `nginx.conf` to listen to an other port 

after that navigate to `localhost`, if you change the port navigate to `localhost:PORT_NUMBER`

## Architechture And used Technologies
* **Front-End**: Nextjs, antd, scss
* **Back-End**: Nestjs, Prisma, Postgres
* **DevOps**: Docker, Docker Compose, Github Actions
* **Reverse Proxy**:Nginx
## How to use it?
In configs from the sidebar you can add a **Product Type Attributes**, then add a **Product Type** and finally add a **Product**

## Not Completed Parts
* Edit Product and Product types.
* Front-end needs some refactoring and performance update. 

