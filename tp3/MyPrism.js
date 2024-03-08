import { CGFobject } from "../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks){
        super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        var vertexIndex = 0;
        var alphaAngleStep = 2 * Math.PI / this.slices;
        
        for (var sliceIndex = 0 ; sliceIndex < this.slices ; sliceIndex++) {
    
            var x1 = Math.cos(sliceIndex * alphaAngleStep);
            var y1 = Math.sin(sliceIndex * alphaAngleStep);

            var x2 = Math.cos((sliceIndex + 1) * alphaAngleStep);
            var y2 = Math.sin((sliceIndex + 1) * alphaAngleStep);
            
            var alphaAngleStepZ = 1 / this.stacks;
            for (var stackIndex = 0 ; stackIndex < this.stacks ; stackIndex++) {
    
                var x = Math.cos((sliceIndex + 0.5) * alphaAngleStep);
                var y = Math.sin((sliceIndex + 0.5) * alphaAngleStep);
                
                var size = Math.sqrt(x*x + y*y);
    
                this.vertices.push(x1, y1, alphaAngleStepZ * stackIndex);
                this.vertices.push(x2, y2, alphaAngleStepZ * stackIndex);
                this.vertices.push(x1, y1, alphaAngleStepZ * (stackIndex + 1));
                this.vertices.push(x2, y2, alphaAngleStepZ * (stackIndex + 1));
                
                // made the prism double sided
                this.indices.push(vertexIndex + 2, vertexIndex, vertexIndex + 1, vertexIndex + 1, vertexIndex + 3, vertexIndex + 2);
                this.indices.push(vertexIndex + 2, vertexIndex + 1, vertexIndex, vertexIndex + 1, vertexIndex + 2, vertexIndex + 3);

                this.normals.push(x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0);
                
                vertexIndex += 4;
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

	updateBuffers(complexity){
    }
}

    