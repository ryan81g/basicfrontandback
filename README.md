# Basic React and Java App - Notes

This app is a simple implementation of a front and back end that I was able to build quickly to show an example of my coding style and 
a few of the technologies I prefer when building and deploying an
application.

### Installation ###

If you have a JDK version  >= 11 and a Maven 3 installation locally,
you can simply run `build.sh` at the root directory to build the project

There is a run script provided as well in this case after the build

`run.sh -d info`

The argument that the run command take is a logging level of wither info or error


Alternatively, there is a provided Dockerfile.

To build, at the root of the project run:
`docker build -t simple-app-image:latest . `

Then, once the image has been created run: `docker container run -p 8080:8080 simple-app-image:latest`


The app will be available at http://localhost:8080

### Architecture ###

The application is built on a Spring Boot back-end with a React UI.

The API exposes several methods, one to get a list of notes, and one to get specific notes, a create, and a delete. 

A swagger doc is available at `http://localhost:8080/swagger-ui/index.html`

The API uses `H2` as an in memory DB, of course this can easily be swapped for any SQL implementation.

On the front-end, a React app is using a wrapped `fetch` client to interface with the API.

For further information on the front-end architecture, please see comments within the code base.

### TODO ###

Add cloudformation to deploy to AWS Fargate