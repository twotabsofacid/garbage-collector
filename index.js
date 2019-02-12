'use strict';

// Requires
const CONFIG = require('./config.json');
const jetpack = require('fs-jetpack');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const moment = require('moment');
const chokidar = require('chokidar');

// Instantiate the db
const adapter = new FileSync(CONFIG.db);
const db = low(adapter);

class TrashCollector {
	watch() {
		let watcher = chokidar.watch(CONFIG.trash);
		watcher.on('all', (event, path) => {
			//console.log(event, path);
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
				type: fileInfo.type,
				size: fileInfo.size,
				time: moment().format('MM/DD/YYYY,HH:mm:ss.SS')
			};
			// If we have a file, and if it's not a dot file
			if (trashObj.type == 'file' && trashObj.name.split('')[0] !== '.') {
				db.get('trash')
					.push(trashObj)
					.write();
				this.uploadToServer();
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