function fetchProfile() {
    const username = document.getElementById('username').value;
    const profileContainer = document.getElementById('profile');
    
    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    profileContainer.innerHTML = `
        <div class="profile-info">
            <i class="fas fa-spinner fa-spin fa-3x"></i>
            <p>Loading profile...</p>
        </div>
    `;

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(err => {
            profileContainer.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-circle fa-3x"></i>
                    <p>User not found or there was an error fetching the data</p>
                </div>
            `;
        });
}

function displayProfile(profileData) {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
        <div class="profile-info">
            <img src="${profileData.avatar_url}" alt="${profileData.login}'s avatar" />
            <h2>${profileData.login}</h2>
            ${profileData.name ? `<p>${profileData.name}</p>` : ''}
            ${profileData.bio ? `<p class="bio">${profileData.bio}</p>` : ''}
            
            <div class="stats">
                <div class="stat-item">
                    <div class="value">${profileData.followers}</div>
                    <div class="label">Followers</div>
                </div>
                <div class="stat-item">
                    <div class="value">${profileData.following}</div>
                    <div class="label">Following</div>
                </div>
                <div class="stat-item">
                    <div class="value">${profileData.public_repos}</div>
                    <div class="label">Repositories</div>
                </div>
            </div>
            
            <div class="profile-links">
                ${profileData.location ? `
                    <span>
                        <i class="fas fa-map-marker-alt"></i>
                        ${profileData.location}
                    </span>
                ` : ''}
                ${profileData.blog ? `
                    <a href="${profileData.blog}" target="_blank">
                        <i class="fas fa-link"></i>
                        Website
                    </a>
                ` : ''}
                <a href="${profileData.html_url}" target="_blank">
                    <i class="fab fa-github"></i>
                    View Profile
                </a>
            </div>
        </div>
    `;
}
document.getElementById('username').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchProfile();
    }
});