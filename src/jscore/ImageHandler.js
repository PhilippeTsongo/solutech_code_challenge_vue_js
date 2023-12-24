

export function getProfileImageUrl(path) {
        // Construct the full URL for the profile image
        return path ? `http://127.0.0.1:8000/storage/${path}` : '/images/default-profile-image.jpg';
}


