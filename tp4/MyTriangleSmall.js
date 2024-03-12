import { CGFobject } from "../lib/CGF.js";

export class MyTriangleSmall extends CGFobject {
    constructor(scene, check){
        super(scene);
        this.check = check;
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            -1, 0, 0,
            1, 0, 0,
            0, 1, 0,
            -1, 0, 0,
            1, 0, 0,
            0, 1, 0
        ];

        this.indices = [
            0, 1, 2,
            5, 4, 3
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
                0.25, 0.75,
                0.75, 0.75,
                0.5, 0.5,
                0.25, 0.75,
                0.75, 0.75,
                0.5, 0.5
            ];
        } else {
            this.texCoords=[
                0, 0,
                0, 0.5,
                0.25, 0.25,
                0, 0,
                0, 0.5,
                0.25, 0.25
            ];
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}