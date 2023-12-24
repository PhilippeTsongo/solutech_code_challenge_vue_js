export function successMessage(toast, message){
    toast.success(message,
        {
            position: "top-right",
            duration: 6000,
        });
    }


export function errorMessage(toast, message){
    toast.error(message,
        {
            position: "top-right",
            duration: 6000,
        });
    }
    