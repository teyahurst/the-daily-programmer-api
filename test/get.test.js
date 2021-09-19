
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Hello, world!')
    })
})

describe('App', () => {
    it('GET /news responds with an object', () => {
        return supertest(app)
            .get('/news')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object');
            })
    })   
})

