const businessService = require("../services/businessService");
const jwt = require('jsonwebtoken');
const registerBusiness = async (req, res) => {
  try {
    
    const { username, password } = req.body;
    const business = await businessService.registerBusiness(username, password);
    res
      .status(201)
      .json({
        message: "Business registered successfully",
        businessId: business.id,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginBusiness = async (req, res) => {
  try {
    // const { error } = businessSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }

    const { username, password } = req.body;
    const business = await businessService.authenticateBusiness(
      username,
      password
    );

    const token = jwt.sign({ id: business.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful", businessId: business.id, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  registerBusiness,
  loginBusiness,
};
