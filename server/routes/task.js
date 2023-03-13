const router = require("express").Router();
const { createTask, getUserTasks,updateStatus,getAllTask } = require('../controllers/task');
router.post('/createTask', createTask);
router.get('/usertask', getUserTasks);
router.get('/alltasks',getAllTask);
router.put('/updatestatus', updateStatus);

module.exports = router
