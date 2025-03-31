
class File {
    get_File(req, res) {
        res.render('file',{
            isLoggedIn: req.session.isLoggedIn || false,
            email: req.session.email || '',
            isNew: true,
            csrfToken: req.csrfToken(),
        });
    }
}

module.exports = new File();