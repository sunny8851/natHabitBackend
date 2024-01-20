const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const routes = require("./routes/routes");
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
