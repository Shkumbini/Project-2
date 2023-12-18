const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { name, role, email } = req.body;
    const users = await prisma.users.create({
      data: {
        name,
        role,
        email,
      },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error!");
  }
};

const createTask = async (req, res) => {
  try {
    const { taskName, description, userId } = req.body;
    const tasks = await prisma.tasks.create({
      data: {
        taskName,
        description,
        userId,
      },
    });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error!");
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskName, description, userId } = req.body;
    const tasks = await prisma.tasks.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        taskName,
        description,
        userId,
      },
    });
    res.status(200).send("Task is updated!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error!");
  }
};
const deleteTask = async (req, res) => {
  try {
    const tasks = await prisma.tasks.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!deleteTask) {
      return res.status(404).send("Task not found");
    }
    res.send("Task is deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getTaksList = async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany();

    if (tasks.length === 0) {
      return res.status(404).send("No task found");
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const getAssignTask = async (req, res) => {
  try {
    const { taskId, userId } = req.params;

    const task = await prisma.tasks.findUnique({
      where: { id: parseInt(taskId) },
    });

    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!task || !user) {
      return res.status(404).send("Task or user not found.");
    }

    await prisma.tasks.update({
      where: { id: parseInt(taskId) },
      data: {
        user: { connect: { id: parseInt(userId) } },
      },
    });

    res.send("Task assigned to the user successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const getTaskByUser = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const tasks = await prisma.tasks.findMany({
      where: { userId: parseInt(req.params.id) },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const updateStatusOfTask = async (req, res) => {
  try {
    const { newStatus } = req.body;

    const task = await prisma.status.findUnique({
      where: { tasksId: parseInt(req.params.id) },
    });

    if (!task) {
      return res.status(404).send("Task not found.");
    }

    const updatedTask = await prisma.status.update({
      where: { tasksId: parseInt(req.params.id) },
      data: {
        status: newStatus,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const getTasskByStatus = async (req, res) => {
  try {
    const statusEntity = await prisma.status.findFirst({
      where: { status: req.params.status },
    });

    if (!statusEntity) {
      return res.status(404).send("Status not found.");
    }

    const tasksByStatus = await prisma.tasks.findMany({
      where: {
        status: {
          some: {
            tasksId: statusEntity.tasksId,
          },
        },
      },
    });

    res.json(tasksByStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
module.exports = {
  createUser,
  createTask,
  updateTask,
  deleteTask,
  getTaksList,
  getAssignTask,
  getTaskByUser,
  updateStatusOfTask,
  getTasskByStatus,
};
