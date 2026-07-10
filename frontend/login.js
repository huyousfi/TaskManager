// console.log("login.js loaded")
const API_URL = "http://localhost:3000";

const loginBtn = document.getElementById("loginBtn");
// console.log(loginBtn);

loginBtn.addEventListener("click", login);
// loginBtn.addEventListener("click", function(){
//     console.log("button clicked");
// });

// async function login() {

//     const email = document.getElementById("email").value;

//     const password = document.getElementById("password").value;
//     console.log(email);
//     console.log(password);

//     try {
//         const response = await fetch(`${API_URL}/login`,{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify({
//                 email,
//                 password
//             })
//         });

//         const data = await response.json();

//         if(response.ok){
//             localStorage.setItem("token", Data.token);

//             window.location.href = "index.html";
//         }else{
//             alert(Data.message);
//         }
//     }catch(error){
//         console.log(error);
//     }
// }

async function login() {

    console.log("Login function started");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // console.log(email);
    // console.log(password);

    try {

        // console.log("About to send request...");

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        // console.log(response);

        const data = await response.json();

        // console.log(data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
    }
}