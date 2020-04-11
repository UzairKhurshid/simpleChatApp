const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/', auth, async(req, res) => {
    try {
        console.log(req.session.email)
        const tasks = await Task.find()
        res.render('dashboard/index', {
            title: 'Dashboard',
            tasks: tasks
        })
    } catch (e) {
        console.log(e.message)
        res.redirect('/')
    }
})

router.post('/', async(req, res) => {
    try {

        const task = new Task(req.body)
        await task.save()

        res.redirect('/')

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