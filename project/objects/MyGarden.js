import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, xSize, ySize){
        super(scene);
        this.xSize = xSize;
        this.ySize = ySize;
        this.flowers = this.initFlowers();
    }


    display() {
        const separation = 7;
        const flowerSize = 1; // Assuming each flower has a size of 1 unit
    
        for (let i = 0; i < this.flowers.length; i++) {
            const row = Math.floor(i / this.ySize); // Calculate row index
            const col = i % this.ySize; // Calculate column index
    
            const x = col * (flowerSize + separation); // Calculate x position
            const z = row * (flowerSize + separation); // Calculate z position
    
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }

    initFlowers() {
        let flowers = [];

        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                let flower = new MyFlower(this.scene, 0.5, 1);
                flowers.push(flower);
            }
        }
        return flowers;
    }
}
