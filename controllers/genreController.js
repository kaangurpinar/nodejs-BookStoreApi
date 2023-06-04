require("../mongoose");
const Genre = require("../models/genre");

exports.getGenres = async (req, res) => {
    try{
        const genres = await Genre.find();
        res.status(200).send(genres);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.getGenreById = async (req, res) => {
    try{
        const genre = await Genre.findOne({ _id: req.params.id });
        
        if(!genre){
            return res.status(404).send({ error: "genre doesn't exist." });
        }
        
        res.status(200).send(genre);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.postGenre = async (req, res) => {
    const genre = new Genre({
        ...req.body
    });
    
    try{
        await genre.save();
        res.status(201).send(genre);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.deleteGenreById = async (req, res) => {
    try{
        const genre = await Genre.findOneAndDelete({ _id: req.params.id });
        
        if(!genre){
            return res.status(404).send({ error: "genre doesn't exist." });
        }
        
        res.status(200).send({ genre: genre, message: "genre has been deleted." });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.updateGenre = async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        const genre = await Genre.findOne({ _id: req.params.id });
        
        if(!genre){
            return res.status(404).send({ error: "genre doesn't exist." });
        }
        
        updates.forEach((update) => genre[update] = req.body[update]);
        await genre.save();
        res.status(200).send({ book: book, message: "genre has been updated."});
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}