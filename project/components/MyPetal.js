import {CGFappearance, CGFobject } from '../../lib/CGF.js';
/**
* MyPetal
* @constructor
 * @param scene - Reference to MyScene object
 * @param size - size to scale the petal to
*/
export class MyPetal extends CGFobject {
    constructor(scene, size) {
        super(scene);
        this.size = size;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [
            0,0,0, //0
            this.size/4,this.size/2,this.size/4, //1
            this.size/4,this.size/2,-this.size/4, //2
            0,this.size,0, //3
            this.size/4,this.size/2,this.size/4, //4
            this.size/4,this.size/2,-this.size/4, //5
            0,0,0, //6
            this.size/4,this.size/2,this.size/4, //7
            this.size/4,this.size/2,-this.size/4, //8
            0,this.size,0, //9
            
        ];
        this.indices = [
            6,7,8, //tras
            0,2,1, //frente
            3,1,2, //frente
            9,8,7 //tras
        ];
        this.normals = [
            4.5,-1,0, //0
            4.5,-1,0, //1
            4.5,-1,0, //2
            5,2,0, //3
            5,2,0, //4
            5,2,0, //5
            -4.5,1,0, //6
            -1,0,0, //7
            -1,0,0, //8
            -4.5,-1,0, //9
            //-this.size,-this.size,0, //10
            //-this.size,-this.size,0 //11
        ];

        this.texCoords = [
            0.5, 1, //0
            1, 0.5, //1
            0, 0.5, //2
            0.5, 0, //3
            1, 0.5, //4
            0, 0.5, //5
            0.5, 1, //6
            1, 0.5, //7
            0, 0.5, //8
            0.5, 0  //9
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
