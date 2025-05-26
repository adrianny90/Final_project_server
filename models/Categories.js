
import { Schema, model } from "mongoose";

const categorySchmema = new Schema({
    name: {
        type: String,
        required: true, 
        unique: true,
    },
});

const Category = model('Categroy', categorySchmema);
export default Category;
