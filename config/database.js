import mongoose from 'mongoose';
import { MONGODB_URL } from './config.js';

mongoose.set('strictQuery', false);

const mongodbConnect = async () => {
    await mongoose.connect(MONGODB_URL);
}

mongodbConnect().then(console.log('Database connected')).catch(err => console.log(err));

export default mongodbConnect;