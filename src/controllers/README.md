# Controllers

Controllers are classes that are called upon an HTTP request for an specific route, and will understand the request, process the response and return it.

## CRUD Operations

Following the OpenAPI3 the basic crud operations are the following:

- `create` : Adds a new object of the entity
- `update` : Updates the object sent by the route's id
- `show` : Returns the object by the route's id
- `list` : Returns all the object of the entity.
- `delete` : Deletes an entity

This methods will be mapped to specific verbs following the OpenAPI specification.
This will be found under `src/server/routes`, where we are storing all routes to see the whole endpoint picture in a single place.

## Accessing Data

Designed to avoid having business logic spread through repositories and models, we have decided that the data access will by only done through the Model it self.
For example, to access the users we will have to call the Model class `User` in `src/models/user.model`.
All the business logic must be stored under the model it self.
