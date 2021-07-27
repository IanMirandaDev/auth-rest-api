import 'dotenv/config';
import process from 'process';
import mongoose from 'mongoose';
import connectionString from '../config/database';

const env = process.env.NODE_ENV || 'development';
mongoose.connect(connectionString[env], {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database connected successfully');
});

export default mongoose;