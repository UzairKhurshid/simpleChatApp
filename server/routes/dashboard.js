const express = require('express')
const auth = require('../middleware/auth')
const path = require('path')
const router = new express.Router()



router.get('/', auth, async(req, res) => {
    try {
        res.render('chat/chat', {
            title: 'chat room'
        })
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