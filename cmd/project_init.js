#!/usr/bin/env node

var fs = require('fs');

/*使用方法：
1、在项目的package.json里加上
"bin": {
    "pinit": "./btoolkit-for-nodejs/cmd/project_init.js"
 }
2、执行npm命令：npm link,完成
3、使用pinit语句执行执行拷贝模板到项目
*/

console.log('Start to add config folder...');

copyFolder('./btoolkit-for-nodejs/cmd/templates/config', './config');
copyFolder('./btoolkit-for-nodejs/cmd/templates/models', './models');

//复制文件夹
function copyFolder(fromSrc, toSrc) {
	let files = [];
	if (fs.existsSync(toSrc)) {
		files = fs.readdirSync(fromSrc);
		files.forEach(function(file, index) {
			var targetPath = fromSrc + "/" + file;
			var toPath = toSrc + '/' + file;
			if (fs.statSync(targetPath).isDirectory()) {
				copyFolder(targetPath, toPath);
			} else {
				fs.copyFileSync(targetPath, toPath);
			}
		});
	} else {
		fs.mkdirSync(toSrc);
		copyFolder(fromSrc, toSrc);
	}
}

//创建文件夹
function mkdir(pos, dirArray, _callback) {
	var len = dirArray.length;
	console.log(len);
	if (pos >= len || pos > 10) {
		_callback();
		return;
	}
	var currentDir = '';
	for (var i = 0; i <= pos; i++) {
		if (i != 0) currentDir += '/';
		currentDir += dirArray[i];
	}
	fs.exists(currentDir, function(exists) {
		if (!exists) {
			fs.mkdir(currentDir, function(err) {
				if (err) {
					console.log('创建文件夹出错！');
				} else {
					mkdir(pos + 1, dirArray, _callback);
				}
			});
		} else {
			mkdir(pos + 1, dirArray, _callback);
		}
	});
}

//创建目录结构
function mkdirs(dirpath, finishcallback) {
	var dirArray = dirpath.split('/');
	fs.exists(dirpath, function(exists) {
		if (!exists) {
			mkdir(0, dirArray, function() {
				finishcallback();
			});
		} else {
			finishcallback();
		}
	});
}
