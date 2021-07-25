import User from "../models/user";

function errorObj(res, err, statusCode) {
    return res.status(statusCode).json({
        status: 'error',
        message: 'Registration failed.',
        error: err
    });
}

class authController {
    async create(req, res) {
        const { email } = req.body;

        try {
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
}

export default authController;