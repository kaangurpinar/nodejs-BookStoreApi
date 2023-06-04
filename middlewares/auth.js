const auth = async (req, res, next) => {
    try{
        if(!req.session.user){
            return res.send({ error: "you must authenticate." });
        }
        
        next();
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

module.exports = auth;