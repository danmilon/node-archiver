var fs = require('fs');

var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '/example-output.tar');
var archive = archiver('tar');

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

var file1 = __dirname + '/fixtures/file1.txt';
var file2 = __dirname + '/fixtures/file2.txt';

archive
  .addFile(fs.createReadStream(file1), { name: 'file1.txt' })
  .addFile(fs.createReadStream(file2), { name: 'file2.txt' });

archive.finalize(function(err, written) {
  if (err) {
    throw err;
  }

  console.log(written + ' total bytes written');
});