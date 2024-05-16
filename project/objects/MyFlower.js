import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyPetal } from "../components/MyPetal.js";
import { MyStem } from "../primitives/MyStem.js";
import { MyReceptacle } from "../components/MyReceptacle.js";

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, stemRadius, leafPetalSize){
        super(scene);
        this.petalNumber = this.getRandomValue(5, 8, 'int');;
        this.sphereRadius = this.getRandomValue(0.5, 0.7);
        this.stemHigh = this.getRandomValue(3, 7, 'int');
        this.petalSize = this.getRandomValue(3-this.sphereRadius, (7-this.sphereRadius)/2);
        this.stemRadius = this.getRandomValue(0.1, this.sphereRadius-0.45);
        this.petalColor = this.getRandomValue(1, 9, 'int');
        this.sphereColor = this.getRandomValue(1, 4, 'int');
        this.leafPetalSize = leafPetalSize;
        this.randomAngle = this.getRandomValue(Math.PI/6, Math.PI/3);
        this.receptacle = new MyReceptacle(this.scene, this.petalSize, this.petalNumber, this.sphereRadius, this.petalColor, this.sphereColor);
        this.stem = new MyStem(this.scene, 16, 16, this.stemRadius, this.stemHigh);
        this.leafstemHigh = stemRadius+0.3;
        this.leafstem = new MyStem(this.scene, 16, 16, 0.05, this.leafstemHigh);
        this.leafPetal = new MyPetal(this.scene, this.leafPetalSize);
        this.initMaterials();
    }

    initMaterials(){
        this.petalLightGreenMaterial = new CGFappearance(this.scene);
        this.petalLightGreenMaterial.setAmbient(144 / 255, 238 / 255, 144 / 255, 1.0); 
        this.petalLightGreenMaterial.setDiffuse(144 / 255, 238 / 255, 144 / 255, 1.0);
        this.petalLightGreenMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.petalLightGreenMaterial.setShininess(10.0);
        this.petalLightGreenMaterial.loadTexture('images/leafTexture.jpeg');

        this.stemDarkGreenMaterial = new CGFappearance(this.scene);
        this.stemDarkGreenMaterial.setAmbient(0 / 255, 100 / 255, 0 / 255, 1.0); 
        this.stemDarkGreenMaterial.setDiffuse(0 / 255, 100 / 255, 0 / 255, 1.0);
        this.stemDarkGreenMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.stemDarkGreenMaterial.setShininess(10.0);
        this.stemDarkGreenMaterial.loadTexture('images/stemTexture.png');
        this.stemDarkGreenMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        this.receptacleX = Math.cos(this.randomAngle)*this.stemHigh;
        this.receptacleY = Math.sin(this.randomAngle)*this.stemHigh;
        this.scene.pushMatrix();
        this.scene.rotate(this.randomAngle, 0, 0, 1);
        this.scene.translate(this.receptacleY,this.receptacleX,0);
        this.receptacle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.stemDarkGreenMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
        
        for(var i = 1; i < (this.stemHigh); i++){
            if((i%2) === 0){
                this.scene.pushMatrix();
                this.scene.translate(0,i,0);
                this.stemDarkGreenMaterial.apply();
                this.leafstem.display();
                this.scene.popMatrix();
            } else{
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/*random radius*/, 0, 1, 0);
                this.scene.translate(0,i,0);
                this.stemDarkGreenMaterial.apply();
                this.leafstem.display();
                this.scene.popMatrix();
            }
        }
        
        for(var i = 1; i < (this.stemHigh); i++){
            if((i%2) === 0){
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(i,this.leafstemHigh-0.05,0);
                this.petalLightGreenMaterial.apply();
                this.leafPetal.display();
                this.scene.popMatrix();
            } else{
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.translate(i,this.leafstemHigh-0.05,0);
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
