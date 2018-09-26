const mockGifts = [{"id": 1, "name": "playstation"}, {"id": 2, "name": "bike"}, {"id": 3, "name": "ticket to world cup"}, {"id": 4, "name": "watch"}, {"id": 5, "name": "speaker"}]
const mockResJson = jest.fn(res => res);
const mockReq = {
    context: {auth: {email: "some@email.com"}}
};
const mockRes = {
    json: mockResJson,
    status: jest.fn(_ => ({send: jest.fn()}))
};
const giftControllers = require('./giftControllers');

describe('giftControllers should', () => {

    describe('export getGifts', () => {

        it('should be a function', () => {
            expect(giftControllers.getGifts).toBeInstanceOf(Function);
        })

        it('should return list of gift', () => {
            giftControllers.getGifts(mockReq, mockRes);
            expect(mockResJson).toBeCalledWith(mockGifts);
        })

    })

    describe('export getGiftById', () => {
        beforeAll(() => {
            mockReq.query = {giftId: 2};
        })

        afterAll(() => {
            mockReq.query = null; 
        })
        
        it('should be a function', () => {
            expect(giftControllers.getGiftById).toBeInstanceOf(Function);
        })

        it('should return gift by gift id ', () => {
            
            giftControllers.getGiftById(mockReq, mockRes);
            expect(mockResJson).toBeCalledWith(mockGifts[1]);
        })
        
    })
})
