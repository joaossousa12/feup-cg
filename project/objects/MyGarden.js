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
        this.flowersX = [];
        this.flowersY = [];
        this.flowersZ = [];
    }


    display() {
        const separation = 7;
        const flowerSize = 1; 
        this.flowersX = [];
        this.flowersY = [];
        this.flowersZ = [];
    
        for (let i = 0; i < this.flowers.length; i++) {
            const row = Math.floor(i / this.ySize); // Calculate row index
            const col = i % this.ySize; // Calculate column index
    
            const x = col * (flowerSize + separation); // Calculate x position
            const z = row * (flowerSize + separation); // Calculate z position
    
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.flowers[i].display();
            this.scene.popMatrix();

            const stemHigh = this.flowers[i].stemHigh;
            
            this.flowersX.push(x);
            this.flowersY.push(stemHigh);
            this.flowersZ.push(z);
        }
    }

    initFlowers() {
        let flowers = [];

        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                let flower = new MyFlower(this.scene, this.getRandomValue(0.3,0.7, 'float'), this.getRandomValue(0.7, 1.2, 'float'));
                flowers.push(flower);
            }
        }
        return flowers;
    }

    getRandomValue(min, max, returnType = 'int') {
        if (returnType === 'int') {
            return Math.floor(Math.random() * (max - min + 1)) + min; // Returns an integer
        } else {
            return Math.random() * (max - min) + min; // Returns a float
        }
    }
}
