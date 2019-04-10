export default `
    CreateProduct(id: String!, name: String!, category: String!): Product @cypher(statement: "CREATE (p:Product { id: $id, name: $name }) WITH p MATCH (c:Category) WHERE c.name = $category MERGE (p)<-[:HAS_PRODUCT]-(c) RETURN p, c")
    RemoveProduct(id: String!): Product @cypher(statement: "MATCH (p:Product) WHERE p.id = $id DETACH DELETE p")
`
