from neo4j import GraphDatabase

import pandas as pd

class Helper:

    def __init__(self):
        self._driver = GraphDatabase.driver(
            'bolt://0.0.0.0:7687',
            auth=(
                'neo4j',
                ''
            )
        )

    @classmethod
    def add_category(cls, tx, category_name):
        tx.run(
            '''
                CREATE (c:Category { name: $category_name })
            ''',
            category_name=category_name
        )

    @classmethod
    def add_category_relation(cls, tx, first_category_name, second_category_name, third_category_name):
        tx.run(
            '''
                MATCH (c1:Category) WHERE c1.name = $first_category_name
                MATCH (c2:Category) WHERE c2.name = $second_category_name
                MATCH (c3:Category) WHERE c3.name = $third_category_name
                CREATE UNIQUE (c1)-[r1:SUB_CATEGORY]->(c2)
                CREATE UNIQUE (c2)-[r2:SUB_CATEGORY]->(c3)
            ''',
            first_category_name=first_category_name,
            second_category_name=second_category_name,
            third_category_name=third_category_name
        )

    @classmethod
    def get_category_by_name(cls, tx, category_name):
        result = tx.run(
            '''
                MATCH (c:Category) WHERE c.name = $category_name
                RETURN c
            ''',
            category_name=category_name
        )
        return result.single()

    @classmethod
    def add_product(cls, tx, product_id, product_name, category_name):
        tx.run(
            '''
                MATCH (c:Category) WHERE c.name = $category_name
                MERGE (p:Product { id: $product_id, name: $product_name })<-[:HAS_PRODUCT]-(c)
            ''',
            product_id=product_id,
            product_name=product_name,
            category_name=category_name
        )

    @classmethod
    def get_product_by_id(cls, tx, product_id):
        result = tx.run(
            '''
                MATCH (p:Product) WHERE p.id = $product_id
                RETURN p.id
            ''',
            product_id=product_id
        )
        return result.single()

    def tx_add_category(self, category_name):
        with self._driver.session() as s:
            result = s.read_transaction(
                self.get_category_by_name,
                category_name
            )
            if result is None:
                s.write_transaction(
                    self.add_category,
                    category_name
                )

    def tx_add_category_relation(self, first_category_name, second_category_name, third_category_name):
        with self._driver.session() as s:
            s.write_transaction(
                self.add_category_relation,
                first_category_name,
                second_category_name,
                third_category_name
            )

    def tx_add_product(self, product_id, product_name, category_name):
        with self._driver.session() as s:
            result = s.read_transaction(
                self.get_product_by_id,
                product_id
            )
            if result is None:
                s.write_transaction(
                    self.add_product,
                    product_id,
                    product_name,
                    category_name
                )

def main():
    helper = Helper()

    categories = pd.read_json('categories.json')
    products = pd.read_json('products.json')

    df = pd.merge(categories, products)

    aux = 0
    while (aux < 220974):
        print(aux)

        category = df.loc[aux]['categoria']
        
        product_id = df.loc[aux]['id']
        product_name = df.loc[aux]['nome']

        c = category.split(' > ')

        # Add categories
        aux_c = 0
        while (aux_c < 3):
            helper.tx_add_category(c[aux_c])
            aux_c += 1

        # Add category relationships
        helper.tx_add_category_relation(c[0], c[1], c[2])

        # Add products
        helper.tx_add_product(product_id, product_name, c[2])

        aux += 1

if __name__ == '__main__':
    main()
