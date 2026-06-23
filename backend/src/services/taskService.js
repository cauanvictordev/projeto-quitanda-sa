class TaskService {
    constructor() {
        this.tasks = [
            { id: 1, title: 'Maçã Gala (Repor Estoque)', description: 'Trazer 3 caixas do fornecedor', status: 'pendente' },
            { id: 2, title: 'Banana Nanica (Verificar Validade)', description: 'Separar as mais maduras para promoção', status: 'pendente' },
            { id: 3, title: 'Morango Orgânico (Organizar Vitrine)', description: 'Colocar na bandeja refrigerada', status: 'pendente' }
        ];
    }

    createTask(taskData) {
        const { title, description, status, dueDate } = taskData;

        if (!title || title.trim() === "") {
            throw new Error("O título da tarefa é obrigatório.");
        }

       
        if (dueDate) {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const data = new Date(dueDate + 'T12:00:00'); // ← evita bug de fuso horário
            if (data < hoje) {
                throw new Error("A data de vencimento não pode ser no passado.");
            }
        }

        const newTask = {
            id: this.tasks.length + 1,
            title,
            description: description || "",
            status: status || "pendente",
            dueDate: dueDate || null
        };

        this.tasks.push(newTask);
        return newTask;
    }

    listTasks(userId, userRole) {
        return this.tasks;
    }

    updateTask(id, userId, userRole, updateData) {
        const taskIndex = this.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1) throw new Error("Tarefa não encontrada.");
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateData };
        return this.tasks[taskIndex];
    }

    deleteTask(id, userId, userRole) {
        const taskIndex = this.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1) throw new Error("Tarefa não encontrada.");
        this.tasks.splice(taskIndex, 1);
        return { message: "Tarefa excluída com sucesso." };
    }
}

export const taskService = new TaskService();