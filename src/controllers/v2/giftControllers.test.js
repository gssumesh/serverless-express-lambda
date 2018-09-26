const mockGifts = [{id: 1, name: "abc"}, {id: 2, name: "abc2"}];
const mockGetGiftsService = jest.fn(() => Promise.resolve(mockGifts));
const mockGetGiftByIdService = jest.fn(() => Promise.resolve(mockGifts[1])); 
jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
jest.mock('../../services/giftService', () => ({
    getGifts: mockGetGiftsService,
    getGiftById: mockGetGiftByIdService
}));

const initaliseRequest = () => ({context: {auth: {email: "some@email.com"}}});
const mockResJson = jest.fn(res => res);
const mockResStatus = jest.fn(_ => ({send: jest.fn()}));
let mockReq = initaliseRequest();
const mockRes = {
    json: mockResJson,
    status: mockResStatus 
};

const giftControllers = require('./giftControllers');

describe('giftControllers should', () => {

    describe('export getGifts', () => {

        afterEach(() => {
            // Reinitalise
            mockReq = initaliseRequest();
        })

        it('should be a function', () => {
            expect(giftControllers.getGifts).toBeInstanceOf(Function);
        })

        it('should invoke getGifts in giftService', () => {
            giftControllers.getGifts(mockReq, mockRes);
            expect(mockGetGiftsService).toHaveBeenCalledTimes(1);
        })

        it('should return list of gifts returned by giftService', () => {
            giftControllers.getGifts(mockReq, mockRes);
            expect(mockResJson).toBeCalledWith(mockGifts);
        })

        it('should return invalid error code when email is not available ', () => {
            mockReq.context.auth.email = null;
            giftControllers.getGifts(mockReq, mockRes);
            expect(mockResStatus).toBeCalledWith(400);
            
        })

    })

    describe('export getGiftById', () => {

        beforeEach(() => {
            mockReq.query = {giftId: 2};
        })

        afterEach(() => {
            // Reinitalise
            mockReq = initaliseRequest(); 
        })

        it('should be a function', () => {
            expect(giftControllers.getGiftById).toBeInstanceOf(Function);
        })

        it('should invoke getGiftById in giftService', () => {
            giftControllers.getGiftById(mockReq, mockRes);
            expect(mockGetGiftByIdService).toHaveBeenCalledTimes(1);
        })

        it('should return gift returned by giftService ', () => {
            expect.assertions(1);
            giftControllers.getGiftById(mockReq, mockRes)
                .then(() => {
                    expect(mockResJson).toBeCalledWith(mockGifts[1]);
                })
            
        })
 
        it('should return invalid error code when gift id is not provided ', () => {
            mockReq.query = null;
            giftControllers.getGiftById(mockReq, mockRes);
            expect(mockResStatus).toBeCalledWith(400);
            
        })

        it('should return invalid error code when email is not available ', () => {
            mockReq.context.auth.email = null;
            giftControllers.getGiftById(mockReq, mockRes);
            expect(mockResStatus).toBeCalledWith(400);
            
        })
    })
})
