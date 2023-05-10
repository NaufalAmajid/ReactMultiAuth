import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price'],
                include: [{
                    attributes: ['name', 'email'],
                    model: Users,
                }]
            });
        } else {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    userId: req.userId
                },
                include: [{
                    attributes: ['name', 'email'],
                    model: Users,
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const getOneProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ message: "Product not found" });
        let response;
        if (req.role === "admin") {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    id: product.id
                },
                include: [{
                    attributes: ['name', 'email'],
                    model: Users,
                }]
            });
        } else {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }],
                },
                include: [{
                    attributes: ['name', 'email'],
                    model: Users,
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ message: "Product not found" });
        const { name, price } = req.body;
        if (req.role === "admin") {
            await Products.update({
                name: name,
                price: price,
            }, {
                where: {
                    id: product.id
                }
            });
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ message: "You are not allowed to update this product" });
            await Products.update({
                name: name,
                price: price,
            }, {
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({ message: "Product not found" });
        const { name, price } = req.body;
        if (req.role === "admin") {
            await Products.destroy({
                where: {
                    id: product.id
                }
            });
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ message: "You are not allowed to delete this product" });
            await Products.destroy({
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
