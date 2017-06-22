
const fs = require('fs');
const path = require('path');
const readline = require('readline');

function create(name, map) {

    // check config file exist
    if (!fs.existsSync('./mcreater.config.json')) {
        console.log('No config file found, you need call init first.')
        return;
    }

    // create file
    if (map == null) {
        console.log('Unspecified path map, use default settings.');
        map = 'default';
    }
    var configs = JSON.parse(fs.readFileSync('./mcreater.config.json'));
    var config = configs[map];
    if (config == null) {
        console.log('Not found path map: ' + map + ", checkout mcreater.config.json file.");
    } else {
        console.log('create');
        createAtPath(name, config.map, config.hierarchy);
    }
}

function createAtPath(fname, fpath, hierarchy) {
    mkdir(fpath);
    if (hierarchy instanceof Array) {
        createArray(fname, fpath, hierarchy);
    } else if (hierarchy instanceof Object) {
        createObject(fname, fpath, hierarchy);
    } else {
        console.log('config data need Array or Object');
    }
}

function createArray(fn, fp, array) {
    array.forEach(function (element) {
        if (element instanceof Array) {
            mkdir(fp);
            createArray(fn, fp, element);
        } else if (element instanceof Object) {
            mkdir(fp);
            createObject(fn, fp, element);
        } else {
            var filename = element.replace('${name}', fn);  // 替换${name}
            var filepath = path.join(fp, filename);
            if (fs.existsSync(filepath)) {
                console.log(filepath, 'is exists');
                return;
            }
            mkFile(filepath, '\n', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('create file ' + filepath + ' done');
                }
            });
        }
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
                var filepath = path.join(excPath, element);
                if (fs.existsSync(filepath)) {
                    console.log(filepath, 'is exists');
                    return;
                }
                mkFile(filepath, '\n', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('create file ' + filepath + ' done');
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
