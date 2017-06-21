
const fs = require('fs');
var path = require('path');

function create(name, atpath = './') {

    // check config file exist
    if (!fs.existsSync('./mcreater.config.json')) {
        console.log('No config file found, you need call init first.')
        return;
    }

    // mkdir
    if (atpath != null) {
        mkdir(atpath);
    }

    // create file
    var config = JSON.parse(fs.readFileSync('./mcreater.config.json'));
    config.forEach(function (element) {
        var filename = element.replace('${name}', name);
        var filepath = path.join(atpath, filename);
        if (fs.existsSync(filepath)) {
            console.log(filename, 'is exists');
            return;
        }
        fs.writeFile(filepath, '\n', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('create file ' + filename + ' done');
            }
        });
    }, this);

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
