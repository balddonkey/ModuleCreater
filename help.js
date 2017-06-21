
function sehelp(args) {
    if (args == null) phelp();
    else {
        var argv = args[0];
        if (argv == '-v' || argv == '--version') pversion();
        // else if (argv == '-w' || argv == '--workspace') mapping.pWorkspace();
        // else if (argv == '-p' || argv == '--print') mapping.pRepos(args);
        else phelp();
    }
}

function phelp() {
    console.log('\nUsage: mcreater <command> [options]\n');
    console.log('Options:\n');
    console.log('-h, --help             output usage information');
    console.log('-v, --version          output the version number');
    console.log('Commands: \n');
    console.log('init   init mcreater config file');
    console.log('create <module name> [path] creater module name, option at path');
}

function pversion() {
    const fs = require('fs');
    var d = JSON.parse(fs.readFileSync('./package.json'));
    console.log('mcreater version: ' + d.version);
}

exports.help = sehelp;
