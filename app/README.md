# Basic app and API without authentication
- Express
- ejs
- mongoose

## API Routes
|  Description | HTTP Method | Endpoint  |
|---|---|---|
| Get posts  | GET  | /posts  |
| Create post  |  POST |  /posts |
| Get specific post  | GET  | /posts/:postID  |
| Modify post  | PATCH  | /posts/:postID  |
| Delete post  | DELETE  | /posts/:postID  |
| Add comment  | POST  | /posts/:postID/comments |
| Modify comment  | PATCH  | /posts/:postID/comments/:commentID |
| Delete comment  | DELETE  | /posts/:postID/comments/:commentID |

## Client
View at `http://localhost:3000`. 

Note that the ability to add, modify and delete comments are not included (as opposed to API). 

## References
Skeleton from [Express application generator](https://expressjs.com/en/starter/generator.html)
