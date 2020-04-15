const express = require('express')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const User = require('../models/user')

const router = new express.Router()

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))


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
        res.redirect('/dashboard')
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
        const email = req.body.email

        transporter.sendMail({
            to: email,
            from: 'sardar.uzair12@gmail.com',
            subject: 'Signup Successfull',
            html: '<h1>chatApp successfully created you account</h1>'
        })
        res.redirect('/login')
    } catch (e) {
        console.log(e.message)
        res.redirect('/signup')
    }
})


module.exports = router