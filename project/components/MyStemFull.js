import { CGFobject } from "../../lib/CGF.js";
import { MyStem } from "../primitives/MyStem.js";

export class MyStemFull extends CGFobject {
    constructor(scene, slices, stacks, radius, fullheight) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = fullheight;
        this.segments = [];
        this.initStem();
    }

    initStem() {
        const segmentHeight = this.height / 50;
        let currentHeight = 0;
        let currentXOffset = 0;
        let currentYOffset = 0;

        for (let i = 0; i < 37 + (this.height * 2); i++) {
            const xOffset = currentXOffset;
            const yOffset = currentYOffset;

            const stemSegment = new MyStem(this.scene, this.slices, this.stacks, this.radius, segmentHeight);
            this.segments.push({ segment: stemSegment, xOffset: xOffset, yOffset: 0.5 + yOffset, zOffset: currentHeight });

            currentHeight += segmentHeight;
            currentXOffset = xOffset;
            currentYOffset = yOffset - 0.01;
        }
    }

    display() {
        for (const segmentData of this.segments) {
            this.scene.pushMatrix();
            this.scene.translate(segmentData.xOffset, segmentData.yOffset, segmentData.zOffset);
            segmentData.segment.display();
            this.scene.popMatrix();
        }
    }
}
