import { CGFobject } from "../../lib/CGF.js";

/**
 * MyGrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyGrassBlade extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0.0, 0.0, 0.0,   
            0.1, 0.0, 0.0,   
            0.0, 0.3, 0.0,   
            0.1, 0.3, 0.0,   
            -0.05, 0.6, 0.0,   
            0.05, 0.6, 0.0,   
            0.0, 1.0, 0.0    
        ];

         
        this.indices = [
            0, 1, 2,     
            1, 3, 2,     
            2, 3, 4,     
            3, 5, 4,     
            4, 5, 6,     
            2, 1, 0,    
            2, 3, 1,     
            4, 3, 2,     
            4, 5, 3,     
            6, 5, 4      
        ];

         
        this.normals = [
            0.0, 0.0, 1.0,   
            0.0, 0.0, 1.0,   
            0.0, 0.0, 1.0,   
            0.0, 0.0, 1.0,   
            0.0, 0.0, 1.0,   
            0.0, 0.0, 1.0,   
            0.0, 0.0, 1.0,   
            0.0, 0.0, -1.0,   
            0.0, 0.0, -1.0,   
            0.0, 0.0, -1.0,   
            0.0, 0.0, -1.0,   
            0.0, 0.0, -1.0,   
            0.0, 0.0, -1.0,   
            0.0, 0.0, -1.0    
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
