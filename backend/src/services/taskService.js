class TaskService {
    constructor() {
        this.tasks = [
            { id: 1, title: 'Tarefa Exemplo', description: 'Criar os testes', status: 'pendente', dueDate: '2026-12-31', userId: 'user123' }
        ];
        this.currentId = 2;
    }

    // Criar Tarefa com as validações obrigatórias da SA
    createTask(taskData) {
        const { title, description, status, dueDate, userId } = taskData;

        // Regra 1: Título é obrigatório
        if (!title || title.trim() === "") {
            throw new Error("O título da tarefa é obrigatório.");
        }

        // Regra 2: A data de vencimento não pode ser no passado
        if (dueDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Zera as horas para comparar só o dia
            const taskDate = new Date(dueDate);

            if (taskDate < today) {
                throw new Error("A data de vencimento não pode ser no passado.");
            }
        }

        const newTask = {
            id: this.currentId++,
            title,
            description: description || "",
            status: status || "pendente",
            dueDate,
            userId
        };

        this.tasks.push(newTask);
        return newTask;
    }

    // Listar Tarefas (Regra da SA: Usuário comum só vê as dele, Admin vê tudo)
    listTasks(userId, userRole) {
        if (userRole === 'admin') {
            return this.tasks;
        }
        return this.tasks.filter(task => task.userId === userId);
    }

    // Atualizar Tarefa (Só o dono ou Admin)
    updateTask(id, userId, userRole, updateData) {
        const taskIndex = this.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1) throw new Error("Tarefa não encontrada.");

        const task = this.tasks[taskIndex];

        if (task.userId !== userId && userRole !== 'admin') {
            throw new Error("Acesso negado. Você não tem permissão para alterar esta tarefa.");
        }

        this.tasks[taskIndex] = { ...task, ...updateData };
        return this.tasks[taskIndex];
    }

    // Deletar Tarefa (Só o dono ou Admin)
    deleteTask(id, userId, userRole) {
        const taskIndex = this.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1) throw new Error("Tarefa não encontrada.");

        const task = this.tasks[taskIndex];

        if (task.userId !== userId && userRole !== 'admin') {
            throw new Error("Acesso negado. Você não tem permissão para deletar esta tarefa.");
        }

        this.tasks.splice(taskIndex, 1);
        return { message: "Tarefa excluída com sucesso." };
    }
}

export const taskService = new TaskService();