import { login, getUser } from '../Services/userService.js';

beforeEach(() => {
  localStorage.clear();
});

test('login - valid credentials', () => {
  const user = login("alice@gmail.com", "123456");
  expect(user).toEqual({
    id: 1,
    name: "Alice",
    email: "alice@gmail.com",
    password: "123456"
  });

    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
});

test('login - invalid credentials', () => {
    expect(() => login("jorge@gmail.com", "123456")).toThrow("Email ou senha inválidos");

    expect(localStorage.getItem("user")).toBe(null);
});

test('getUser - user exists', () => {
    const user = {
        id: 1,
        name: "Alice",
        email: "alice@gmail.com",
        password: "123456"
    };

    localStorage.setItem("user", JSON.stringify(user));

    expect(getUser()).toEqual(user);
});

test('getUser - user does not exist', () => {
    expect(getUser()).toBeNull();
});

