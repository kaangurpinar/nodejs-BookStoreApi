const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationYear: { type: String, required: true },
    pages: { type: String, required: true, validate(value){
      if(value < 0) throw new Error("pages must be positive number.");
    } },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'genre'}
}, {timestamps: true});

module.exports = mongoose.model("book", bookSchema);