export default `
    type Category {
        id: String!
        name: String!
        parentCategory: Category @relation(name: "SUB_CATEGORY", direction: "BOTH") @cypher(statement: "MATCH (c:Category)-[:SUB_CATEGORY]->(this) RETURN c")
        subCategories: [Category] @relation(name: "SUB_CATEGORY", direction: "BOTH") @cypher(statement: "MATCH (this)-[:SUB_CATEGORY]->(c:Category) RETURN c")
        products: [Product] @relation(name: "HAS_PRODUCT", direction: "OUT")
    }
`
