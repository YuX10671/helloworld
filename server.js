// server.js —— Node.js 原生 HTTP 服务器，零依赖即可运行
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // 所有请求统一返回首页（首页里通过 JS 实时拉取服务器时间）
  if (req.url === '/' || req.url === '/index.html') {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, html) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('服务器内部错误：无法读取 index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });
    return;
  }

  // /api/time 接口：返回服务器当前时间（ISO 字符串 + 本地格式化字符串）
  if (req.url === '/api/time') {
    const now = new Date();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      iso: now.toISOString(),
      local: now.toLocaleString('zh-CN', { hour12: false })
    }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`服务器已启动： http://localhost:${PORT}`);
});
