const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.route('/projects/add').post(taskController.addProject);
router.route('/projects').get(taskController.getAllProjects);

router.route('/tasks').post(taskController.addTask);
router.route('/tasks/:projectId').get(taskController.getAllTasks);
router.route('/tasks/:projectId/:taskId').put(taskController.editTask);
router.route('/tasks/:projectId/:taskId/status').put(taskController.statusChange);
router.route('/tasks/:projectId/:taskId').delete(taskController.deleteTask);



router
	.route('/:id')
	.put(taskController.statusChange)
	.delete(taskController.deleteTask);

module.exports = router;
