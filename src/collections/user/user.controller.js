import User from './user.model.js';

const createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        const userSaved = await user.save();
        res.status(200).json(userSaved);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const userUpdate = req.body;

    try {
        await User.findByIdAndUpdate(id, userUpdate);
        res.status(200).json({message: 'User updated'});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User deleted'});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

export default {
    createUser,
    updateUser,
    deleteUser,
    findUser,
    findAllUsers
};