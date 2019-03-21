export default `
    type Category {
        id: String!
        name: String!
        subCategories: [Category] @relation(name: "SUB_CATEGORY", direction: "BOTH")
        products: [Product] @relation(name: "HAS_PRODUCT", direction: "OUT")
    }
`
