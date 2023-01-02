import http from 'http';

export const serverUtil = {
  onError: (error: any, port: Number) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  },
  onListening: (server: http.Server) => {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    console.log('Listening on ' + bind);
  }
}