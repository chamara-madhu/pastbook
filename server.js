// import packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// app
const app = express();

// connect database
mongoose
  .connect(
    "mongodb+srv://admin:admin123@ransisarcade-rdqwa.mongodb.net/pastbook?retryWrites=true&w=majority" ||
      "mongodb://localhost:27017/ecommerce",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => console.log("db is running"))
  .catch((err) => console.log(err));

// load routers
const photoRoutes = require("./routes/api/photoRoutes");

// use middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/photo", photoRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// port
const PORT = process.env.PORT || 5000;

// run server
app.listen(PORT, () => console.log(`server is running in Port ${PORT}`));
