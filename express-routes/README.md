# Basic
A simple example about Express routes

- Express

## Routes
- Root - `/`
    `curl -w "\n" "http://localhost:3000/"`
- Request params and path - `/request`
    `curl -w "\n" "http://localhost:3000/request?foo=bar&x=y"`
- Request body - POST
    `curl -w "\n" -X POST -d "foo=bar&x=y" "http://localhost:3000/body"`
- Params
    `curl -w "\n" "http://localhost:3000/parent/1/child/2"`

## References
Skeleton from [Express application generator](https://expressjs.com/en/starter/generator.html)
