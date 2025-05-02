import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Conctando ao mongoose
async function main() {
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));
}

main();

export default mongoose;
