import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const token: string = jwt.sign("test", process.env.TOKEN_SECRET!)
const request = supertest(app)

describe('order api: ', () => {
    it('/order should return status: 200', () => {
        const data =
    {
        status:"active",
        user_id:1
    }
        request
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(200)
    })

    it('/order/:userId should return order by user id', () => {
        request
            .get('/order/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(
                {
                    status:"active",
                    user_id:1
                }
            )
    })

    it('/orders/:id/products should add product', () => {
        request
            .post('/orders/1/products')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})