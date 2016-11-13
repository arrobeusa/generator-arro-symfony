## Dev Setup

### Generate the keypair

    $ bash ./build/conf/ssh/client/gen_keypair.sh

### Build the image and run the container

    $ docker build --rm -t <%= appOrganization %>/<%= appNameSlug %> .
    $ docker run --name <%= appNameSlug %> -d -v "`pwd`/build/conf/ssh/client":/root/conf/ssh/client -d -p 0.0.0.0:2223:22 -p 8000:80 -e "MONGO.HOST=<%= mongoHost %>" -e "MONGO.DATABASE=<%= appNameSlug %>" <%= appOrganization %>/<%= appNameSlug %>

#### With Docker Compose

    $ docker-compose build
    $ docker-compose up

### Start SSH on the container

    $ docker exec -it <%= appNameSlug %> bash

Inside the container, run the following:

    $ bash /root/shell/run.sh nokeepalive
    $ exit

### Verify it all works

#### Ensure you can SSH into the container (TODO: we can probably deprecate this)
    $ ssh -i ~/.ssh/arro -p 2223 web@`docker-machine ip default` "echo 'SSH connection OK'"

### Some other stuff we'll need along the way

    $ docker stop $(docker ps -a -q)
    $ docker rm $(docker ps -a -q)

### Sometimes you just need to start fresh

    $ docker-machine restart|start
    $ eval $(docker-machine env)

### Troubleshooting

#### SSH into your container

    $ docker exec -it <%= appNameSlug %> bash

## Running Tests

    $ cd source/garden
    $ node garden.js test features/api -d
    $ node garden.js test features/ui -d

## Known Issues

* The garden DB in app/config.json is hard coded to "symfony-stack". In other areas, of the scaffolding,
the database is based on the the app name. Neither of these is ideal. Ultimately, we'll prompt the user
and apply accordingly to the code.


