const {Schema, model} = require('mongoose');

const OAuthSchema = new Schema({
    _User_Id: {type: Schema.Types.ObjectId, ref: 'User'},
    accessToken: {type: String},
    refreshToken: {type: String},
}, {
    timestamps: true
});

module.exports = model('OAuth', OAuthSchema);