require("../mongoose");
const Book = require("../models/book");

exports.getBooks = async (req, res) => {
    const queryStrings = {};
    queryStrings.title = "";
    queryStrings.author = "";
    
    if(req.query.title){
        queryStrings.title = req.query.title;
    }
    
    if(req.query.author){
        queryStrings.author = req.query.author;
    }
    
    try{
        const books = await Book.find({
            title: { $regex: queryStrings.title, $options: 'i' },
            author: { $regex: queryStrings.author, $options: 'i' }
        }).populate('genre', 'name');
        res.status(200).send(books);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.getBookById = async (req, res) => {
    try{
        const book = await Book.findOne({ _id: req.params.id });
        
        if(!book){
            return res.status(404).send({ error: "book doesn't exist." });
        }
        
        res.status(200).send(book);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.postBook = async (req, res) => {
    const book = new Book({
        ...req.body
    });
    
    try{
        await book.save();
        res.status(201).send(book);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.deleteBookById = async (req, res) => {
    try{
        const book = await Book.findOneAndDelete({ _id: req.params.id });
        
        if(!book){
            return res.status(404).send({ error: "book doesn't exist." });
        }
        
        res.status(200).send({ book: book, message: "book has been deleted." });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.updateBook = async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        const book = await Book.findOne({ _id: req.params.id });
        
        if(!book){
            return res.status(404).send({ error: "book doesn't exist." });
        }
        
        updates.forEach((update) => book[update] = req.body[update]);
        await book.save();
        res.status(200).send({ book: book, message: "book has been updated."});
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.getBooksByGenre = async (req, res) => {
    const genre = req.params.genre;
    
    try{
        const books = await Book.find().populate('genre', 'name');
        const result = books.filter(book => (book.genre.name).toLowerCase() == genre.toLowerCase());
        res.status(200).send(result);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}