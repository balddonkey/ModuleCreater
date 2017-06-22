
const fs = require('fs');

const fname = 'mcreater.config.json'
const aa = '{}';
const defaultContent = {
    default: {
        map: "./",
        hierarchy: [
            "${name}.js",
            "${name}.css"
        ]
    },
    page: {
        map: "./Pages",
        hierarchy: {
            "${name}subpath": [
                "${name}.js",
                "${name}.css"
            ]
        }
    },
    conponent: {
        map: "./Components",
        hierarchy: [
            "${name}.js",
            "${name}.css"
        ]
    }
};

function init() {
    fs.exists(fname, function (exists) {
        if (exists) return;
        console.log('no exists');
        fs.writeFile(fname, JSON.stringify(defaultContent, null, 4), function (err, data) {
            console.log('init done');
        });
    });
}

exports.init = init;

