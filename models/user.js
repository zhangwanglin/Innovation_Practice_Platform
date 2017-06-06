var sequelize = require('./sequelize');
var Sequelize = require('sequelize');

var user = sequelize.define('user', {
    // auto increment, primaryKey, unique
    Id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        unique : true,
        // references: {
        //     model: 'comment',
        //     key: 'User_Id'
        // }
        // association: function (comment) {
        //     user.hasMany(comment.Article_Id);
        // }

    },

    // comment
    Username : {type : Sequelize.STRING},

    // allow null
    Password : {type : Sequelize.TEXT, allowNull : false},

    Name : {type : Sequelize.STRING},

    Sex : {type : Sequelize.TEXT},

    School_Num : {type : Sequelize.INTEGER},
});

user.sync().then(function () {

});

function getUserCount(username,callback) {
    // user.findAll().then(function (user) {
    //     console.log(user.Id);
    //     callback(user);
    // });
    user.count({ where: ["Username = ?", username] }).then(function(num) {
        console.log("There are " + num + " projects");
        callback(num);
    });
};

function save(username,password,callback) {
    user.create({ Username: username, Password:password}, { fields: [ 'Username' ,'Password'] }).then(function(user) {

        // let's assume the default of isAdmin is false:
        console.log(user.Id); // => { username: 'barfooz', isAdmin: false }

        callback(null,user);
    })
};

function getUser(username,callback) {
    user.findOne({where:["Username=?",username]}).then(function (user) {
        if(user!= null){
            console.log(user.Id);
        }
        callback(null,user);
    })

}

function saveUser_information(user_id,name,sex,school_num,callback) {
    user.update({ Name: name, Sex:sex,School_Num:school_num}, { fields: [ 'Name' ,'Sex','School_Num'],where: ["Id = ?", user_id]}).then(function(user) {
        callback(null,user);
    })
};

function getUser_information(id,callback) {
    user.findOne({where:["Id=?",id]}).then(function (user) {
        if(user!= null){
            // console.log(user.Id);
        }
        callback(null,user);
    })

}


exports.getUser_information = getUser_information;
exports.saveUser_information = saveUser_information;
exports.insert = save;
exports.getUser= getUser;
exports.getUserCount = getUserCount;


