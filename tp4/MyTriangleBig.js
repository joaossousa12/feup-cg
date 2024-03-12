import { CGFobject } from "../lib/CGF.js";

export class MyTriangleBig extends CGFobject {
    constructor(scene, check){
        super(scene);
        this.check = check
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            -2, 0, 0,
            2, 0, 0,
            0, 2, 0,
            -2, 0, 0,
            2, 0, 0,
            0, 2, 0
        ];

        this.indices = [
            0, 1, 2,
            5,4,3,
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,-1,
            0,0,-1,
            0,0,-1
        ];

        if(this.check == 0){
            this.texCoords=[
                1,1,
                1,0,
                0.5,0.5,
                1,1,
                1,0,
                0.5,0.5,
            ];
        } else {
            this.texCoords=[
                1,0,
                0,0,
                0.5,0.5,
                1,0,
                0,0,
                0.5,0.5,
            ];
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}