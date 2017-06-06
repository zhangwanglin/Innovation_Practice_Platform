/**
 * Created by zwl on 2017/6/6.
 */
var sequelize = require('./sequelize');
var Sequelize = require('sequelize');

var concern = sequelize.define('concern', {

    Id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

    Concern_Id : {type : Sequelize.INTEGER,},

    Concerned_Id : {type : Sequelize.INTEGER},

});

concern.sync().then(function () {

});

function save_concern(concern_id,concerned_id,callback) {
    concern.create({ Concern_Id: concern_id, Concerned_Id:concerned_id}, { fields: [ 'Concern_Id' ,'Concerned_Id'] }).then(function(result) {

        callback(null,concern);
    })
}
function get_concern(concern_id,callback) {

   concern.findAll({where:["concern_id=?",concern_id]}).then(function (result) {
            callback(null,result);
   });

}

function del_concern(concern_id,concerned_id,callback) {

    concern.destroy({
        'where':{
            'concern_id':concern_id,
            'concerned_id':concerned_id
        }
    }).then(function (result) {
        callback(null,result);
    });

}

exports.save_concern =save_concern;
exports.get_concern =get_concern;
exports.del_concern =del_concern;