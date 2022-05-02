const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/bookController');

describe('Book Controller test',()=>{
  describe('post',()=>{
    it('should not allow empty title',()=>{
      const Book = function(book){ this.save =() => {}};
      const req = {
        body:{
          author:'Vinay'
        }
      };
      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
        json: sinon.spy()

      };

      const controller = bookController(Book);
      controller.post(req,res);

      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required!!').should.equal(true);

    });
  });
});