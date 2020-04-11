const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.get('/login', (req, res) => {
    res.render('auth/login')
})
router.post('/login', async(req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User Not Found')
            res.redirect('/login')

        }
        if (!user.password == password) {
            throw new Error('Invalid Password')
            res.redirect('/login')
        }
        req.session.email = email
        res.redirect('/')
    } catch (e) {
        console.log(e.message)
    }
})
router.get('/signup', (req, res) => {
    res.render('auth/signup')
})
router.post('/signup', async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.redirect('/login')
    } catch (e) {
        console.log(e.message)
        res.redirect('/signup')
    }
})


module.exports = router