const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const designerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    brandName: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }    
});


const Designer = mongoose.model("Designer", designerSchema );


const validateDesigner  = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("Name"),
        brandName: Joi.string().required().label("Brand Name"),
        bio: Joi.string().required().label("Bio"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")).label("Confirm Password").messages({ "any.only": `"Confirm Password" must match "Password"`})
    });
    return schema.validate(data)
};

module.exports = { Designer, validateDesigner };    