import { userMock } from './mocks.js';

const userList = [...userMock];


export function login(email, password) {
    const user = userList.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }
    else {
        throw new Error("Email ou senha inválidos");
    }
}

export function getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
}
