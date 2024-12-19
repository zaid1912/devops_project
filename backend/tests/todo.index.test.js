const request = require("supertest");
const express = require("express");
const mainRouter = require("../routes"); // Adjust the path based on your project structure
const todosRouter = require("../routes/todos"); // Import todos router for mocking

jest.mock("../routes/todos", () => {
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res) => res.send("todos route!"));
  return router;
});

describe("Main Router", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use("/", mainRouter);
  });

  test("GET / should return 'main page!'", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("main page!");
  });

  test("GET /todos should return 'todos route!'", async () => {
    const response = await request(app).get("/todos");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("todos route!");
  });

  // Add additional tests for other routes or edge cases
});
