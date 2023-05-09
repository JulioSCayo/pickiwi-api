import User from './user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../../config/config.js';

const createUser = async (req, res) => {
    const user = new User(req.body);
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    try {
        const username = await existUsername(user.username);
        const email = await existEmail(user.email);

        if(username.error) throw username.message;
        if(email.error) throw email.message;

        const userSaved = await user.save();
        res.status(200).json({id: userSaved._id});
    }
    catch (error) {
        res.status(400).json({message: error});
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const userUpdate = req.body;

    try {
        await User.findByIdAndUpdate(id, userUpdate);
        res.status(200).json({message: 'user_updated'});
    }
    catch (error) {
        res.status(400).json({message: error});
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'user_deleted'});
    }
    catch (error) {
        res.status(400).json({message: error});
    }
}

const findUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({message: error});
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({message: error});
    }
}

const login = async (req, res) => {
    const credentials = req.body;

    try {
        const user = await User.findOne({'username': credentials.username});

        if(!user) {
            res.status(400).json({message: 'user_doesnt_exist'});
            return;
        }

        bcrypt.compare(credentials.password, user.password, (err, result) => {
            if (err) {
                res.status(400).json({message: 'there_was_a_problem'});
                return;
            }

            if(!result) {
                res.status(400).json({message: 'wrong_password'});
                return;
            }

            const payload = user.toJSON();
            delete payload.password;

            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN
            });
            res.status(200).json({token});
        });
    }
    catch (error) {
        res.status(400).json({message: error});
    }
}

// Exist functions

const existUsername = async (username) => {
    try {
        const user = await User.findOne({'username': username});

        if(user) throw 'username_exists';
        else return { error: false };
    }
    catch (error) {
        return { error: true, message: error };
    }
}

const existEmail = async (email) => {
    try {
        const user = await User.findOne({'email': email});

        if(user) throw 'email_exists';
        else return { error: false };
    }
    catch (error) {
        return { error: true, message: error };
    }
}

export default {
    createUser,
    updateUser,
    deleteUser,
    findUser,
    findAllUsers,
    login,
    existUsername,
    existEmail
};