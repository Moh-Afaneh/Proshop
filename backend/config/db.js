import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error with the DB ${error}`.red.bold);
    process.exit(1);
  }
};
