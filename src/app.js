const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('server 启动成功: http://127.0.0.1:3000');
});
