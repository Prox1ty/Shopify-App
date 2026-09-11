import { Router } from 'express';
import { User } from '../models/user.js';
const routes = Router();

routes.post('/api/signup', async (req, res) => {
    // req would have the data in the body
    const { fullName, email, password } = req.body;
    console.log(fullName);
    const createdUser = await User.create({
        fullName,
        email,
        password,
    });
    
    return res.json({success:"true"}).redirect('/register');
});

routes.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const token = await User.generateAndReturnToken(email, password);
        // will throw error if the token can't be generated
        
        res.cookie("token", token, 
            {
                path: '/',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration date
            });
        
        return res.status(200).json({ success: true, message: "Logged in" });
    } catch (error) {
        console.error("Sign-in failed:", error.message);
        return res.status(303).json({ success: false, error, message: "Failed to Log in" });
    }
})

routes.get('/api/me', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    return res.json(req.user);
});

routes.post('/api/signout', (req, res) => {
    res.clearCookie('token');
    return res.status(204).redirect('/register');
})

export { routes as userRoutes };