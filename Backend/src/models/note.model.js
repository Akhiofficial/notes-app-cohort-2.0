const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})


const noteModal = mongoose.model("note-day93", noteSchema)

module.exports = noteModal