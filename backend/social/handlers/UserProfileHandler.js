const UserProfile = require("../models/UserProfile");

exports.userCreatedHandler = async (user) => {
  const newUser = await UserProfile.query().insert(user);

  return newUser;
};
