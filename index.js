const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000


//  middlware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@clusterfit.lgaupy2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




function run() {
    const employeeCollection = client.db("test").collection("employee");
    try {

        app.post('/post', async (req, res) => {
            const posts = req.body;
            console.log(posts)
            const result = await employeeCollection.insertOne(posts);
            res.send(result)
        })

        app.get('/alldata', async (req, res) => {
            const query = {}
            const products = await employeeCollection.find(query).toArray();
            res.send(products);
        })
        // delete 
        app.delete("/alldata/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await employeeCollection.deleteOne(query);
            // console.log(result)
            res.send(result);
        });
        app.put("/post/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const posts = req.body

            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    firstName: posts.firstName,
                    lastName: posts.lastName,
                    email: posts.email,
                    salary: posts.salary,
                    date: posts.date

                },
            };
            const result = await employeeCollection.updateMany(
                filter,
                updatedUser,
                option
            );
            console.log(result)
            res.send(result);
        });
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
