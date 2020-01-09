module.exports = function(){
    //  Dependencies
    var express = require('express');
    var router = express.Router();
    require('colors');
    var bugs = [];
    var types = ["Bug", "Change"];
    var priorities = ["Low", "Medium", "High"];
    var statuses = ["Raised", "In Progress", "Testing", "Completed"];
    for(var i = 1; i <= 10; i++){
        var status = statuses[Math.floor(Math.random()*statuses.length)];
        bugs.push({
            ID: i,
            description: `Bug ${i} Description`,
            page: `Bug ${i} Page`,
            component: `Bug ${i} Component`,
            type: types[Math.floor(Math.random()*types.length)],
            priority: priorities[Math.floor(Math.random()*priorities.length)],
            status: status,
            colour: status == "Completed" ? "table-success" : status == "Testing" ? "table-warning" : status == "In Progress" ? "table-primary" : "table-danger"
        });
    }
    router.get('/', function(req, res, next){
        res.render('Test.ejs', {
            title: "Test Page",
            version: global.version,
            project: 'Test Project',
            bugs: bugs
        });            
    });

    return router;
};