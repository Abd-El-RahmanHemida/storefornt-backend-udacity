import { Product,ProductData } from '../../model/productsData'

const store = new ProductData()

describe('Product Model', () => {
    it('should create a product', async () => {
        const result = await store.create({
          name:"I'm a mobile, You can't buy me",
          price:5000
        })
        expect(result).toEqual({
            id: 2,
            name: 'I\'m a mobile, You can\'t buy me',
            price: 5000,
        })
    })
    it('should return a list of products', async () => {
        const result = await store.index()
        expect(result.length).toEqual(1)
    })

    it('should return the correct product', async () => {
        let product = await store.index()
        const productId = product[0].id as string

        const result = await store.show(productId)
        expect(result).toEqual({
            id: 2,
            name: 'I\'m a mobile, You can\'t buy me',
            price: 5000,
        })
    })
})