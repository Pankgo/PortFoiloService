// Import the WebSocket library
const WebSocket = require('ws');

// Create a WebSocket server on port 8765
const wss = new WebSocket.Server({ port: 8765 });

wss.on('connection', ws => {
  console.log('New client connected');

  // When a message is received from the client
  ws.on('message', message => {
    console.log(`Received message: ${message}`);

    // Send a response back to the client
    ws.send(`Echo: ${message}`);
  });

  // When the client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server started at ws://localhost:8765');