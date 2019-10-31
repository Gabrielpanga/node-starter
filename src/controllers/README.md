# Controllers

Controllers are classes that are called upon an HTTP request for an specific route, their goal is to process the response and return it. We are working with the [_Skinny Controllers, Fat Services_](https://medium.com/marmolabs/skinny-models-skinny-controllers-fat-services-e04cfe2d6ae) approach. This means that we shouldn't have any logic related code on the controllers, only on the services. The controllers should only communicate to the Models or Services.

## CRUD Operations

We are following the OpenAPI3 basic crud operations, this means that the only public methods allowed on our controllers are:

- `create` : Adds a new object of the entity
- `update` : Updates the object sent by the route's id
- `show` : Returns the object by the route's id
- `list` : Returns all the object of the entity.
- `delete` : Deletes an entity

These methods will be mapped to specific verbs following the OpenAPI specification.