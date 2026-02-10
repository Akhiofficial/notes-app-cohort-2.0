const express = require('express');
const app = express();
const noteModal = require('./models/note.model')
const corrs = require('cors')
const path = require('path')



app.use(corrs())
app.use(express.json()) // for parsing application/json
app.use(express.static('./public')) // for serving static files from the public folder)

// create a note and save data in mognodb database
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body
    const note = await noteModal.create({ 
        title, description 
    })
    res.status(201).json({
        messsage:"note created sucessfully",
        sucess: true,
        note
    })
})

// fetched all th notes
app.get('/api/notes', async (req,res) => {
    const notes = await noteModal.find()
    res.status(200).json({
        message: "notes fetched sucessfully",
        sucess: true,
        notes   
    })
}) 

// dete api
// delete notes with req.params 
app.delete('/api/delete/:id', async (req,res) => {
    const id = req.params.id
    const note = await noteModal.findByIdAndDelete(id)
    res.status(200).json({
        message: "notes deleted",
        note
    })

})


/** 
 * update the notes with req.params and req.body
 * req.params se id milega aur req.body se title aur description milega
 */

app.patch('/api/notes/:id', async (req,res) => {
    const id = req.params.id
    const { title, description } = req.body

    const note = await noteModal.findByIdAndUpdate(id, {
        title, description
    })
    res.status(200).json({
        message: "notes updated sucessfully",
        note
    })
})


app.use('*name', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})




module.exports = app;