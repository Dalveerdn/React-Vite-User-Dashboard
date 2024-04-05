const userDetailsModel = require("../schemas/user");

async function getallUsers(req, res) {
  try {
    const details = await userDetailsModel.find({});
    console.log(details);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function saveNewUser(req, res) {
  try {
    console.log(req.body);
    const { email, name, phone } = req.body;
    const details = new userDetailsModel({ email, name, phone });
    console.log(details);
    await details.save();
    res.status(201).json({ message: "Details submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { saveNewUser, getallUsers };
