import process from 'process';

const connectionString = {
	'development':  process.env.DB_CONNECTION_STRING_DEV,
	'test': process.env.DB_CONNECTION_STRING_TEST,
	'production': process.env.DB_CONNECTION_STRING_PROD
};

export default connectionString;