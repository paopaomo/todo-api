const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());

app.get('/list/:status/:page', (req, res) => {
    res.json({
        list: []
    });
});

app.post('/create', (req, res) => {
    const { name, deadline, content } = req.body;
    res.json({
        todo: {
            name,
            deadline,
            content
        }
    });
});

app.post('/update', (req, res) => {
    const { name, deadline, content, id } = req.body;
    res.json({
        todo: {
            id,
            name,
            deadline,
            content
        }
    });
});

app.post('/update_status', (req, res) => {
    const { id, status } = req.body;
    res.json({
        todo: {},
        id,
        status
    });
});

app.use((err, req, res) => {
    if(err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.listen(3000, () => {
    console.log('server 启动成功: http://127.0.0.1:3000');
});
