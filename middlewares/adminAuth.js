const adminAuth = async (req, res, next) => {
    try{
        if(!req.session.user){
            return res.send({ error: "you must authenticate." });
        }
        
        if(req.session.user.role != 'admin'){
            return res.send({ error: "you don't have authorization." });
        }
        
        next();
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

module.exports = adminAuth;