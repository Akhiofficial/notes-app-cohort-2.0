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
    try {
        const { title, description } = req.body
        const note = await noteModal.create({ 
            title, description 
        })
        res.status(201).json({
            messsage:"note created sucessfully",
            sucess: true,
            note
        })
    } catch (err) {
        console.log("Error creating note:", err);
        res.status(500).json({
            message: "Error creating note",
            error: err.message
        })
    }
})

// fetched all th notes get notes
app.get('/api/notes', async (req,res) => {
    try {
        const notes = await noteModal.find()
        res.status(200).json({
            message: "notes fetched sucessfully",
            sucess: true,
            notes   
        })
    } catch (err) {
        console.log("Error fetching notes:", err);
        res.status(500).json({
            message: "Error fetching notes",
            error: err.message
        })
    }
}) 

// delete api
// delete notes with req.params 
app.delete('/api/delete/:id', async (req,res) => {
    const id = req.params.id
    const notes = await noteModal.findByIdAndDelete(id)
    res.status(200).json({
        message: "notes deleted",
        notes
    })
})


/* 
  update the notes with req.params and req.body
  req.params se id milega aur req.body se title aur description milega
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


// for any other route we will send the index.html file to the client
// This only serves HTML for non-API routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = app;