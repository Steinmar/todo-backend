const ToDo = require('../models/todo.model');

exports.getTodos = async (query, page, limit) => {
    const options = {
        page,
        limit
    };
    try {
        const todos = await ToDo.paginate(query, options);
        const resultList = todos.docs.map(res => {
            const item = {...res._doc};
            return {
                id: item._id,
                description: item.description,
                status: item.status,
                title: item.title
            };
        });
        const resultTodos = {...todos, docs: resultList};
        return resultTodos;
    } catch (e) {
        throw Error('Error while paginating todos')
    }
};

exports.createTodo = async (todo) => {
    const newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    });

    try {
        return await newTodo.save();
    } catch (e) {
        throw Error('Error while creating todo');
    }
};

exports.updateTodo = async (todo) => {
    const id = todo.id;
    let oldTodo;

    try {
        oldTodo = await ToDo.findById(id);
    } catch (e) {
        throw Error('Error occured while finding the todo')
    }

    if (!oldTodo) {
        return false;
    }
    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;

    try {
        return await oldTodo.save();
    } catch (e) {
        throw Error('And Error occurred while updating the todo');
    }
};

exports.deleteTodo = async (id) => {
    try {
        const deleted = await ToDo.remove({_id: id});

        if (deleted.result.n === 0) {
            throw Error('Todo could not be deleted');
        }
        return deleted;
    } catch (e) {
        throw Error('Error occurred while deleting the todo');
    }
};
