import { CGFobject } from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inverted = false, radius = 1.0) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() { 
        var i, ai, si, ci;
        var j, aj, sj, cj;
        var p1, p2;

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // loop over the stacks (from bottom to top)
        for (j = 0; j <= this.stacks * 2; j++) {
            // calculate the angle with the YY axis
            aj = j * Math.PI / this.slices;
            sj = Math.sin(aj);
            cj = Math.cos(aj);
            // loop over the slices (around the sphere)
            for (i = 0; i <= this.slices; i++) {
                // calculate the angle with the XX axis
                ai = i * 2 * Math.PI / this.slices;
                si = Math.sin(ai);
                ci = Math.cos(ai);
                
                // calculate vertex position
                var x = this.radius * si * sj;
                var y = this.radius * cj;
                var z = this.radius * ci * sj;

                this.vertices.push(x, y, z);
                
                // calculate the normal
                var length = Math.sqrt(x * x + y * y + z * z);
                if(this.inverted){
                    this.normals.push(-x / length, -y / length, -z / length);
                } else {
                    this.normals.push(x / length, y / length, z / length);
                }

                // for the earth it is not exactly the same as in the picture (in terms of texture position) but we tested 
                // with other values and with this.texCoords.push(i / this.slices + 0.37, j / this.slices); it is the closest
                // to the picture but we decided to keep the original values because of other spheres
                this.texCoords.push(i / this.slices, j / this.slices);
            }
        }

        for (j = 0; j < this.stacks * 2; j++) {
            for (i = 0; i < this.slices; i++) {
                // calculate the indices for the two triangles that make up the current quadrilateral
                p1 = j * (this.slices + 1) + i;
                p2 = p1 + (this.slices + 1);
                
                // when j equals 0 or this.slices p1 and p1 + 1 are the same point (the poles) so the quadrilaterals degenerate into triangles.
                if (this.inverted) {
                    this.indices.push(p1, p1 + 1, p2);
                    this.indices.push(p1 + 1, p2 + 1, p2);
                } else {
                    this.indices.push(p1, p2, p1 + 1);
                    this.indices.push(p1 + 1, p2, p2 + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
