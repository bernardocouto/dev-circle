export default `
    CreateProduct(id: String!, name: String!): Product
    RemoveProduct(id: String!): Product @cypher(statement: "MATCH (p:Product) WHERE p.id = $id DETACH DELETE p")
`
