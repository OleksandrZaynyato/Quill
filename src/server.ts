import dotenv from 'dotenv';
import path from 'path';
import {connectDB} from "./config/DB.ts";
import app from "./app.ts";


// Вибираємо відповідний .env залежно від NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log('Environment:', process.env.NODE_ENV);
console.log('Mongo URI:', process.env.MONGO_URI);

await connectDB();

if (process.env.NODE_ENV === 'development') {
    console.log('Running in DEV mode');
} else {
    console.log('Running in PROD mode');
}

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});