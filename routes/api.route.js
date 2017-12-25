const express = require('express');
const router = express.Router();
const todos = require('./api/todo.route');

router.use('/todos', todos);
module.exports = router;
