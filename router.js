
const fs = require('fs');
const Setup = require('./setup.js');
const Creater = require('./creater.js');
const help = require('./help.js').help;

function route(args) {
    var handle = args[0];
    if (handle == 'init') Setup.init();
    else if (handle == 'create') {
        var name = args[1];
        if (args.length > 2) {
            Creater.create(name, args[2]);
        } else {
            Creater.create(name);
        }
    } else {
        console.log('Unknow command: ' + handle);
        help();
    }
}

exports.route = route;
