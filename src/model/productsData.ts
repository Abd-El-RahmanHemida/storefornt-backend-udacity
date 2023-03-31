import client from "../datebase";

export type Product = {
  id?: number | string;
  name: string;
  price: number;
};

export class ProductData {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get products ${err}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO products (name, price) VALUES ($1, $2)  RETURNING *";
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create product ${error}`);
    }
  }
  async delete(productId:string|number):Promise<void>{
    try {
       const conn = await client.connect();
    const sql = "DELETE FROM products WHERE id=($1)";
    const result = await conn.query(sql, [productId]);
    conn.release();
    } catch (err) {
      throw new Error(`cannot delete product ${err}`);
    }
   
  }
}
