import User from '../models/User.js';

export const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists) {
            await User.create({
                email: 'admin@gmail.com',
                password: '123456',
                role: 'admin'
            });
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};
