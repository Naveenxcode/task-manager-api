import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

//  Create task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Get all tasks 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//  Update task by ID 
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,});
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  Delete task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Toggle task status
router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ This is the incorrect way of doing this:

// router.patch('/tasks/:id/toggle', async (req,res)=>{
//     try {
//         const toggleTask = await Tasks.findByIdAndUpdate(req.params.id, {isComplete: !isComplete}, {new:true})
//         res.status(400).json(toggleTask);
//     } catch (error){ 
//         res.json({error : error.message})
//     }
// })


// ➤ Get only incomplete tasks (filter)
router.get("/incomplete", async (req, res) => {
  try {
    const tasks = await Task.find({ isCompleted: false });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ➤ Get completed task 

router.get("/completed", async (req,res)=>{
    try{
      const completedTask = await Task.find({completed: true})
      if (!completedTask) { res.status(404).json({error: "task not found "})}
      res.json(completedTask)

    }catch (error){"this is an error "}
})

// Mark all task are completed 

// PATCH /tasks/markAllCompleted
router.patch("/markAllCompleted", async (req, res) => {
  try {
    const result = await Task.updateMany({}, { isCompleted: true });
    res.json({ message: "All tasks marked completed", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  //delete all completed Task 

  router.delete('/delete',async (req,res)=>{
    try{
      const dltCmp = await Task.deleteMany({isCompleted: true})
      res.json({ message: "Completed tasks deleted", result });
  } catch (error){
    res.status(500).json({ error: error.message });
  }
});


export default router;
