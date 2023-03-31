import { Order,OrderData } from '../../model/orderData'
import { Product,ProductData } from '../../model/productsData'
import { User,UserData} from '../../model/usersData'

const store = new OrderData()
const Userstore = new UserData()
const Productstore = new ProductData()
let userId:string
let productId:string
describe('Order Model', () => {
    beforeAll(async () =>{
        const user = await Userstore.create({
            first_name: 'cat',
            last_name: 'lion',
            user_name: 'meow',
              user_password: 'meowmeow',
          })
           userId = user.id as string

           const product = await Productstore.create({
           name:"car",
           price:8000
          })
          productId = product.id as string
    })
    it('should create a Order', async () => {
        const result = await store.create({status:"active",user_id:userId})
        expect(result).toEqual({
            id: 1,
            status:"active",
            user_id:userId
        })
    })
    it('should return list of Orders by user\'s id', async () => {
        const result = await store.currentOrderByUser(userId)
        expect(result.length).toEqual(1)
    })
    it('should put a product in a order', async () => {
        const order = await store.currentOrderByUser(userId)
        const orderId = order[0].id as string
        const result = await store.addProduct(5,orderId,productId)
        expect(result.quantity).toEqual(5)
        expect(result.order_id).toEqual(orderId as unknown as number)
        expect(result.product_id).toEqual(productId as unknown as number)
    })
    afterAll(async ()=>{
        await store.deleteProduct(productId)
       await Userstore.delete(userId)
       await Productstore.delete(productId)
    })
})