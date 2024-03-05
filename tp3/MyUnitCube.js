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
            0, 9, 3,
            3, 6, 0, // face da esquerda
            18,21,15,
            15,12,18, // face da direita
            9,18,12,
            12,3,9, // face da frente
            21,0,6,
            6,15,21, // face de atrás
            12,15,6,
            6,3,12, // face de cima
            21,18,9,
            9,0,21 // face de baixo
        ];

        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}