const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({ //컬럼 생성
            email:{
                type : Sequelize.STRING(100),
                allowNull : true,
                unique : true
            },
            password:{
                type : Sequelize.STRING(100),
                allowNull : true
            },
            nick:{
                type : Sequelize.STRING(30),
                allowNull : this.truncate
            },
            provider:{
                type : Sequelize.STRING(10),
                allowNull : false,
                defaultValue : 'local'
            },
            snsId:{
                type : Sequelize.STRING(50),
                allowNull : true
            }
        }, { //sequelize 기본 옵션 세팅
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });
    }
    //db 접속
    static associate(db){
        //foreign key 연결
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow'
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        });
    }
}