# BYOB (Build Your Own Backend)

BYOB is a one week long solo project. It is intended as a way to get comfortable with building databases using Express, Knex, and PostgreSQL.

### Focuses

- Building a RESTful API for a large dataset.

- One-to-many relational database schema design.

- Deploying to Heroku.

### API Description and Endpoints

BYOB uses Lego data. There are two tables, `themes` and `sets`. The `sets` table is connected to the `themes` table by the `theme_id`.

**Endpoints Available**

Themes

- GET /api/v1/themes
```
Sample response:
Status: 200 OK
Array of all themes returned
```

- GET /api/v1/themes/:id
```
Sample response:
```

- POST /api/v1/themes
```
Required body parameters:
{
  id: <Integer>,
  name: <String>,
  parent_id: <Integer>
}
```
```
Sample response:
```

- DELETE /api/v1/themes/:id
```
Sample response:
```


Sets

- GET /api/v1/sets
```
Sample response:
```

- GET /api/v1/sets/:id
```
Sample response:
```

- POST /api/v1/sets
```
Required body parameters:
{
  set_num: <String>,
  name: <String>,
  year: <Integer>,
  theme_id: <Integer>,
  num_parts: <Integer>
}
```
```
Sample response:
```

- DELETE /api/v1/sets/:id
```
Sample response:
```

### Screenshots

Schema

- To begin, the overall data flow is mapped out.

![Schema Image](images/BYOB_schema.png)

### Tech

- This project was bootstrapped with Create React App utilizing Redux.

- Tested with Jest/Enzyme.

- Links using React Router.

### Team (solo)

- Quinne Farenwald (https://github.com/qfarenwald)

### Set Up

Instructions
```
example command
```
