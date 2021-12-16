

# unitedbudget
App for multi user budget management

## How run the app
### Docker
If you want run app, you must have installed Docker and Docker-compose
### Backend
Go to `/backend` folder and run `docker-compose build` - this command build the container and install required dependencies

##### After install:
Go to `/backend` folder and run `docker-compose up -d` - this command run container with installed app
now backend is avaliable on url `localhost:8000`

##### Loading Fixtures to DB
After runs a container you must go inside this container and make migrations
type command `docker exec -it unitedbudget_api bash`

now you are in `/code` directory - run migrations by command `python manage.py migrate`
after this step go to `/code/fixtures` and run script `./load_data.sh`
> if errors exist rerun script to no error situation
after this step data will be in database


### Frontend
Go to `/frontend` folder and run `docker-compose -f docker-compose.dev.yml up` - this command runs app in docker container in Development environment
now frontend is avaliable on url `localhost:3000`
> If you will run container in production go to next line

##### Run frontend with nginx in Docker
First you must create the Docker image with this command
`docker-compose -f docker-compose.prod.yml build`

Next step is for run Docker Container
`docker run -p 80:80 --name ub-front-app unitedbudget-frontend-prod`
This command run react build app in container with nginx and serve app in port 80
now frontend is avaliable on url `localhost`
> if you quit the container you have to delete the created container to restart it
`docker rm ub-front-app`

***
#### demo users:
login: mark
password: demo

login: anna
password: demo1234

login: john
password: demo1234

***
#### tests:
simple tests are implemented in backend (testing api)
if you will run test, after run backend container step into `/code` and run `pytest` command


***
TODO:
- Pagination works only if  element count is greater than 10 and if any filter is enabled
- Filtering not works well together