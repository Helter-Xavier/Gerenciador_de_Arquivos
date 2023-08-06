const fs = require('fs')

var oldPath = './public/upload/docUsers'
var newPath = './public/trash'

module.exports = function move(oldPath, newPath) {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err)
            }
            return
        }
        callback();
    })

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createReadStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback)

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream(writeStream)
    }
}