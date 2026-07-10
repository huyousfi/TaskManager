const API_URL ="http://localhost:3000/todos";

const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");

async function loadTodos() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        const todos = await response.json();

        // console.log(todos);
        todoList.innerHTML = "";
        todos.forEach(todo => {
            const listItem = document.createElement("li");

            listItem.className = "todo-item";

            if (todo.completed) {
                listItem.classList.add("completed");
            }
           listItem.innerHTML = `
           <div class="todo-left">

                <input
                        type="checkbox"
                        class="complete-checkbox"
                        ${todo.completed ? "checked" : ""}
                        >
                        <span class="todo-title">${todo.title}</span>
            </div>

            <div class="todo-actions">

                <button 
                class="btn btn-primary edit-btn">Edit</button>


                <button
                    class="btn btn-danger delete-btn"
                    data-id="${todo._id}"
                    >
                    Delete
                    </button>
            </di>
           `;
           const checkbox = listItem.querySelector(".complete-checkbox");
           

           checkbox.addEventListener("change", function() {
            toggleTodo(todo._id, checkbox.checked);
           });

            todoList.appendChild(listItem);

            const deleteButton = listItem.querySelector(".delete-btn");

            deleteButton.addEventListener("click", function(){
                deleteTodo(todo._id);
            });

        

        const editButton = listItem.querySelector(".edit-btn");

        editButton.addEventListener("click", function(){
            // console.log("Edit clicked");
            listItem.innerHTML = `
            <input
                type ="text"
                class="edit-input"
                value="${todo.title}"
            >
                <button class="btn btn-success save-btn">
                    Save
                </button>

                <button class="btn btn-secondry cancel-btn">
                    Cancel
                </button>
                `;
                const saveButton = listItem.querySelector(".save-btn");
                saveButton.addEventListener("click", async function() {
                    const input = listItem.querySelector(".edit-input");
                    const newTitle = input.value.trim();
                    // console.log(newTitle);
                    await updateTodo(todo._id, newTitle);
                });

                const cancelButton = listItem.querySelector(".cancel-btn");
                cancelButton.addEventListener("click", async function(){
                    loadTodos();
                

                });
        });
    });

    }catch(error) {
        console.error(error);

    }
}

async function addTodo () {
    const title = todoInput.value.trim();

    if (title === "") {
        alert("Please enter a title.");
        return;
    }
    try {
        const token = localStorage.getItem("token");

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title
            })
        });
        todoInput.value = "";
        await loadTodos();
    }catch(error){
        console.error(error);
    }
}

async function deleteTodo(id) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        await loadTodos();
    }catch(error) {
        console.error(error);
    }
}

async function toggleTodo(id, completed){
    try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                completed: completed
            })
        });
        await loadTodos();

    }catch(error) {
        console.error(error);
    }
}

async function updateTodo(id, title) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title
            })
        });
        await loadTodos();
    } catch (error){
        console.error(error);
    }
}

loadTodos();
addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        addTodo();
    }
});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logout);

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}


