import jwt from 'jsonwebtoken';

export default async function authenticate(req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'No token provided' });
	}

	const token = authorization.split(' ');

	if (token.length !== 2) {
		return res.status(401).json({ error: 'Token error' });
	} else if (!/^Bearer$/i.test(token[0])) {
		return res.status(401).json({ error: 'Malformatted token' });
	}

	// eslint-disable-next-line no-undef
	jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		req.userId = decoded.id;
	});

	return next();
}