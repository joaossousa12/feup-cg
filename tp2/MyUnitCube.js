import { CGFobject } from "../lib/CGF.js";
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5, //A
			-0.5, 0.5, 0.5,	//B
			-0.5, 0.5, -0.5, //C
            -0.5, -0.5, 0.5, //D
            0.5, 0.5, 0.5, //E
            0.5, 0.5, -0.5, //F
            0.5, -0.5, 0.5, //G
            0.5, -0.5, -0.5 //H
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			3,6,0,
            7,0,6, 
            0,6,3,
            6,0,7, // face de baixo (visivel dos dois lados)
            2,1,5,
            4,5,1, 
            5,1,2,
            1,5,4, // face de cima (visivel dos dois lados)
            3,6,1,
            4,1,6, 
            1,6,3,
            6,1,4, // face da frente (visivel dos dois lados)
            6,7,4,
            5,4,7, 
            4,7,6,
            7,4,5, // face da direita (visivel dos dois lados)
            3,0,1,
            2,1,0, 
            1,0,3,
            0,1,2, // face da esquerda (visivel dos dois lados)
            0,7,2,
            5,2,7,
            2,7,0,
            7,2,5  // face de trás (visivel dos dois lados)
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}