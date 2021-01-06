# Basic example (Dockerized)
Basic setup dockerized:
- Express
- Docker

## Routes
- Root - `/`

## Instructions
- Build using `docker build -t <name> .`
- Run using `docker run -p 3000:3000 <name>`, where the first `3000` refers to
the host port and the second `3000` refers to the port in the container
(set in the Dockerfile).

## References
Skeleton from [Express application generator](https://expressjs.com/en/starter/generator.html)
