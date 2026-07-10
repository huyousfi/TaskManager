
// console.log("Server Started");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Todo = require("./models/Todo");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require("./models/User");
const cors = require("cors");
const auth = require("./middleware/auth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); //Middleware to read JSON, whenever JSON is sent, please convert it into JavaScript object.

connectDB();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to my Todo App!");
});
app.post ("/register", async (req, res) =>{
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email});

        if (existingUser) {
            return res.status(400).json ({
                message: "User already exits"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        console.log(req.body);
        console.log(user);
        console.log(password);
        console.log(user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET, {
                expiresIn: "1d"
            }
        );
        res.json({
            message: "Login successfull",
            token
        });
    }catch(error) {
        res.status(500).json({
            message:error.message
        });
    }
});

app.post("/todos", auth, async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            user: req.user.id
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo: todo
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/todos", auth, async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user.id
        });

        res.json(todos);

    } catch (error) {
        res.json(todos);
        res.status(500).json({
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.put("/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
        );
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json({
            message: "Todo updated successfully",
            todo: updatedTodo
        });
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.delete("/todos/:id", auth, async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

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
});