const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(4000, ()=> console.log('listening at 4000'));
app.use(express.static('public'));

app.use(express.json({limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

//POST Method route
app.post('/api',(request,response) => {
    console.log('I got a request!');
    //console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        status:'success',
        timestamp:timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});

console.log('test')