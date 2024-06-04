const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const documentRoutes = require('./routes/documentRoutes');
const branchRoutes = require('./routes/branchRoutes');
const Document = require('./models/documentModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect("mongodb://localhost:27017/realtime-docs-collab")
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error', err));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', documentRoutes);
app.use('/api', branchRoutes);

io.on('connection', (socket) => {
  socket.on('joinDocument', (documentId) => {
    socket.join(documentId);
  });

  socket.on('editDocument', async (documentId, branchName, changes) => {
    const document = await Document.findById(documentId).populate('branches');
    const branch = document.branches.find(b => b.name === branchName);
    branch.changes.push(...changes);
    io.to(documentId).emit('documentUpdated', { branchName, changes });
    await branch.save();
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
