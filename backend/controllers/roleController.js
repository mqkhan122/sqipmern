// controllers/roleController.js
const Role = require('../models/Roles');

// Create new role
let createRole = async (req, res) => {
  try {
    const { roleName } = req.body;  // ✅ fixed this line
    const role = new Role({ roleName }); // ✅ matches your schema
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Error creating role', error: err.message });
  }
};


// Get all roles
let getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching roles', error: err.message });
  }
};

// ✅ Proper export
module.exports = { createRole, getRoles };
