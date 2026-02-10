// server ko start karkna and database se connect karna
// to acces dotenv variables
require('dotenv').config()
const app = require('./src/app')

// conenct to database
connectToDb = require('./src/config/database')
connectToDb()





app.listen(3000, () => {
    console.log("Server is running on port 3000");
})