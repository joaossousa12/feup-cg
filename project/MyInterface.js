import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displayRockSet').name('Display RockSet');
        this.gui.add(this.scene, 'displayRock').name('Display Rock');
        //this.gui.add(this.scene, 'displayBee').name('Display Bee');
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayTask5').name('Display Task5');
        this.gui.add(this.scene.camera, 'fov', 0, 3).name('FOV');
        this.gui.add(this.scene, 'beeSpeed', 0.1, 3).name('Bee Speed');
        this.gui.add(this.scene, 'beeScale', 0.5, 3).name('Bee Scale');

        this.initKeys();
        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}