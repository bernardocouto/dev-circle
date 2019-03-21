export default `
    GetCategoryById(id: String!): Category @cypher(statement: "MATCH (c:Category) WHERE c.id = $id RETURN c")
`
