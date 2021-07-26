import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../config/auth.json';

function jwtGenerate(id, exp) {
	return jwt.sign({ id: id }, auth.secret, { expiresIn: exp });
}
class AuthController {
	async show(req, res) {
		const { email } = req.params;
		const user = await User.findOne({ email });
        
		return res.json(user);
	}

	async register(req, res) {
		try {
			const { email } = req.body;

			if (await User.findOne({ email })) {
				return res.json({
					status: 'error',
					message: 'User already exists',
				});
			}

			const user = new User(req.body);
            
			user.save((err, user) => {
				if (err) {
					console.error(err);

					return res.json({
						status: 'error',
						message: 'Registration failed.',
					});
				}

				user.password = undefined;

				const token = jwtGenerate(user._id, '1h');

				return res.status(200).json({
					status: 'success',
					message: `User ${req.body.name} has been created successfully!`,
					user: user,
					token: token
				});
			});
		} catch (err) {
			console.error(err);

			return res.status(500);
		}
	}
    
	async authenticate(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email }).select('+password');

			if (!user) {
				return res.json({ 'message': 'User not found' });
			}
            
			if (!await bcrypt.compare(password.toString(), user.password)) {
				return res.json({ 'message': 'Invalid password' });
			}

			const token = jwtGenerate(user._id, '1h');

			return res.json({
				user: user,
				token: token
			});
		} catch(err) {
			console.error(err);

			return res.status(500);
		}
	}
}

export default AuthController;