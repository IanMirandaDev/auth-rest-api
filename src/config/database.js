import process from 'process';

const connectionString = {
	'development':  process.env.DB_CONNECTION_STRING_DEV,
	'production': process.env.DB_CONNECTION_STRING_PROD
};

export default connectionString;