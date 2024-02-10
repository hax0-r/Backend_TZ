const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Routes/Routes");
const PORT = 5
const app = express();
const BASE_URL = `mongodb+srv://talha185133:StCKt4Fi5qk4T8h5@cluster0.nvzkt0f.mongodb.net/SIGN_UP`

mongoose.connect(BASE_URL)
    .then((res) => console.log("Mongoose Connected"))
    .catch((err) => console.log("Mongoose Not Connected"))

app.use(cors());
app.use(express.json())


app.use("/api", route)



app.listen(PORT, () => console.log(`Your server is running on a localhost ${PORT}`))