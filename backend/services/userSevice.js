const userModel = require('../models/User');

module.exports.createUser = async ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    throw new Error('Please provide all the required fields');
  }

//   const name = `${firstname} ${lastname || ''}`.trim();

  const user = await userModel.create({
    fullName,
    email,
    password,
  });

  return user;
};
