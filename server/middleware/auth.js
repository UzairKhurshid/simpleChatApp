const auth = async(req, res, next) => {

    console.log('middleware')
    if (!req.session.email) {
        return res.redirect('/login')
    }
    next()

}

module.exports = auth