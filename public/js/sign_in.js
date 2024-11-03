document.addEventListener("DOMContentLoaded", () => {
    // Getting the form elements
    const signInForm = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("remember-checkbox");
    const submitButton = document.getElementById("submit");
    
    // Getting the error message container
    const msgContainer = document.querySelector(".msg");
    const msgTitle = document.querySelector(".msg-title");
    
    // Handling form submission
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents the default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation for empty fields
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Simulate authentication
        const correctUsername = "testuser";
        const correctPassword = "12345";

        if (username === correctUsername && password === correctPassword) {
            // Simulating successful sign-in, redirect to home page
            window.location.href = "home.html";
        } else {
            // Show incorrect password message if credentials don't match
            const msgTitle = document.querySelector(".msg-title");
            msgContainer.classList.add("show"); 
            msgTitle.textContent = "Incorrect username or password entered!";
            msgTitle.style.color = "red";
        }

         // Redirect to sign-in page after 2 seconds
         setTimeout(() => {
            window.location.href = "sign_in.html";
        }, 2000);
        
    });

    // Remember me functionality (simulating local storage usage)
    rememberCheckbox.addEventListener("change", () => {
        if (rememberCheckbox.checked) {
            localStorage.setItem("rememberMe", true);
            localStorage.setItem("username", usernameInput.value);
        } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("username");
        }
    });

    // On page load, if "remember me" was checked, auto-fill the username
    if (localStorage.getItem("rememberMe")) {
        usernameInput.value = localStorage.getItem("username");
        rememberCheckbox.checked = true;
    }
});
