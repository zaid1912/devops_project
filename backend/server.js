const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://mongo:27017/todos", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const app = express();
  app.use(
    cors({
      origin: "http://web:3000", // Allow the frontend container to access this backend
      methods: ["GET", "POST", "PUT", "DELETE"], // Adjust methods as necessary
    })
  );
  app.use(express.json());
  app.use("/api", routes);

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port: ${port}`);
  });
}
