const controller = function (Book) {
  const post = (req, res) => {
    let book = new Book(req.body);
    console.log(req);
    if(!req.body.title){
      res.status(400);
     return res.send('Title is required!!');
    }
    book.save();
    console.log(book);  
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    }

    );
  }

  function put(req, res) {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    book.save((err) => {
      if (err)
        return res.send(err);
      return res.status(201).json(book);
    });
  }
  
  function patch(req, res) {
    const { book } = req;

    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach(i => book[i[0]] = i[1]);

    book.save((err) => {
      if (err)
        return res.send(err);
      return res.status(201).json(book);
    });
  }
  function deleteMethod(req, res) {
    const { book } = req;
    book.remove((err) => {
      if (err)
        return res.send(err);
      return res.sendStatus(204);
    });
  }
  return { post, get, put, patch, deleteMethod };

}
module.exports = controller;