
const fs = require('fs');

const fname = 'mcreater.config.json'
const defaultContent = '[\n\t"${name}.js",\n\t"${name}.css"\n]'

function init() {
    fs.exists(fname, function(exists) {
        if (exists) return;

        fs.writeFile(fname, defaultContent, function(err, data) {
            console.log('init done');
        });
    });
}

exports.init = init;
