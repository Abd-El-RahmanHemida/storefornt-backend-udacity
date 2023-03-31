import client from "../datebase";

export type Order = {
  id?: number | string;
  status: string;
  user_id:string | number
};

export class OrderData {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2)  RETURNING *";
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create order ${error}`);
    }
  }
  async currentOrderByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: number|string,
    productId: number|string
  ): Promise<{id:number, quantity:number, order_id:number, product_id:number}> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
  async deleteProduct(productId:string|number):Promise<void>{
    try {
       const conn = await client.connect();
    const sql = "DELETE FROM order_products WHERE id=($1)";
    const result = await conn.query(sql, [productId]);
    conn.release();
    } catch (err) {
      throw new Error(`cannot delete product ${err}`);
    }
   
  }
}
