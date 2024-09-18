import express from 'express';
import {pushUser,checkBreach}  from '../controllers/userController.js';

const userRoutes =express.Router();
userRoutes.post('/pushUser',pushUser);
userRoutes.get('/checkBreach/:email',checkBreach);

export default userRoutes;