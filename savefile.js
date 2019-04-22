var fs = require('fs');

module.exports = function(fromPath, toPath, finishcallback) {
	let savePath = getDirFromPath(toPath);
	let readStream = fs.createReadStream(fromPath);
	readStream.on('data', function(data) {
		checkAndMakeDir(savePath, function() {
			let writeStream = fs.createWriteStream(toPath);
			writeStream.write(data);
			finishcallback();
		});
	});
}

function getDirFromPath(path) {
	if (isDir(path)) {
		return path;
	} else {
		let dirArray = path.split('/');
		let newPath = '';
		for (let i = 0; i < dirArray.length - 1; i++) {
			newPath += dirArray[i];
			if (i < dirArray.length - 2) {
				newPath += '/';
			}
		}
		return newPath;
	}
}

function isDir(path) {
	if (fs.existsSync(path)) {
		return fs.statSync(path).isDirectory();
	}
	return false;
}

function checkAndMakeDir(path, finishcallback) {
	var dirArray = path.split('/');
	fs.exists(path, function(exists) {
		if (!exists) {
			mkdir(0, dirArray, function() {
				finishcallback();
			});
		} else {
			finishcallback();
		}
	});
}

function mkdir(pos, dirArray, _callback) {
	var len = dirArray.length;
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
					console.log('创建文件夹出错：' + err);
				} else {
					mkdir(pos + 1, dirArray, _callback);
				}
			});
		} else {
			mkdir(pos + 1, dirArray, _callback);
		}
	});
}
