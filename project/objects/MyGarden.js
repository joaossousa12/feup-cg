import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
import { MyPollen } from "./MyPollen.js";
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
        this.pollen = new MyPollen(this.scene);
        this.flowers = this.initFlowers();
        this.pollenAngles = this.initPollenAngles();
        this.flowersX = [];
        this.flowersY = [];
        this.flowersZ = [];
    }


    display() {
        const separation = 7;
        const flowerSize = 1; // Assuming each flower has a size of 1 unit
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

            const steamHigh = this.flowers[i].steamHigh;
            this.flowersX.push(x);
            this.flowersY.push(steamHigh);
            this.flowersZ.push(z);
            this.scene.pushMatrix();
            this.scene.translate(x - 0.3, steamHigh + this.flowers[i].steamRadius * 2 + 0.5, z);
            this.scene.rotate(this.pollenAngles[i], 0, 0, 1);
            this.scene.scale(0.5, 0.5, 0.5);    
            this.pollen.display();
            this.scene.popMatrix();
        }
    }

    initPollenAngles(){
        let pollenAngles = [];
        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                pollenAngles.push(Math.random() * -Math.PI/2);
            }
        }
        return pollenAngles;
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
