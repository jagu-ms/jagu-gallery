const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', function(next) {
    if(this.isNew || this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

UserSchema.methods.getData = function(){
    return {
            id: this._id,
            name: this.name,
            email: this.email,
        }
}

UserSchema.methods.signJwt = function() {
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
}

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {virtuals: true});

const Model = mongoose.model('User', UserSchema);

module.exports  = Model;