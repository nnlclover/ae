const WebSocket = require('ws');
const fs = require('fs');

// Создаем WebSocket сервер на порту 8080
const wss = new WebSocket.Server({ port: 3000 });

// Обработчик соединения
wss.on('connection', (ws) => {
  console.log('Streamer connected');

  // Создаем файл для записи видео
  const fileStream = fs.createWriteStream('received_video.webm');

  // Обработчик сообщений от клиента
  ws.on('message', (message) => {
    // Записываем полученные данные в файл
    fileStream.write(message);
  });

  // Обработчик закрытия соединения
  ws.on('close', () => {
    console.log('Streamer disconnected');
    fileStream.end(); // Завершаем запись в файл при закрытии соединения
  });
});
