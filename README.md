![Image of Movie](https://upload.wikimedia.org/wikipedia/commons/9/90/Asianet_Movies.png)

[![Build status](https://api.travis-ci.org/behiyegok/movie-api.svg)](https://travis-ci.org/behiyegok/movie-api)

# Movie-API
NodeJS - Movie API Schema

---

# Movie 
| Route | HTTP Verb | POST Body | Description |
| --- | --- | --- | --- |
| /api/movies | `GET` | Empty | List All Movies. |
| /api/movies | `POST` | { title : "foo", imdb_score : 9.7, category : "bar" , country : "Turkey" , year : 1990 } | Create a new movie. |
| /api/movies/:movie_id | `GET` | Empty | List a movie |
| /api/movies/:movie_id | `PUT` | {title :"bas", category :"trem" | Update a movie with new info. |
| /api/movies/:movie_id | `DELETE` | Empty | Delete a movie |
| /api/movies/top10 | `GET` | Empty | Get the top 10 movies. |
| /api/movies/between/:start_year/:end_year | `GET` | Empty |Movies between two dates. |

---

# Directors

| Route | HTTP Verb | POST Body | Description |
| --- | --- | --- | --- |
| /api/directors | `GET` | Empty | List All Directors. |
| /api/directors | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director. |
| /api/directors/:director_id | `GET` | Empty | Get a director. |
| /api/directors/:director_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a director with new info. |
| /api/directors/:director_id | `DELETE` | Empty | 	Delete a director. |
| /api/directors/:director_id | `GET` | Empty | The director's top 10 films. |

---

# Index 
| Route | HTTP Verb | POST Body | Description |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'1234' } | Generate a token. |