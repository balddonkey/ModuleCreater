#!/usr/bin/env node

const help = require('./help.js').help;
const router = require('./router.js');

var args = process.argv.splice(2)

if (args.length > 0) {
    if (args[0].indexOf('-') > -1) help(args);
    else router.route(args);
} else {
    help();
}
