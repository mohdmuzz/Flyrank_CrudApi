const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Temporary in-memory data, as required for this assignment.
// Restarting the server resets these example tasks.
let tasks = [
  { id: 1, title: "Learn REST APIs", done: false },
  { id: 2, title: "Build my first backend", done: false },
  { id: 3, title: "Read the assignment brief", done: true },
];

let nextId = Math.max(...tasks.map((task) => task.id)) + 1;

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  return res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body || {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    done: false,
  };

  tasks.push(task);
  return res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  const body = req.body || {};
  const allowedKeys = ["title", "done"];
  const hasAllowedKey = allowedKeys.some((key) =>
    Object.prototype.hasOwnProperty.call(body, key)
  );

  if (!hasAllowedKey) {
    return res.status(400).json({ error: "Provide title and/or done to update" });
  }

  if (
    Object.prototype.hasOwnProperty.call(body, "title") &&
    (typeof body.title !== "string" || body.title.trim() === "")
  ) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }

  if (
    Object.prototype.hasOwnProperty.call(body, "done") &&
    typeof body.done !== "boolean"
  ) {
    return res.status(400).json({ error: "done must be true or false" });
  }

  const updated = { ...tasks[index] };

  if (Object.prototype.hasOwnProperty.call(body, "title")) {
    updated.title = body.title.trim();
  }
  if (Object.prototype.hasOwnProperty.call(body, "done")) {
    updated.done = body.done;
  }

  tasks[index] = updated;
  return res.json(updated);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }

  tasks.splice(index, 1);
  return res.status(204).send();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.listen(PORT, () => {
  console.log(`Task API running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});

module.exports = app;
