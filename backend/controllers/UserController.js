import argon2 from "argon2";
import Users from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        var users = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const getOneUser = async (req, res) => {
    try {
        var user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const createUser = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" });

    const hashPassword = await argon2.hash(password);

    try {
        const user = await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({ message: "User created successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password, confirmPassword, role } = req.body;

    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" });

    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        })
        res.status(201).json({ message: "User updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!user) return res.status(404).json({ message: "User not found" });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        })
        res.status(201).json({ message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
