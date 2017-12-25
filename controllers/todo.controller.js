const TodoService = require('../services/todo.service');

exports.getTodos = async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    try {
        const todos = await TodoService.getTodos({}, page, limit);
        return res.json({status: 200, data: todos});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});

    }
};

exports.createTodo = async (req, res) => {
    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try {
        const createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo});
    } catch (e) {
        return res.status(400).json({status: 400, message: 'Todo Creation was unsuccessful'})
    }
};

exports.updateTodo = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: 'id must should be present'})
    }
    const todo = {
        id: req.body.id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try {
        const updatedTodo = await TodoService.updateTodo(todo);
        return res.json({status: 200, data: updatedTodo});
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message});
    }
};

exports.removeTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await TodoService.deleteTodo(id);
        return res.status(204).json({status: 204});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};
