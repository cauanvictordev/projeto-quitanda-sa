import express from 'express';
import { userService } from './userService.js';

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
    try {
        const newUser = userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default app;