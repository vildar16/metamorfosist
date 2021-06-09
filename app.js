const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");


//----settings----
app.set('port', process.env.PORT || 4000); //revisa las varibles de entorno, si no encuentra nada asigna el puerto 4000


//----middlewares----
app.use(cors());
app.use(express.json());


//----routes----
app.use('/api/users', require('./routes/user'));
app.use('/api/facts', require('./routes/funFact'));
app.use('/api/species', require('./routes/species'));
app.use('/api/dm', require('./routes/distritoMariposas'));

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;