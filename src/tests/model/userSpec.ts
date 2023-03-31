import { User,UserData } from '../../model/usersData'

const store = new UserData()

describe('User Model tests', () => {
    it('should create a user', async () => {
        const result = await store.create({
          first_name: 'Ahmed',
          last_name: 'Ali',
          user_name: 'test',
            user_password: 'password123',
        })
        expect(result.user_name).toEqual('test')
    })


    it('should return a list of users', async () => {
        const result = await store.index()
        expect(result.length).toEqual(1)
    })
    it('should return the correct user', async () => {
        const users = await store.index()
        const userId = users[0].id as string

        const result = await store.show(userId)
        expect(result.first_name).toEqual('Ahmed')
    })
    it('should delete the user', async () => {
        let users = await store.index()
        const userId = users[0].id as number

        await store.delete(userId)
        users = await store.index()

        expect(users.length).toEqual(0)
    })
})