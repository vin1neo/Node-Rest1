const express = require('express');
const bookRouter = express.Router();

const getRouter = function (Book) {
  const bookController = require('../controllers/bookController');
  const controller = bookController(Book);
  bookRouter.use('/books/:bookID',
    (req, res, next) => {
      Book.findById(req.params.bookID, (err, book) => {
        if (err) {
          res.send(err);
        }
        if (book) {
          req.book = book;
          return next();
        }
        return res.sendStatus(404);
      })
    });

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  bookRouter.route('/books/:bookID')
    .get((req, res) => res.json(req.book))
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteMethod);
  return bookRouter;
}

module.exports = getRouter;