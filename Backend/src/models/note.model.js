const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})


const noteModal = mongoose.model("notes", noteSchema)

module.exports = noteModal