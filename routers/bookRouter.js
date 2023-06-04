const express = require('express');
const bookController = require("../controllers/bookController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/books", auth, bookController.getBooks);
router.post("/books", auth, bookController.postBook);
router.get("/books/:id", auth, bookController.getBookById);
router.delete("/books/:id", auth, bookController.deleteBookById);
router.put("/books/:id", auth, bookController.updateBook);
router.get('/books/genre/:genre', auth, bookController.getBooksByGenre);

module.exports = router;