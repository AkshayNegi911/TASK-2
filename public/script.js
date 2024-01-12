document.addEventListener('DOMContentLoaded', () => {
    // Attach the checkLoginStatus function to the page load event
    checkLoginStatus();
    updateCarsSectionVisibility();

    // Attach the submitLoginForm function to the login form's onsubmit event
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', submitLoginForm);
    }

    // Attach the logout function to the logout link's click event
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', logout);
    }

// Attach the move func() to the home button's click event
    const HomeMove = document.getElementById('index');
    if (HomeMove) {
        HomeMove.addEventListener('click', move);
    }

    const ContactMove = document.getElementById('contact');
    if (ContactMove) {
        ContactMove.addEventListener('click', move);
    }

});


// used for local host
// const regex = /^http:\/\/localhost:3000\/index\.html/;
// if (regex.test(String(window.location.href)) || String(window.location.href) === "http://localhost:3000/"
//     || String(window.location.href) === "http://localhost:3000/#") {
//     updateCarsSectionVisibility();
// }

// // used for vercel
// const regex = /^https:\/\/car-selling-indol.vercel.app\/index\.html/;
// if (regex.test(String(window.location.href)) || String(window.location.href) === "https://car-selling-indol.vercel.app/"
//     || String(window.location.href) === "https://car-selling-indol.vercel.app/#") {
//     updateCarsSectionVisibility();
// }



async function move({id}){
    const searchParams = String(window.location.href);
    // find the extra content using substrings
    const startIndex = searchParams.indexOf('Id=');

    
    // Check if the question mark is present
    if (startIndex !== -1) {
        const substring = searchParams.substring(startIndex + 3); 
        // console.log(id);
        if(id === 'index'){
            window.location.href = `/index.html?Id=${substring}`;
        }
        else if(id === 'contact'){
            window.location.href = `/contact.html?Id=${substring}`;
        }
    } 
    else {
        if(id === 'index'){
            window.location.href = `/index.html`;
        }
        else if(id === 'contact'){
            window.location.href = `/contact.html`;
        }
        
    }

    // move to page
}


// this function is executed every time to check whether user is logged in or not
async function checkLoginStatus() {
    const searchParams = String(window.location.href);

    // Check if there are any search parameters
    const hasSearchParams = searchParams.includes("?Id=");

        if (hasSearchParams) {
            // User is logged in
            document.getElementById('loginLink').style.display = 'none';
            document.getElementById('logoutLink').style.display = 'block';
        } else {
            // User is not logged in
            document.getElementById('loginLink').style.display = 'block';
            document.getElementById('logoutLink').style.display = 'none';
        }
}



// function used for login page form submission
async function submitLoginForm(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ username, password }),
        });
        
        // console.log(response.json());
        const result = await response.json();

        if (result.success) {
            // Login successful
            alert('Login successful! Redirecting to the home page.');
            window.location.href = `/index.html?Id=${result.user}`; // Redirect to the home page with the session ID
        } else {
            // Login failed
            alert('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error('Error submitting login form:', error);
    }
}



// contact.html creates user
async function submitForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Use the Fetch API to send a POST request to the server
    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ username, password }),
        });

        const result = await response.json();

        // Display a response message (you can customize this based on your needs)
        if (result.success) {
            alert(result.message);
            const searchParams = String(window.location.href);
            // find the extra content using substrings
            const startIndex = searchParams.indexOf('Id=');
            // Check if the question mark is present
            if (startIndex !== -1) {
                const substring = searchParams.substring(startIndex + 3); 
                window.location.href = `/index.html?Id=${substring}`;
            } 
            else {
                window.location.href = `/index.html`;
            }
        } else {
            // Handle error scenarios here
            alert('Form submission failed. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}


// function used to logout of current session
async function logout(){
            alert('Logout successful! Redirecting to the home page.');
            // localStorage.removeItem('sessionId'); // Clear the stored session ID
            window.location.href = `/index.html`; // Redirect to the login page
}



function updateCarsSectionVisibility() {
    const carsSection = document.getElementById('cars-available-section');
    const loginMessage = document.getElementById('login-message');

    const searchParams = String(window.location.href);

    // Check if there are any search parameters
    const hasSearchParams = searchParams.includes("?Id=");

    if(carsSection && loginMessage){
        if (hasSearchParams) {
            carsSection.style.display = 'block';
            loginMessage.style.display = 'none';
        } else {
            carsSection.style.display = 'none';
            loginMessage.style.display = 'block';
        }
    }
    
}

