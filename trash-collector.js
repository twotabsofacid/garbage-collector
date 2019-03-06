'use strict';

// Requires
const CONFIG = require('./config.json');
const jetpack = require('fs-jetpack');
const moment = require('moment');
const chokidar = require('chokidar');

class TrashCollector {
	start() {
		// make sure we have a directory to save this stuff to
		jetpack.dir(CONFIG.saved_trash);
	}
	watch() {
		let watcher = chokidar.watch(CONFIG.trash);
		watcher.on('all', (event, path) => {
			this.runSaveTrashItem(event, path);
		});
	}
	/**
	 * runSaveNames
	 * 
	 * save all trashed file names into a JSON file,
	 * keeping the name, file size, and date added to trash
	 */
	runSaveTrashItem(event, path) {
		if (event == 'add') {
			// save the file info,
			// and create an object with an additional timestamp
			let fileInfo = jetpack.inspect(path);
			let trashObj = {
				name: fileInfo.name,
				path: `${CONFIG.trash}/${fileInfo.name}`,
				type: fileInfo.type,
				size: fileInfo.size,
				time: moment().format('MM/DD/YYYY,HH:mm:ss.SS')
			};
			// If we have a file, and if it's a screenshot
			if (trashObj.type == 'file' && trashObj.name.indexOf('Screen Shot') !== -1) {
				// Copy the file here
				console.log(trashObj.path);
				jetpack.copy(trashObj.path, `${CONFIG.saved_trash}/${trashObj.name}`, { overwrite: true });
			}
		}
	}
	/**
	 * uploadToServer
	 *
	 * Here we want to upload all of our trash data to the server,
	 * probably using some sort of npm package for scp
	 */
	uploadToServer() {

	}
}

const collector = new TrashCollector();
collector.watch();