import { CGFobject } from "../../lib/CGF.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene){
        super(scene);

        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            1, -1, 0,
            -1, -1, 0,
            -1, 1, 0,
            1, -1, 0,
            -1, -1, 0,
            -1, 1, 0,
        ];

        this.indices = [
            1, 0, 2,  
            3, 4, 5,  
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
        ];

        this.texCoords = [
            0.5, 1,
            0, 1,
            0, 0.5,
            0.5, 1,
            0, 1,
            0, 0.5,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}