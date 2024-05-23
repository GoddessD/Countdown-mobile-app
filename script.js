let users = [];
let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    currentUser = users.find(user => user.username === username && user.password === password);
    
    if (currentUser) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
        document.getElementById('current-username').innerText = currentUser.username;
        renderTrips();
    } else {
        alert('Invalid login credentials');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const profilePicture = document.getElementById('signup-profile-picture').value;

    const newUser = {
        username,
        password,
        profilePicture,
        trips: []
    };
    
    users.push(newUser);
    alert('Sign up successful! You can now log in.');
}

function createTrip() {
    const tripName = document.getElementById('trip-name').value;
    const tripProfilePicture = document.getElementById('trip-profile-picture').files[0];

    if (tripName && tripProfilePicture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newTrip = {
                name: tripName,
                profilePicture: e.target.result,
                countdownEvents: [],
                groupChat: []
            };
            currentUser.trips.push(newTrip);
            renderTrips();
        };
        reader.readAsDataURL(tripProfilePicture);
    } else {
        alert('Please enter trip name and select a profile picture');
    }
}

function renderTrips() {
    const tripsList = document.getElementById('trips-list');
    tripsList.innerHTML = '';
    
    currentUser.trips.forEach((trip, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${trip.profilePicture}" alt="Profile Picture" style="width: 50px; height: 50px; border-radius: 50%;">
            <span>${trip.name}</span>
        `;
        tripsList.appendChild(li);
    });
}

// Initial setup
users.push({ username: 'user1', password: 'pass1', profilePicture: '', trips: [] });
