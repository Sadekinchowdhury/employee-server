const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000


//  middlware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@clusterfit.lgaupy2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




function run() {
    const collection = client.db("test").collection("devices");
    try {


    }
    finally {


    }
}
run()

app.get('/', (req, res) => {
    res.send('Add employee run')

})
app.listen(port, () => {
    console.log(`this server is running on ${port}`)
})
