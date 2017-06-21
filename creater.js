
const fs = require('fs');
var path = require('path');

function create(name, atpath = './') {

    // check config file exist
    if (!fs.existsSync('./mcreater.config.json')) {
        console.log('No config file found, you need call init first.')
        return;
    }

    // create file
    var config = JSON.parse(fs.readFileSync('./mcreater.config.json'));
    if (config instanceof Array) {
        createArray(name, atpath, config);
    } else if (config instanceof Object) {
        createObject(name, atpath, config);
    } else {
        console.log('config data need Array or Object');
    }
    return;
}

function createArray(fn, fp, array) {
    array.forEach(function (element) {
        var filename = element.replace('${name}', fn);  // 替换${name}
        var filepath = path.join(fp, filename);
        if (fs.existsSync(filepath)) {
            console.log(filename, 'is exists');
            return;
        }
        mkFile(filepath, '\n', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('create file ' + filename + ' done');
            }
        });
    }, this);
}

function createObject(fn, fp, dict) {
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            var element = dict[key];
            var excKey = key.replace('${name}', fn);    // 替换${name}
            var excPath = path.join(fp, excKey);
            mkdir(excPath);
            if (element instanceof Array) {
                createArray(fn, excPath, element);
            } else if (element instanceof Object) {
                createObject(fn, excPath, element);
            } else {
                var filename = path.join(excPath, element);
                mkFile(filename, '\n', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('create file ' + filename + ' done');
                    }
                });
            }
        }
    }
}

function mkFile(fn, content, cb) {
    if (fs.existsSync(fn)) {
        console.log(fn, 'is exist');
        return;
    }
    fs.writeFile(fn, content, function (err, data) {
        cb(err, data);
    });
}

function mkdir(dirpath, dirname) {
    //判断是否是第一次调用  
    if (typeof dirname === "undefined") {
        if (fs.existsSync(dirpath)) {
            return;
        } else {
            mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        //判断第二个参数是否正常，避免调用时传入错误参数  
        if (dirname !== path.dirname(dirpath)) {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath)
        } else {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}

exports.create = create;
