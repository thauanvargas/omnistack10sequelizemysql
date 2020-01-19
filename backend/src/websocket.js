const socketio = require("socket.io");
const connections = [];
const calculateDistance = require("./utils/calculateDistance");
let io;
exports.setupWebSocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    console.log(socket.id);
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude,
        longitude
      },
      techs
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.includes(techs)
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
