/**
 * Created by zwl on 2017/4/21.
 */
var sequelize = require('./sequelize');
var Sequelize = require('sequelize');

var blog = sequelize.define('blog', {
    // auto increment, primaryKey, unique
    Id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

    Author_Id:{type : Sequelize.INTEGER},

    Title : {type : Sequelize.STRING},
    // comment
    Label : {type : Sequelize.STRING},

    Author : {type : Sequelize.STRING},

    // allow null
    Content : {type : Sequelize.TEXT, allowNull : false},

});

blog.sync().then(function () {

});

function saveContent(author_id,title,label,author,content,callback) {
    blog.create({ Author_Id:author_id, Title: title, Label:label, Author:author, Content:content}, { fields: [ 'Author_Id','Title' ,'Label','Author','Content'] }).then(function(blog) {

        // let's assume the default of isAdmin is false:
        console.log(blog.Id); // => { username: 'barfooz', isAdmin: false }

        callback(null,blog);
    })
};


function getContent(kind,callback) {
    if (kind == "all") {
        blog.findAll().then(function (result) {
            callback(null,result);
        });
    }
    else {
        blog.findAll({where:["Label=?",kind]}).then(function (result) {
            callback(null,result);
        });
    }
}
function getContentById(author_id,callback) {
        blog.findAll({
            'where': {
                'Author_Id':author_id
            }
        }).then(function (result) {
            callback(null,result);
        });



}
exports.getContentById = getContentById;
exports.getContent = getContent;
exports.pub = saveContent;

// blog.save2 = save2;
// blog.getContent = getContent;
//
// module.exports = blog;