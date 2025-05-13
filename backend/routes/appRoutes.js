const router = require("express").Router();
const { Designer, validateDesigner } = require("../models/designer");
const { User, validateUser } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Common login validation schema
const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
};

// ───── DESIGNER REGISTER ─────
router.post("/designerSignup", async (req, res) => {
    try {
        const { error } = validateDesigner(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const existingDesigner = await Designer.findOne({ email: req.body.email });
        if (existingDesigner) return res.status(400).json({ message: "Designer with given email already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        const { fullName, brandName, bio, email } = req.body;

        await new Designer({ fullName, brandName, bio, email, password: hashedPassword }).save();
        res.status(201).json({ message: "Designer created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// ───── DESIGNER LOGIN ─────
router.post("/designerLogin", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const designer = await Designer.findOne({ email: req.body.email });
        if (!designer) return res.status(401).json({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, designer.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid Email or Password" });

        res.status(200).json({message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ───── USER LOGIN ─────
router.post("/userLogin", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid Email or Password" });
 
        res.status(200).json({message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error",error: error.message });
    }
});

// ───── USER REGISTER ─────
router.post("/userSignup", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ message: "User with given email already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));
        const { name, email } = req.body;

        await new User({ name, email, password: hashedPassword }).save();
        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
});

// ───── GET USER DETAILS ─────
router.get("/userDetails/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// ───── GET DESIGNER DETAILS ─────
router.get("/designerDetails/:id", async (req, res) => {
    try {
        const designer = await Designer.findById(req.params.id).select("-password");
        if (!designer) return res.status(404).json({ message: "Designer not found" });

        res.status(200).json({ designer });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// ───── PUT UPDATE USER NAME ─────
router.put("/userDetails/:id", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Name is required" });

        const user = await User.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user, message: "Name updated successfully" });
    } catch (error) {

        res.status(500).json({ message: "Internal server error", error:error.message });
    }
});

module.exports = router;
