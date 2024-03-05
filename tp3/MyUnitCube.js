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
            -0.5, -0.5, -0.5, //A
            -0.5, -0.5, -0.5, //A
			-0.5, 0.5, 0.5,	//B
            -0.5, 0.5, 0.5,	//B
            -0.5, 0.5, 0.5,	//B
			-0.5, 0.5, -0.5, //C
            -0.5, 0.5, -0.5, //C
            -0.5, 0.5, -0.5, //C
            -0.5, -0.5, 0.5, //D
            -0.5, -0.5, 0.5, //D
            -0.5, -0.5, 0.5, //D
            0.5, 0.5, 0.5, //E
            0.5, 0.5, 0.5, //E
            0.5, 0.5, 0.5, //E
            0.5, 0.5, -0.5, //F
            0.5, 0.5, -0.5, //F
            0.5, 0.5, -0.5, //F
            0.5, -0.5, 0.5, //G
            0.5, -0.5, 0.5, //G
            0.5, -0.5, 0.5, //G
            0.5, -0.5, -0.5, //H
            0.5, -0.5, -0.5, //H
            0.5, -0.5, -0.5 //H
		];
        
        this.normals = [
            -1, 0, 0,
            0, -1, 0,
            0, 0, -1, // A
            -1, 0, 0,
            0, 1, 0,
            0, 0, 1, // B
            -1, 0, 0,
            0, 1, 0,
            0, 0, -1, // C
            -1, 0, 0,
            0, -1, 0,
            0, 0, 1, // D
            1, 0, 0,
            0, 1, 0,
            0, 0, 1, // E
            1, 0, 0,
            0, 1, 0,
            0, 0, -1, // F
            1, 0, 0,
            0, -1, 0,
            0, 0, 1, // G
            1, 0, 0,
            0, -1, 0,
            0, 0, -1 // H
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
            9,18,0,
            21,0,18, 
            0,18,9,
            18,0,21, // face de baixo (visivel dos dois lados)
            6,3,15,
            12,15,3, 
            15,3,6,
            3,15,12, // face de cima (visivel dos dois lados)
            9,18,3,
            12,3,18, 
            3,18,9,
            18,3,12, // face da frente (visivel dos dois lados)
            18,21,12,
            15,12,21, 
            12,21,18,
            21,12,15, // face da direita (visivel dos dois lados)
            9,0,3,
            6,3,0, 
            3,0,9,
            0,3,6, // face da esquerda (visivel dos dois lados)
            0,21,6,
            15,6,21,
            6,21,0,
            21,6,15  // face de trás (visivel dos dois lados)
        ];

        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}