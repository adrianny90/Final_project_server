import Category from "../models/Categories.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllCategries = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        throw new ErrorResponse('Failed to fetch categories', 500);
    }
};

export const createCategory = async(req,res) => {
    const {name} = req.body;
    try {
        const exists = await Category.findOne({name});
        if (exists){
            throw new ErrorResponse('Categroy already exists', 409);
        }

        const newCategory = await Category.create({name})
        res.status(201).json(newCategory);
    } catch (error) {
        throw new ErrorResponse(error.message,400)
    }
};