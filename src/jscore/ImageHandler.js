

export function getProfileImageUrl(path) {
        // Construct the full URL for the profile image

        //local
        // return path ? `http://127.0.0.1:8000/storage/${path}` : '/images/default-profile-image.jpg';

        //production
        return path ? `https://www.solutech-library.fms-knb.site/public/storage/${path}` : '/images/default-profile-image.jpg';

}


