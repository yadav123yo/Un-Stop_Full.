const express = require("express");
const app = express();
const { seatRouter } = require("./Routes/Reserve");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
require("dotenv").config();

const connectDB = async () => {
  try {
    const connectionStr = `mongodb+srv://yadav123yo:TSrGhXr9JLakgGRK@cluster0.tayxi0r.mongodb.net/un_stop?retryWrites=true&w=majority`; 
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
app.use("/seats", seatRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});
