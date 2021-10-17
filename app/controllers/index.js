const fs = require('fs');
// const { model } = require('mongoose');
const path = require('path');
const basename = path.basename(__filename);

const controller = {}
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-13) === 'Controller.js');
}).forEach(file => {
    controller[file.slice(0, file.length - 13)] = require(`./${file.slice(0, file.length - 3)}`)
    // console.log(db);
})
module.exports = controller;

