export default `
    CreateCategory(id: String!, name: String!): Category
    RemoveCategory(id: String!): Category @cypher(statement: "MATCH (c:Category) WHERE c.id = $id DETACH DELETE c")
`
