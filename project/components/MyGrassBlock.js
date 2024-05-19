import { CGFobject } from "../../lib/CGF.js";
import { MyGrassBlade } from "../primitives/MyGrassBlade.js";

/**
 * MyGrassBlock
 * Basicly a 1x1 block of grass blades
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numBlades - Number of grass blades per 1x1 block
 */
export class MyGrassBlock extends CGFobject {
    constructor(scene, numBlades = 2) {
        super(scene);
        this.numBlades = numBlades;
        this.grassBlade = new MyGrassBlade(this.scene);
        this.block = this.createGrassBlock();
    }

    getRandomValue(min, max, returnType = 'int') {
        if (returnType === 'int') {
            return Math.floor(Math.random() * (max - min + 1)) + min; // Returns an integer
        } else {
            return Math.random() * (max - min) + min; // Returns a float
        }
    }

    createGrassBlock() {
        const block = [];
        const blockSize = Math.sqrt(this.numBlades);
        const bladeSpacing = 1 / blockSize;

        for (let i = 0; i < blockSize; i++) {
            for (let j = 0; j < blockSize; j++) {
                const bladeX = i * bladeSpacing + this.getRandomValue(-bladeSpacing / 2, bladeSpacing / 2, 'float');
                const bladeY = j * bladeSpacing + this.getRandomValue(-bladeSpacing / 2, bladeSpacing / 2, 'float');
                const bladeHeight = this.getRandomValue(0.4, 1.5, 'float');
                const bladeWidth = this.getRandomValue(0.6, 2, 'float');

                block.push({
                    x: bladeX,
                    y: bladeY,
                    height: bladeHeight,
                    width: bladeWidth
                });
            }
        }

        return block;
    }

    display() {
        for (const blade of this.block) {
            this.scene.pushMatrix();
            
            this.scene.translate(blade.x, 0, blade.y);
            this.scene.scale(blade.width, blade.height, 1);
            this.scene.grassMaterial.apply();
            this.grassBlade.display();

            this.scene.popMatrix();
        }
    }
}
