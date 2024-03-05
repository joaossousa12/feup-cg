import { CGFobject } from "../lib/CGF.js";

export class MyParallelogram extends CGFobject{
    constructor(scene){
        super(scene);

        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            0, 0, 0,
            1, 1, 0,
            3, 1, 0,
            2, 0, 0,
            0, 0, 0,
            1, 1, 0,
            3, 1, 0,
            2, 0, 0
        ];

        this.indices = [
            0, 3, 2,
            2, 1, 0,
            2, 3, 0,
            0, 1, 2,
            3, 6, 5,
            5, 4, 3,
            5, 6, 3,
            3, 4, 5
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1
        ];


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}