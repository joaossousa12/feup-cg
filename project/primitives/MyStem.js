import { CGFobject } from "../../lib/CGF.js";

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

        for (let i = 0; i <= this.stacks; i++) {
            const z = i * this.height / this.stacks;
            for (let j = 0; j < this.slices; j++) {
                const x = this.radius * Math.cos(j * angle);
                const y = this.radius * Math.sin(j * angle);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
                this.texCoords.push(j / this.slices, i / this.stacks);
            }
        }

        const bottomCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1); 
        this.texCoords.push(0.5, 0.5);

        const topCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, this.height); 
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

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

        for (let j = 0; j < this.slices; j++) {
            const a = j;
            const b = (j + 1) % this.slices;
            this.indices.push(bottomCenterIndex, b, a);
        }

        const topStartIndex = (this.stacks) * this.slices;
        for (let j = 0; j < this.slices; j++) {
            const a = topStartIndex + j;
            const b = topStartIndex + (j + 1) % this.slices;
            this.indices.push(topCenterIndex, a, b);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
