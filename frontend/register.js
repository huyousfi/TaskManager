const API_URL = "http://localhost:3000";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

async function register() {

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch(`${API_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if(response.ok){

            alert("Registration successful!");

            window.location.href = "login.html";

        }else{

            alert(data.message);

        }
        const token = localStorage.getItem("token");

        if (token) {
            window.location.href = "index.html";
        }

    }catch(error){

        console.error(error);

    }

}