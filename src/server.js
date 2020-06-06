const port = 3333;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connetRoom', box => {
        socket.join(box);
    });
});

mongoose.connect("mongodb+srv://omnistack:omnistack@sandbox-jnb5p.mongodb.net/omnistack?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

app.use((req, _, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(port, () => console.log(`API listening on port ${port}`));
