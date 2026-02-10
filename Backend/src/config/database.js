const mongoose = require('mongoose');


const connectToDb = async () => {
mongoose.connect(process.env.MONGO_URI)
.then( ()=> {
    console.log("connected to db");
})
.catch((err) => {
    console.log("error connecting to db in databse.js file", err);
})
}


module.exports = connectToDb
