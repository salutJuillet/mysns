const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            img:{
                type: Sequelize.STRING(200),
                allowNull: true
            },
            filename:{
                type: Sequelize.STRING(200),
                allowNull: true
            },
            originalname:{
                type: Sequelize.STRING(200),
                allowNull: true
            },
            fileExt: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            fileSize:{
                type: Sequelize.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        })
    }
    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
    }
}