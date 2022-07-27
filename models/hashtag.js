const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        })
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {
            through: 'PostHashtag'
        })
    }
}