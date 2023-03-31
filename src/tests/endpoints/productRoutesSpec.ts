import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const token: string = jwt.sign("test", process.env.TOKEN_SECRET!)
const request = supertest(app)

describe('products api: ', () => {
    it('/product should return status: 200', () => {
        const data =
            {
                name:"I'm a mobile, You can't buy me",
                price:5000
            }
        request
            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(200)
    })

    it('/product should return all products', () => {
        request
            .get('/product')
            .expect(200)
            .expect([
                {
                    name:"I'm a mobile, You can't buy me",
                    price:5000
                },
            ])
    })

    it('/product/:id should show a product', () => {
        request
            .get('/product/1')
            .expect(200)
            .expect(
            {
                name:"I'm a mobile, You can't buy me",
                price:5000
            })
    })
})