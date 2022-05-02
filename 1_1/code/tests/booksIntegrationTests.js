require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const Book = mongoose.model('Book');

const app = require('../app.js');

const agent = request.agent(app);

describe('Book crud test',()=>{
  it('should should allow book to be posted and returned and _it', (done) => {
    const bookPost = { title: 'My Book', author : 'me'};

    agent.post('/books/api')
      .send(bookPost)
      .expect(200)
      .end((err,result) => {
        result.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done)=>{
    Book.deleteMany({}).exec();
  });

  after((done)=>{
    mongoose.connection.close();
    app.server.close(done());
  });



})