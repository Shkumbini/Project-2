const router = require("express").Router();
const {
  createUser,
  createTask,
  updateTask,
  deleteTask,
  getTaksList,
  getAssignTask,
  getTaskByUser,
  updateStatusOfTask,
  getTasskByStatus,
} = require("../controllers/users");

router.post("/createuser", createUser);
router.post("/createtask", createTask);
router.put("/updatetask/:id", updateTask);
router.delete("/deletetask/:id", deleteTask);
router.get("/tasklist", getTaksList);
router.put("/assigntask", getAssignTask);
router.get("/taskbyuser/:id", getTaskByUser);
router.put("/updatestatusoftask/:id/update-status", updateStatusOfTask);
router.get("/tasksbystatus/:status", getTasskByStatus);

module.exports = router;
