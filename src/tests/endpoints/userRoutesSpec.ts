import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const token: string = jwt.sign("test", process.env.TOKEN_SECRET!)
dotenv.config()
const request = supertest(app)

describe('Users api: ', () => {
    it('/user should return status: 200', () => {
        const data ={
            first_name: 'Ahmed',
            last_name: 'Ali',
            user_name: 'test',
              user_password: 'password123',
          }
        request
            .post('user')
            .send(data)
            .expect(200)
    })

    it('/user should return all users', () => {
        request
            .get('users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect([
                {
                    id:1,
                    first_name: 'Ahmed',
                    last_name: 'Ali',
                    user_name: 'test',
                      user_password: 'password123',
                },
            ])
    })

    it('/users/:id should show a user', () => {
        request
            .get('/user/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect({
                id:1,
                first_name: 'Ahmed',
                last_name: 'Ali',
                user_name: 'test',
                user_password: 'password123',
              })
    })
})