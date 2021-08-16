const express = require("express");
const fileUpload = require("express-fileupload");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTE
require("./routes/index.route")(app);

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "coffeehouse",
  api_key: "383993481697725",
  api_secret: "OEUbE2t6HBpDgDXNBIcQVRqEscA",
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
