const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});


const User = mongoose.model("User", userSchema );

const validateUser  = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")).label("Confirm Password").messages({ "any.only": `"Confirm Password" must match "Password"`})
    });
    return schema.validate(data)
};

module.exports = { User, validateUser };