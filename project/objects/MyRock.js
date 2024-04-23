import { CGFobject } from '../../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param radius - radius of the rock
 */

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, radius = 1.0) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);
    
            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);
    
                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;
    
                let deformation = 1.0 + 0.3 * Math.random();
    
                x *= this.radius * deformation;
                y *= this.radius * deformation;
                z *= this.radius * deformation;
    
                this.vertices.push(x, y, z);
                let len = Math.sqrt(x * x + y * y + z * z);
                this.normals.push(x / len, y / len, z / len);
                
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }
    
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;
    
                this.indices.push(first, first + 1, second);
                this.indices.push(first + 1, second + 1, second);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    
}
