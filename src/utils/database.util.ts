import { connect, set } from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoSTRING = process.env.MONGODB_URL || '';
    set('strictQuery', false);
    await connect(mongoSTRING);
    console.log("Database connected!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
