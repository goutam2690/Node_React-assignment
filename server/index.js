const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require("body-parser")

const app = express();
const PORT = 8080;
const MONGO_URI = 'mongodb+srv://development:X3TcC8tKnI5JINuR@betalive.9sakb.gcp.mongodb.net/database';

// MongoDB client
const client = new MongoClient(MONGO_URI);

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

app.use(cors());

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send('Hello');
});

// fetch configuration
app.get('/api/configurations/:id', async (req, res) => {
    const configurationId = req.params.id;
    console.log('Received configurationId:', configurationId);

    try {
        const db = client.db();
        const configurationsCollection = db.collection('configurations');
        const configuration = await configurationsCollection.findOne({ id: configurationId });

        if (!configuration) {
            console.log('Configuration not found');
            res.status(404).json({ message: 'Configuration not found' });
            return;
        }

        if ('data' in configuration && configuration.data !== null) {
            res.json(configuration.data);
        } else {
            console.log('Configuration data not available');
            res.status(500).json({ error: 'Configuration data not available' });
        }
    } catch (error) {
        console.error('Error fetching configuration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// update remark
app.put('/api/configurations/:id', async (req, res) => {
    const configurationId = req.params.id;
    const { remark } = req.body;

    if (!remark) {
        res.status(400).json({ error: 'Remark field is required in the request body' });
        return;
    }

    try {
        const db = client.db();
        const configurationsCollection = db.collection('configurations');
        const result = await configurationsCollection.updateOne(
            { id: configurationId },
            { $set: { remark: remark } }
        );
        
        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Configuration not found' });
            return;
        }

        res.json({ message: 'Success' });
    } catch (error) {
        console.error("Error updating configuration:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
