const mockGetGiftsResp1 = [{"mockGiftId1": "abc1"}];
const mockGetGiftsResp2 = [{"mockGiftId2": "abc2"}];

const mockGetGiftsV1 = jest.fn((req, res) => res.json(mockGetGiftsResp1));
const mockGetGiftsV2 = jest.fn((req, res) => res.json(mockGetGiftsResp2));


jest.mock('./src/middlewares/authMiddleware',() => (req, res, next) => next());

jest.mock('./src/controllers/v1/giftControllers', () => ({
    getGifts: mockGetGiftsV1,
}));
jest.mock('./src/controllers/v2/giftControllers', () => ({
    getGifts: mockGetGiftsV2,
}));


const request = require('supertest');
const app = require('./app');

describe('should have app()', () => {
    beforeEach(() => {
       mockGetGiftsV1.mockClear();
       mockGetGiftsV2.mockClear();  
    })

    it('exports a route /v1/gifts', () => {
        return request(app)
            .get('/v1/gifts')
            .set('x-apigateway-event','1231')
            .set('x-apigateway-context','1231')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(mockGetGiftsV1).toHaveBeenCalledTimes(1);
                expect(mockGetGiftsV2).toHaveBeenCalledTimes(0);
                expect(response.body).toEqual(mockGetGiftsResp1);
            })
    })

    it('exports a route /v2/gifts', () => {
        return request(app)
            .get('/v2/gifts')
            .set('x-apigateway-event','1231')
            .set('x-apigateway-context','1231')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(mockGetGiftsV2).toHaveBeenCalledTimes(1);
                expect(mockGetGiftsV1).toHaveBeenCalledTimes(0);
                expect(response.body).toEqual(mockGetGiftsResp2);
            })
    })
})
