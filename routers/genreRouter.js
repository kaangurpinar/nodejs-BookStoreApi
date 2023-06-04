const express = require('express');
const auth = require("../middlewares/auth");
const genreController = require("../controllers/genreController");
const router = express.Router();

router.get("/genres", auth, genreController.getGenres);
router.post("/genres", auth, genreController.postGenre);
router.get("/genres/:id", auth, genreController.getGenreById);
router.delete("/genres/:id", auth, genreController.deleteGenreById);
router.put("/genres/:id", auth, genreController.updateGenre);

module.exports = router;