// import express from 'express'
// import config from 'config'
// import mongoose from 'mongoose'

const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')



const app = express()
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/api/list', require('./routes/list.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log('App has been started on port ' + PORT))

    } catch(e) {
        console.log(`Server error ${e}`)
        process.exit(1)
    }
}

start()

