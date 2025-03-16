class Main{
    getMain(req, res){
        res.render('home',{
            usuario: req.session.email,
            isLoggedIn: req.session.isLoggedIn || false,
             
        })
    }
}

module.exports = new Main();