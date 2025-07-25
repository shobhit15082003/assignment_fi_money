const express = require("express");
const dotenv = require("dotenv");
const sequelize=require('./src/config/db');

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory Management Tool API is running");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    try{
        await sequelize.authenticate();
        console.log('DB Connected Successfully');
    }catch(error){
        console.log('DB Connected Failed');
        console.log(error);
    }
  console.log(`Server started on port ${PORT}`);
});
