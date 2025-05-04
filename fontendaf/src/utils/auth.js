export const registerUser = (username, password, email, phone) => {
    localStorage.setItem("user", JSON.stringify({username, password, email, phone}));
};

export const loginUser = (username, password) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.username === username  && user.password === password;
};

export const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";

export const logoutUser = () => {
    localStorage.setItem("loggedIn", "false");
};