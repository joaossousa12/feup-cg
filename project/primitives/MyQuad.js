import {CGFobject} from '../../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0, -0.5,	//0
			0.5, 0, 0.5,	//1
			-0.5, 0, 0.5,	//2
			-0.5, 0, -0.5, 	//3

            0.5, 0, -0.5,	//4
			0.5, 0, 0.5,	//5
			-0.5, 0, 0.5,	//6
			-0.5, 0, -0.5		//7
		];

		this.indices = [
			3, 0, 1,
            3, 1, 2,

            5, 4, 7,
            6, 5, 7
		];

		
		this.normals = [
			0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
			0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
           
		];

		this.texCoords = [
			0, 0,
			0, 1,
			1, 0,
			1, 1,
            0, 0,
            0, 1,
            1, 0,
            1, 1
		];
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

