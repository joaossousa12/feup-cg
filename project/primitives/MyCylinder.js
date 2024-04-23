import { CGFobject } from "../../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        for (var i = 0; i <= this.stacks; i++) {
            for (var j = 0; j <= this.slices; j++) {
                var angle = 2 * Math.PI * j / this.slices;
                var x = Math.cos(angle);
                var y = Math.sin(angle);

                this.vertices.push(x, y, i / this.stacks);
                this.normals.push(x, y, 0);
                
                if (i < this.stacks && j < this.slices) {
                    var current = i * (this.slices + 1) + j;
                    var next = current + (this.slices + 1);
                    this.indices.push(current, next + 1, next, current, current + 1, next + 1);
                    this.indices.push(current, next, next + 1, current, next + 1, current + 1);
                }
            }
        }

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        var centerBottomIndex = this.vertices.length / 3 - 1;

        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        var centerTopIndex = this.vertices.length / 3 - 1;

        for (var j = 0; j < this.slices; j++) {
            var next = (j + 1) % this.slices;
            this.indices.push(centerBottomIndex, j, next);
            this.indices.push(centerBottomIndex, next, j);
        }

        var offset = this.stacks * (this.slices + 1);
        for (var j = 0; j < this.slices; j++) {
            var next = (j + 1) % this.slices;
            this.indices.push(centerTopIndex, offset + next, offset + j);
            this.indices.push(centerTopIndex, offset + j, offset + next);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
