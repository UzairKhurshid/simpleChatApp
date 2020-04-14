const express = require('express')
const auth = require('../middleware/auth')


const router = new express.Router()

router.get('/', auth, async(req, res) => {
    try {
        res.sendFile('index.html');
    } catch (e) {
        console.log(e.message)
        res.redirect('/')
    }
})



router.post('/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
})

module.exports = router