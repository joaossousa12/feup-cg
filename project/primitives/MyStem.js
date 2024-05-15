import { CGFappearance, CGFobject } from "../../lib/CGF.js";

export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        const angle = (2 * Math.PI) / this.slices;

        // Generate vertices and normals for side surface
        for (let i = 0; i <= this.stacks; i++) {
            const z = i * this.height / this.stacks;
            const radius = this.radius;
            for (let j = 0; j < this.slices; j++) {
                const x = radius * Math.cos(j * angle);
                const y = radius * Math.sin(j * angle);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0); // Normals for the side surface
            }
        }

        // Generate vertices and normals for top and bottom faces
        for (let i = 0; i <= this.stacks; i++) {
            const z = i * this.height / this.stacks;
            for (let j = 0; j < this.slices; j++) {
                const x = this.radius * Math.cos(j * angle);
                const y = this.radius * Math.sin(j * angle);
                const u = j / this.slices;
                const v = i / this.stacks;
                if (z === 0) {
                    this.vertices.push(x, y, z);
                    this.normals.push(0, 0, -1); // Normal for bottom face
                } else if (z === this.height) {
                    this.vertices.push(x, y, z);
                    this.normals.push(0, 0, 1); // Normal for top face
                }
                this.texCoords.push(u, v);
            }
        }

        // Generate indices for side surface
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const a = i * this.slices + j;
                const b = i * this.slices + (j + 1) % this.slices;
                const c = (i + 1) * this.slices + j;
                const d = (i + 1) * this.slices + (j + 1) % this.slices;
                this.indices.push(a, b, c);
                this.indices.push(b, d, c);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
