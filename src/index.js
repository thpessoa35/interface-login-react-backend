const express = require('express');
const routes = require('./routes');
const app = express();
const client = require('./db');
const cors = require('cors')
client.connect()

app.get('/', (req, res)=> {
    res.send('rodando')

});
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(routes)
app.listen(3001, () => console.log('rodando')) 
