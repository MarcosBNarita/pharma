import app from './app';
import connectDB from './config/database';

connectDB();

app.listen(3333);
