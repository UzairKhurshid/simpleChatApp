const express = require('express')
const auth = require('../middleware/auth')
const path = require('path')
const router = new express.Router()

router.get('/dashboard', auth, async(req, res) => {
    try {
        console.log('dashboard')
        res.render('dashboard', {
            title: 'chat App',
            name: 'My First Chat Application'
        });
    } catch (e) {
        console.log(e.message)
        res.redirect('/dashboard')
    }
})

router.get('/chat', auth, async(req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public') + '/index.html');
    } catch (e) {
        console.log(e.message)
        res.redirect('/dashboard')
    }
})



router.post('/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
})

module.exports = router