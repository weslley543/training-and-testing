import { MongoHelper as sut } from './MongoHelper'

describe('Mongo Helper', () =>{
    beforeAll(async () =>{
        await sut.connect(process.env.MONGO_URL)
    });

    afterAll(async () => {
        await sut.disconnect()
    });


    test('should reconnect if mongo db is down', async () =>{
        let accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
        await sut.disconnect()
        accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
    });
});
