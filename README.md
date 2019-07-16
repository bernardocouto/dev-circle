# (GraphQL)-[:LIKES]->(GraphDB)

## Dependencies

* Node.js 10.15
* Python 3.7

## Data

Download the files listed below and copy to `/dev-circle/import/`

* Categories: `https://s3.amazonaws.com/dev-circle/categories.json`
* Products: `https://s3.amazonaws.com/dev-circle/products.json`

## Initial import

```
$ cd import
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
$ python3 import.py
```

## Docker

```
$ docker build -t dev-circle .
$ docker-compose up -d
```

## Access

* GraphQL: `http://localhost:4004`
* Neo4j: `http://localhost:7474`

## References

* GRANDStack
