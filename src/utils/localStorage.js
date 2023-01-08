export const setLocalStorageUser = (user) =>{
    localStorage.setItem("user", JSON.stringify(user));
}

export const removeLocalStorageUser = () =>{
    localStorage.removeItem("user");
}

export const getLocalStorageUser = () =>{
    const result = localStorage.getItem("user");
    const user = result ? JSON.parse(result) : null;
    return user;
}