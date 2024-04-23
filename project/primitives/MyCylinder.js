import { CGFobject } from "../../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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
        
        for (var i = 0 ; i <= this.stacks ; i += 1) {
            this.vertices.push(1, 0, i / this.stacks);
            this.normals.push(1, 0, 0);
        }

        for (var stackIndex = 1 ; stackIndex <= this.slices ; stackIndex++) {

            var x = Math.cos(2 * Math.PI * stackIndex / this.slices);
            var y = Math.sin(2 * Math.PI * stackIndex / this.slices);

            var vector_size = Math.sqrt(x * x + y * y);
            if (stackIndex != this.slices) {    
                this.vertices.push(x, y, 0);
                this.normals.push(x / vector_size, y / vector_size, 0);
            }

            for (var i = 1 ; i <= this.stacks ; i++) {
                
                if (stackIndex != this.slices) {

                    var z = i / this.stacks;
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, y / vector_size, 0);
                    
                    var points = this.vertices.length / 3;
                    var indexC = points - 2;
                    var indexD = points - 1;
                    var indexB = indexD - (this.stacks + 1);
                    var indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
                    this.indices.push(indexA, indexD, indexC, indexA, indexB, indexD);

                } else {

                    var points = this.vertices.length / 3;
                
                    var indexC = i - 1;
                    var indexD = i;
                    var indexB = points - this.stacks - 1 + i;
                    var indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
                    this.indices.push(indexA, indexD, indexC, indexA, indexB, indexD);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}