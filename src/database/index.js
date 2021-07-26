import mongoose from 'mongoose';

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_CONNECTION_STRING_DEV, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database connected successfully');
});

export default mongoose;