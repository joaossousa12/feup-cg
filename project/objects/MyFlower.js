import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyPetal } from "../primitives/MyPetal.js";
import { MyStem } from "../primitives/MyStem.js";
import { MyReceptacle } from "../objects/MyReceptacle.js";

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, steamRadius, leafPetalSize){
        super(scene);
        this.petalNumber = this.getRandomValue(5, 8, 'int');;
        this.sphereRadius = this.getRandomValue(0.5, 0.7);
        this.steamHigh = this.getRandomValue(3, 7, 'int');
        this.petalSize = this.getRandomValue(3-this.sphereRadius, (7-this.sphereRadius)/2);
        this.steamRadius = this.getRandomValue(0.1, this.sphereRadius-0.45);
        this.petalColor = this.getRandomValue(1, 2, 'int');
        this.sphereColor = this.getRandomValue(1, 4, 'int');
        this.leafPetalSize = leafPetalSize;
        this.randomAngle = this.getRandomValue(Math.PI/6, Math.PI/3);
        this.receptacle = new MyReceptacle(this.scene, this.petalSize, this.petalNumber, this.sphereRadius, this.petalColor, this.sphereColor);
        this.steam = new MyStem(this.scene, 16, 16, this.steamRadius, this.steamHigh);
        this.leafSteamHigh = steamRadius+0.3;
        this.leafSteam = new MyStem(this.scene, 16, 16, 0.05, this.leafSteamHigh);
        this.leafPetal = new MyPetal(this.scene, this.leafPetalSize);
        this.initMaterials();
    }

    initMaterials(){
        this.petalLightGreenMaterial = new CGFappearance(this.scene);
        this.petalLightGreenMaterial.setAmbient(144 / 255, 238 / 255, 144 / 255, 1.0); // Set ambient color to light green
        this.petalLightGreenMaterial.setDiffuse(144 / 255, 238 / 255, 144 / 255, 1.0); // Set diffuse color to light green
        this.petalLightGreenMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
        this.petalLightGreenMaterial.setShininess(10.0); // Set shininess to 10

        this.steamDarkGreenMaterial = new CGFappearance(this.scene);
        this.steamDarkGreenMaterial.setAmbient(0 / 255, 100 / 255, 0 / 255, 1.0); // Set ambient color to dark green
        this.steamDarkGreenMaterial.setDiffuse(0 / 255, 100 / 255, 0 / 255, 1.0); // Set diffuse color to dark green
        this.steamDarkGreenMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
        this.steamDarkGreenMaterial.setShininess(10.0); // Set shininess
    }

    display(){

        this.receptacleX = Math.cos(this.randomAngle)*this.steamHigh;
        this.receptacleY = Math.sin(this.randomAngle)*this.steamHigh;
        this.scene.pushMatrix();
        this.scene.rotate(this.randomAngle, 0, 0, 1);
        this.scene.translate(this.receptacleY,this.receptacleX,0);
        this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.steamDarkGreenMaterial.apply();
        this.steam.display();
        this.scene.popMatrix();
        
        for(var i = 1; i < (this.steamHigh); i++){
            if((i%2) === 0){
                this.scene.pushMatrix();
                this.scene.translate(0,i,0);
                this.steamDarkGreenMaterial.apply();
                this.leafSteam.display();
                this.scene.popMatrix();
            } else{
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/*random radius*/, 0, 1, 0);
                this.scene.translate(0,i,0);
                this.steamDarkGreenMaterial.apply();
                this.leafSteam.display();
                this.scene.popMatrix();
            }
        }
        
        for(var i = 1; i < (this.steamHigh); i++){
            if((i%2) === 0){
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(i,this.leafSteamHigh-0.05,0);
                this.petalLightGreenMaterial.apply();
                this.leafPetal.display();
                this.scene.popMatrix();
            } else{
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.translate(i,this.leafSteamHigh-0.05,0);
                this.petalLightGreenMaterial.apply();
                this.leafPetal.display();
                this.scene.popMatrix();
            }
        }

    }

    getRandomValue(min, max, returnType = 'float') {
        if (returnType === 'int') {
            return Math.floor(Math.random() * (max - min + 1)) + min; // Returns an integer
        } else {
            return Math.random() * (max - min) + min; // Returns a float
        }
    }
}
