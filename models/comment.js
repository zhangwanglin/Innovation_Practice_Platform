/**
 * Created by zwl on 2017/4/21.
 */
var sequelize = require('./sequelize');
var Sequelize = require('sequelize');
var user =require('./user');
var select =require('../models/user');

var comment = sequelize.define('comment', {

    Id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

    User_Id : {
        type : Sequelize.INTEGER,
        // references: {
        //     model: user,
        //     key: 'Id',
        // }
        // association: function (user) {
        //     comment.belongsTo(user.Id);
        // }
    },

    Article_Id : {type : Sequelize.INTEGER},

    Content : {type : Sequelize.TEXT},

});

comment.sync().then(function () {

});

function save_comment(user_id,article_id,content,callback) {
    comment.create({ User_Id:user_id,Article_Id:article_id, Content: content,}, { fields: [ 'User_Id','Article_Id','Content' ] }).then(function(result) {
        console.log(comment.Id);
        callback(null,result);
    })
}

function get_comment(article_id,callback) {
    comment.findAll({
        where:["Article_Id=?",article_id]
    }).then(function (result) {
        // var final_result = new Array();
        var name = "", username = "";

        let a = result.map(x => {
            return new Promise((resolve, reject) => {
                select.getUser_information (x.User_Id, function (err, data) {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    if (data === null)
                        resolve();
                    username = data.Username;
                    name = data.Name;
                    let final_result = {
                        "Id": x.Id,
                        "User_Id": x.User_Id,
                        "Username": username,
                        "Name": name,
                        "Article_Id": x.Article_Id,
                        "Content": x.Content,
                        "createdAt": x.createdAt,
                        "updatedAt": x.updatedAt
                    };
                    resolve(final_result);
                });
            });
        });

        Promise.all(a).then(x => {
            callback(null, x);
        })
        //callback(null,final_result);
    });
}


exports.save_comment = save_comment;
exports.get_comment = get_comment;