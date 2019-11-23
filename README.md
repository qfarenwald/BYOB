# BYOB

Build Your Own Backend (BYOB) is a one week long solo project. It is intended as a way to get comfortable with building databases using Express, Knex, and PostgreSQL. My database was created using a portion of the [LEGO dataset](https://www.kaggle.com/rtatman/lego-database#sets.csv). My goal in using the themes and sets data was to allow users to search all of the sets within a certain theme if they are interested in building out their LEGO collection.

### TOC
- [Focuses](#focuses)
- [API](#api)
  - [Schema](#schema)
  - [Endpoints](#endpoints)
    - [Themes](#themes)
      - [GET all themes](#themesGETall)
      - [GET one theme](#themesGETone)
      - [POST a theme](#themesPOST)
      - [DELETE a theme](#themesDELETE)
    - [Sets](#sets)
      - [GET all sets](#setsGETall)
      - [GET one set](#setsGETone)
      - [POST a set](#setsPOST)
      - [DELETE a set](#setsDELETE)
- [Tech](#tech)
- [Team](#team)
- [GitHub Project Board](#projectboard)

<div id='focuses'/>

### Focuses

- Building a RESTful API for a large dataset.

- One-to-many relational database schema design.

- Deploying to Heroku.

<div id='api'/>

### API

BYOB uses Lego data. There are two tables, `themes` and `sets`. The `sets` table is connected to the `themes` table by the `theme_id`.

<div id='schema'/>

#### Schema

The overall data flow is mapped out below.

![Schema Image](images/BYOB_schema.png)

<div id='endpoints'/>

#### Endpoints

<div id='themes'/>

**Themes**

<div id='themesGETall'/>

**GET** /api/v1/themes

- Sample Response (ok) status: 200
```
[
    {
        "inc_id": 2457,
        "id": 2,
        "name": "Arctic Technic",
        "parent_id": 1,
        "created_at": "2019-11-21T18:03:54.486Z",
        "updated_at": "2019-11-21T18:03:54.486Z"
    },
    {
        "inc_id": 2461,
        "id": 11,
        "name": "Off-Road",
        "parent_id": 5,
        "created_at": "2019-11-21T18:03:54.487Z",
        "updated_at": "2019-11-21T18:03:54.487Z"
    },
    ...
  ]
```
- Sample Response (error) status: 404
```
{
    error: 'The themes data can not be found.'
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='themesGETone'/>

**GET** /api/v1/themes/:id

- Parameter (<id>) example: `/api/v1/themes/2`

- Sample response (ok) status: 200
```
{
    "inc_id": 2457,
    "id": 2,
    "name": "Arctic Technic",
    "parent_id": 1,
    "created_at": "2019-11-21T18:03:54.486Z",
    "updated_at": "2019-11-21T18:03:54.486Z"
}
```
- Sample Response (error) status: 404
```
{
    error: 'The theme data you are looking for can not be found. Please try another theme id.'
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='themesPOST'/>

**POST** /api/v1/themes

- Required Body Parameters (JSON format)
```
{
    id: <Integer>,
    name: <String>,
    parent_id: <Integer>
}
```
- Sample response (ok) status: 200
```
{
    <inc_id>: <id>
}
```
- Sample Response (error) status: 422
```
{
    error: Expected format:
      {
        id: <Integer>,
        name: <String>,
        parent_id: <Integer>
      }.
      You're missing a <requiredParameter> property.`
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='themesDELETE'/>

**DELETE** /api/v1/themes/:id

- Parameter (<inc_id>) example: `/api/v1/themes/2`

- Sample response (ok) status: 200
```
{
    <inc_id>: <id>
}
```
- Sample Response (error) status: 422
```
{
    error: 'The theme data you are looking for can not be found in order to delete. Please try another set id.'
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='sets'/>

**Sets**

<div id='setsGETall'/>

**GET** /api/v1/sets

- Sample Response (ok) status: 200
```
[
    {
        "inc_id": 105058,
        "set_num": "2",
        "name": "St. Germain",
        "year": 1542,
        "theme_id": 273,
        "num_parts": 1,
        "created_at": "2019-11-21T20:34:27.647Z",
        "updated_at": "2019-11-21T20:34:27.647Z"
    },
    {
        "inc_id": 105059,
        "set_num": "2",
        "name": "St. Germain",
        "year": 1542,
        "theme_id": 273,
        "num_parts": 1,
        "created_at": "2019-11-21T20:35:43.482Z",
        "updated_at": "2019-11-21T20:35:43.482Z"
    },
    ...
  ]
```
- Sample Response (error) status: 404
```
{
    error: 'The sets data can not be found.'
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='setsGETone'/>

**GET** /api/v1/sets/:id

- Parameter (<inc_id>) example: `/api/v1/sets/105058`

- Sample response (ok) status: 200
```
{
    "inc_id": 105058,
    "set_num": "2",
    "name": "St. Germain",
    "year": 1542,
    "theme_id": 273,
    "num_parts": 1,
    "created_at": "2019-11-21T20:34:27.647Z",
    "updated_at": "2019-11-21T20:34:27.647Z"
}
```
- Sample Response (error) status: 404
```
{
    error: 'The set data you are looking for can not be found. Please try another set id.'
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='setsPOST'/>

**POST** /api/v1/sets

- Required Body Parameters (JSON format)
```
{
    set_num: <String>,
    name: <String>,
    year: <Integer>,
    theme_id: <Integer>,
    num_parts: <Integer>
}
```
- Sample response (ok) status: 200
```
{
    <inc_id>: <id>
}
```
- Sample Response (error) status: 422
```
{
    error: Expected format:
      {
        set_num: <String>,
        name: <String>,
        year: <Integer>,
        theme_id: <Integer>,
        num_parts: <Integer>
      }.
      You're missing a <requiredParameter> property.`
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='setsDELETE'/>

**DELETE** /api/v1/sets/:id

- Parameter (<inc_id>) example: `/api/v1/sets/105058`

- Sample response (ok) status: 200
```
{
    <inc_id>: <id>
}
```
- Sample Response (error) status: 404
```
{
    error: 'The theme data you are looking for can not be found in order to delete. Please try another set id.'
}
```
- Sample Response (error) status: 500
```
{
    error: 'There were problems connecting to the database.'
}
```

<div id='tech'/>

### Tech

- This project was built with Express, Knex, and PostgreSQL.

- Deployed with Heroku.

<div id='team'/>

### Team (solo)

- Quinne Farenwald (https://github.com/qfarenwald)

<div id='projectboard'/>

### GitHub Project Board

- https://github.com/qfarenwald/BYOB/projects/1
