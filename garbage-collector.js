'use strict';

// Requires
const OS = require('os');
const CONFIG = {
	"trash": `${OS.homedir()}/.Trash`,
	"saved_trash": `${OS.homedir()}/Documents/.saved_trash`
}
const jetpack = require('fs-jetpack');
const chokidar = require('chokidar');

class TrashCollector {
	/**
	 * constructor
	 *
	 * Change directory stuff if we're on linux, exit if windows.
	 * Create the saved trash directory if it doesn't exist.
	 * Run watch();
	 */
	constructor() {
		let type = OS.type();
		if (type == 'Linux') {
			// Set to /home/$USER/.local/share/Trash
			CONFIG.trash = `${OS.homedir()}/.local/share/Trash`;
			CONFIG.saved_trash = `${OS.homedir()}/.saved_trash`;
		} else if (type == 'Windows_NT') {
			// probably return false?? for now??
			return false;
		}
		// Create the saved trash folder, if it doesn't exist
		if (!fs.existsSync(CONFIG.saved_trash)){
			fs.mkdirSync(CONFIG.saved_trash);
		}
		this.watch();
	}
	/**
	 * watch
	 *
	 * watch the trash, store everything we throw away
	 */
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
				size: fileInfo.size
			};
			// If we have a file, and if it's a screenshot
			if (trashObj.type == 'file' && this.checkIfImg(trashObj)) {
				// Copy the file here
				// TODO, upload the file instead
				console.log(trashObj.path);
				jetpack.copy(trashObj.path, `${CONFIG.saved_trash}/${trashObj.name}`, { overwrite: true });
			}
		}
	}
	/**
	 * checkIfImg
	 *
	 * @param  {object} obj [the trash object]
	 * @return {bool}     [whether the object is an image]
	 */
	checkIfImg(obj) {
		if (trashObj.name.indexOf('.png') !== -1 ||
			trashObj.name.indexOf('.jpg') !== -1 ||
			trashObj.name.indexOf('.jpeg') !== -1 ||
			trashObj.name.indexOf('.gif') !== -1) {
			return true;
		} else {
			return false;
		}
	}
}

const collector = new TrashCollector();
