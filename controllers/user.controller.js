import User from "../mongodb/models/user.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const getAllUsers = async (req, res) => {
    try {
        const {
            _end,
            _order,
            _start,
            _sort,
        } = req.query;

        const query = {};

        const count = await User.countDocuments({ query });

        const users = await User.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, phone, role, avatar } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(200).json(userExists);
        }

        const newUser = await User.create({ name, email, phone, role, avatar });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role, photo } =
            req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await User.findByIdAndUpdate(
            { _id: id },
            {
                name,
                email,
                phone,
                role,
                photo: photoUrl.url || photo,
            },
        );

        res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllUsers, createUser, updateUser, getUserById };