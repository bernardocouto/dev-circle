export default `
    type Product {
        id: String!
        name: String!
        category: Category @relation(name: "HAS_PRODUCT", direction: "IN")
    }
`
