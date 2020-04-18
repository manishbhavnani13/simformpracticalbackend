// Module Import
const Joi = require('joi');
const Category = require('../models/category-model');
var ObjectID = require('mongodb').ObjectID;


// Add Category
exports.addCategory = async (data, user) => {
  return new Promise((resolve, reject) => {
    try {
      const schema = Joi.object().keys({
        category_name: Joi.string().required(),
        category_title: Joi.string().required()
      });

      Joi.validate(data, schema, (err, value) => {
        if (err) {
          reject({
            status: 422,
            message: 'Invalid request data'
          });
        } else {
          Category.findOne({ category_name: data.category_name }).then(
            (subject, err) => {
              if (subject) {
                resolve({
                  status: 200,
                  message: "Category Already Added ",
                  success: false
                });
              }
              const newCategory = new Category(data);
              newCategory.user = user._id;
              newCategory.save().then((category, err) => {
                if (err) {
                  reject({
                    status: 422,
                    message: 'Invalid request data'
                  });
                }
                resolve({
                  status: 200,
                  data: subject,
                  message: "Category  Added",
                  success: true
                });
              });
            }
          );
        }
      });

    } catch (e) {
      reject({
        status: 400,
        message: "Category Not  Added ",
        success: false,
        error: e
      });
    }
  });
};

// Update Category
exports.updateCategory = async (req, res) => {
  return new Promise((resolve, reject) => {
    const update = req
    Category.findOneAndUpdate({ _id: req.category },
      update
      ,
      { new: true }

    ).then((user, err) => {
      if (err) {
        reject(err)
      } else {
        if (user) {
          resolve({ status: 200, message: 'Category Updated', success: true, data: user })
        } else {

          resolve({ status: 200, message: 'Category Updated not found', success: false })
        }
      }
    });
  });
}

// Category List & View For Edit
exports.listCategory = async (req, res) => {

  return new Promise((resolve, reject) => {
    try {
      let filter = {}
      if (req.category) {
        filter['_id'] = ObjectID(req.category)
      }

      Category.aggregate([
        {
          '$match': filter
        },
        {
          '$lookup': {
            'from': 'users',
            'localField': 'user',
            'foreignField': '_id',
            'as': 'user_details'
          },

        },
        {
          $unwind: '$user_details'
        },
        {
          $project: {
            category_name: 1,
            category_title: 1,
            created_at: 1,
            user_details: {
              firstName: 1,
              lastName: 1,
              _id: 1,
              email: 1
            }
          }
        }
      ]).then((user) => {
        if (user && user.length) {
          resolve({ status: 200, message: 'Category  found', success: true, data: user })
        } else {

          resolve({ status: 200, message: 'Category not found', success: true })
        }
      });
    } catch (e) {
      reject({
        status: 400,
        message: "Something went wrong",
        success: false,
        error: e
      });
    }
  });
}






