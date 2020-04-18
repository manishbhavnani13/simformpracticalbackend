const categoryService = require('../service/category-service');

/**
 * @author : Manish Bhavnani
 */

// Category Add Controller  
exports.categoryAdd = async (req, res) => { 
    try {

        var category = await categoryService.addCategory(req.body,req.user);
        return res.status(200).json({ status: 200, data: category });
    } catch(e) {
        return res.status(400).json(e);
    }
}

// Category Edit Controller  
exports.categorEdit= async (req, res) => { 
    try {

        var category = await categoryService.updateCategory(req.body,req.user);
        return res.status(200).json({ status: 200, data: category });
    } catch(e) {
        return res.status(400).json(e);
    }
}

// Category List Controller  
exports.listCategory = async (req, res) => { 
    try {

        var category = await categoryService.listCategory(req.body,req.user);
        return res.status(200).json({ status: 200, data: category });
    } catch(e) {
        return res.status(400).json(e);
    }
}
