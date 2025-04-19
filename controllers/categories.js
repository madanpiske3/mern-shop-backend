import Category from "../models/category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories); // Send all categories as a response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const postCategories = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
            image: req.body.image,
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory); // Send the created category as a response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCategories = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        await category.deleteOne();
        res.status(200).json({ success: true, message: 'Category deleted successfully' });

    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateCategories = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
    }catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }

}