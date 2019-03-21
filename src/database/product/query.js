export default `
    GetProductById(id: String!): Product @cypher(statement: "MATCH (p:Product) WHERE p.id = $id RETURN p")
`
