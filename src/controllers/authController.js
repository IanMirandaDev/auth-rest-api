import User from '../models/user';
import bcrypt from 'bcrypt';
class authController {
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

                return res.status(200).json({
                    status: 'success',
                    message: `User ${req.body.name} has been created successfully!`,
                    user: user
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

            return res.json(user);
        } catch(err) {
            console.error(err);

            return res.status(500);
        }
    }
}

export default authController;