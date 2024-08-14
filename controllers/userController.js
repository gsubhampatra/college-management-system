import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
    const { userid, name, password, role, course, branch, section,batch } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ userid });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            userid,
            name,
            password: hashedPassword,
            role,
            course,
            branch,
            section,
            batch
        });

        // Save user to the database
        const savedUser = await user.save();

        // Create JWT Token
        const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1D',
        });

        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                userid: savedUser.userid,
                name: savedUser.name,
                role: savedUser.role,
                course: savedUser?.course,
                branch: savedUser?.branch,
                section: savedUser?.section,
                batch:savedUser?.batch
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in User Registration' });
    }
};


export const loginUser = async (req, res) => {
    const { userid, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Send response
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                userid: user.userid,
                name: user.name,
                role: user.role,
                course: user?.course,
                branch: user?.branch,
                section: user?.section
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error in login' });
    }
};