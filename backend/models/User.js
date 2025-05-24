const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true , minlength: [3,'name must be at least 3 character long'],},
    email: { type: String, required: true, unique: true, minlength: [5,'Email must be at least 5 character long'] },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Password match method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
//comparing passwordit’s used to compare an entered plain-text password
 //with the hashed password stored in the database.

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generate token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

//Hashes the plain-text password with a salt generated using 10 rounds.
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('User', userSchema);


