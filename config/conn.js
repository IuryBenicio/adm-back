const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Conectando ao mongoose
async function main() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));
}

main();

module.exports = mongoose;
