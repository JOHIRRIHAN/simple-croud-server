const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())


//    johir_rihan 
//    7718301jr

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://johir_rihan:7718301jr@cluster0.zldvxhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const usersCollections = database.collection("users");

    app.get('/users', async(req, res)=>{
        const cursor = usersCollections.find();
        const result = await cursor.toArray()
    })

    app.post('/users', async(req, res)=>{
        const user = req.body;
        console.log('new users', user);
        const result = await usersCollections.insertOne(user);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!21')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})