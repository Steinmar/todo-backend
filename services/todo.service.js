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
        throw Error('Error while Paginating Todos')
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
        throw Error('Error while Creating Todo');
    }
};

exports.updateTodo = async (todo) => {
    const id = todo.id;
    let oldTodo;

    try {
        oldTodo = await ToDo.findById(id);
    } catch (e) {
        throw Error('Error occured while Finding the Todo')
    }

    if (!oldTodo) {
        return false;
    }

    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;
    console.log(oldTodo);

    try {
        return await oldTodo.save();
    } catch (e) {
        throw Error('And Error occured while updating the Todo');
    }
};

exports.deleteTodo = async (id) => {
    try {
        const deleted = await ToDo.remove({_id: id});

        if (deleted.result.n === 0) {
            throw Error('Todo Could not be deleted');
        }
        return deleted;
    } catch (e) {
        throw Error('Error Occured while Deleting the Todo');
    }
};
