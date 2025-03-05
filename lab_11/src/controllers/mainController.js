class Main{
    getMain(res,req){
        res.render('home',{
            usuario: req.session.email,
            isLoggedIn: req.session.isLoggedIn || false,
             
        })
    }
}

module.exports = new Main();