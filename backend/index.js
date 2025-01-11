const express = require("express");
const { connection, PORT } = require("./config/db");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/users", require("./routes/routes"));
app.get("/", (req, res) => {
    res.json({ message: "Server is running!"});
});



app.listen(PORT, async () => {
    try {
      await connection;
      console.log("Connected to DataBase");
    } catch (error) {
      console.log(`${error} is giving while connecting`);
    }
    console.log(`Listening on PORT: ${PORT}`);
  });