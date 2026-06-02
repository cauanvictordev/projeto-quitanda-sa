class UserService {
    createUser(userData) {
        const { name, age } = userData;

        if (!name || name.trim() === "") {
            throw new Error("O nome do usuário é obrigatório.");
        }

        if (age === undefined || age < 18) {
            throw new Error("O usuário deve ser maior de idade.");
        }

        return {
            id: Math.floor(Math.random() * 100000),
            name: name,
            age: Number(age),
            isActive: true,
            roles: ['user']
        };
    }
}

export const userService = new UserService();