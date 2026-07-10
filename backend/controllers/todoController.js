const Todo = require ("../models/todo");


//create todo
const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: red.body.title
        });

        res.status(201).json({
            message: "Todo Created Succssfully",
            todo
        });

    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Get all todos

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.json(todos);
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Update Todos

const updateTodo = async (req, res) =>{
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                completed: true
            },
            {
                new: true
            }
        );
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo Not Found"
            });
        }
        res.json({
            message: "Todo updated successfully",
            todo: updatedTodo
        });
    } catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};

//delete Todo

const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        } 
        res.json({
            message: "Todo deleted successfully",
            todo: deletedTodo
        });
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo

};