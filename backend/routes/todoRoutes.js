const express = require("express");
const router = express.Router();

const {
    creatTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require ("../controllers/todoController");

//Get All Todos
router.get("/", getTodos);

//Post create todo
router.post("/", createTodo);

// Put update Todos
router.put("/:id", updateTodo);

//Delete todo
router.delete("/:id", deleteTodo);

module.exports = router;