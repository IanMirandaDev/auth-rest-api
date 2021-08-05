import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mailService from '../services/mailService';

function jwtGenerate(id, exp) {
	// eslint-disable-next-line no-undef
	return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: exp });
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

				return res.json({
					status: 'success',
					message: `User ${req.body.name} has been created successfully!`,
					user: user,
					token: token
				});
			});
		} catch(err) {
			console.error(err);
            
			return res.json({ error: 'Server error on register. Please try it again' });
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
            
			return res.json({ error: 'Server error on authenticate. Please try it again' });
		}
	}

	async forgotPassword(req, res) {
		try {
			const { email } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.json({ error: 'User not found' });
			}
            
			const token = crypto.randomInt(100000, 999999);

			const now = new Date();
			now.setHours(now.getHours() + 1);

			await user.update({
				passwordResetToken: token,
				passwordResetExpires: now
			});

			const sendMail = await mailService.forgotPassMail({
				to: email,
				subject: 'Forgot password',
				text: `Here is your code to reset the password: ${token}`
			});

			if (!sendMail.accepted) {
				return res.json({ error: 'Server error on send your reset password token. Please try it again' });
			}

			return res.json({
				status: 'success',
				message: 'Your reset password token has been sended to your email successfully'
			});
		} catch(err) {
			console.error(err);

			return res.json({ error: 'Server error on forgot password. Please try it again' });
		}
	}

	// Uncompleted
	async resetPassword(req, res) {
		try {
			const { email, token, new_password } = req.body;

			const user = await User.findOne({ email }).select('+passwordResetToken, +passwordResetExpires');

			if (!user) {
				return res.json({ error: 'User not found' });
			}
            
			if (user.passwordResetToken !== token) {
				return res.json({ error: 'Invalid reset password token' });
			}
            
			const now = new Date();
			if (now > user.passwordResetExpires) {
				return res.json({ error: 'Expired reset password token' });
			}

			user.password = new_password;
            
			return res.json(user);
		} catch(err) {
			console.error(err);

			return res.json({ error: 'Server error on reset password. Please try it again' });
		}
	}
}

export default new AuthController();