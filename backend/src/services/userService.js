class UserService {
    constructor() {
        this.users = [];
    }

    createUser(userData) {
        const { name, age, email, password } = userData;

        if (!name || name.trim() === "") {
            throw new Error("O nome é obrigatório.");
        }
        if (age === undefined || Number(age) < 18) {
            throw new Error("O usuário deve ser maior de idade.");
        }
        if (!email || email.trim() === "") {
            throw new Error("O email é obrigatório.");
        }
        if (!password || password.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }

        const emailJaExiste = this.users.find(u => u.email === email);
        if (emailJaExiste) {
            throw new Error("Email já cadastrado.");
        }

        const newUser = {
            id: Math.floor(Math.random() * 100000),
            name,
            age: Number(age),
            email,
            password,
            isActive: true,
            roles: ['user']
        };

        this.users.push(newUser);

        // Retorna sem a senha por segurança
        const { password: _, ...userSemSenha } = newUser;
        return userSemSenha;
    }

    login(email, password) {
        if (!email || !password) {
            throw new Error("Email e senha são obrigatórios.");
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error("Email ou senha incorretos.");
        }

        const { password: _, ...userSemSenha } = user;
        return userSemSenha;
    }
}

export const userService = new UserService();