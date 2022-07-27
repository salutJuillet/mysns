const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {}; //db는 object라고 선언
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config // :전체적인 db 정보. 이걸 빼먹었어서 오류가..!
);

//db 연동
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

//sequelize 객체 연결
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

//db객체 연결
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;