const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.image = require("./upload.model.js")(mongoose);

module.exports = db;