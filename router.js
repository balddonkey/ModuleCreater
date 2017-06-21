
const Setup = require('./setup.js');
const Creater = require('./creater.js');

function route(args) {
    var handle = args[0];
    if (handle == 'init') Setup.init();
    else if (handle == 'create') {
        var name = args[1];
        var path = null;
        if (args.length > 2) {
            path = args[2];
        }
        Creater.create(name, path);
    }
}

exports.route = route;
