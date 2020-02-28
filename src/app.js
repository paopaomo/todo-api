const express = require('express');
const bodyParser = require('body-parser');
const models = require('../db/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());

app.get('/list/:status/:page', async (req, res, next) => {
    // status: 1 -> 代办 2 -> 完成 3 -> 删除 -1 -> all
    try {
        const { status, page } = req.params;
        const limit = 10;
        const offset = (page - 1) * limit;
        const where = status === '-1' ? {} : { status };
        const list = await models.Todo.findAndCountAll({
            where,
            limit,
            offset
        });
        res.json({
            list,
            message: '列表查询成功'
        });
    } catch(err) {
        next(err);
    }
});

app.post('/create', async (req, res, next) => {
    try {
        const { name, deadline, content } = req.body;
        const todo = await models.Todo.create({
            name,
            deadline,
            content
        });
        res.json(todo);
    } catch(err) {
        next(err);
    }
});

app.post('/update', async (req, res, next) => {
    try {
        const { name, deadline, content, id } = req.body;
        let todo = await models.Todo.findOne({
            where: { id }
        });
        if(todo) {
            todo = await todo.update({
                name,
                deadline,
                content
            });
            res.json(todo);
        } else {
            res.status(500).end('todo isn\'t exist');
        }
    } catch(err) {
        next(err);
    }
});

app.post('/update_status', async (req, res, next) => {
    try {
        const { id, status } = req.body;
        let todo = await models.Todo.findOne({
            where: { id }
        });
        if(todo) {
            if(Number(status) !== todo.status) {
                todo = await todo.update({ status });
            }
            res.json({
                todo
            });
        } else {
            res.status(500).end('todo isn\'t exist');
        }
    } catch(err) {
        next(err);
    }
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
