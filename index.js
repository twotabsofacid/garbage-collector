const jetpack = require('fs-jetpack');
const trashDir = '/Users/seanmscanlan/.Trash';

class TrashCollector {
	/**
	 * runSaveNames
	 * 
	 * save all trashed file names into a JSON file,
	 * keeping the name, file size, and date added to trash
	 */
	runSaveNames() {
		let allFiles = jetpack.list(trashDir);
		allFiles.forEach(file => {
			let fileInfo = jetpack.inspect(`${trashDir}/${file}`);
			console.log(fileInfo);
			let fileType = fileInfo.type;
			let fileSize = fileInfo.size;
			if (fileType === 'file' && file.split('')[0] !== '.') {
				//console.log('we should do this:', file);
			}
		});
	}
}

const collector = new TrashCollector();
collector.runSaveNames();