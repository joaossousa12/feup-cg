import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyPetal } from "../components/MyPetal.js";
import { MyStem } from "../primitives/MyStem.js";
import { MyReceptacle } from "../components/MyReceptacle.js";
import { MyStemFull } from "../components/MyStemFull.js";

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
        this.stemRadius = this.getRandomValue(0.1, Math.min(this.sphereRadius-0.45, 0.15));
        this.petalColor = this.getRandomValue(1, 9, 'int');
        this.sphereColor = this.getRandomValue(1, 4, 'int');
        this.leafPetalSize = leafPetalSize;
        this.randomAngle = this.getRandomValue(Math.PI/6, Math.PI/3);
        this.receptacle = new MyReceptacle(this.scene, this.petalSize, this.petalNumber, this.sphereRadius, this.petalColor, this.sphereColor);
        this.stem = new MyStemFull(this.scene, 16, 16, this.stemRadius, this.stemHigh);
        this.leafstemHigh = stemRadius+0.3;
        this.leafstem = new MyStem(this.scene, 16, 16, 0.05, this.leafstemHigh);
        this.leafPetal = new MyPetal(this.scene, this.leafPetalSize);
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
        this.scene.stemDarkGreenMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
        
        for(var i = 1; i < (this.stemHigh); i++){
            if((i%2) === 0){
                this.scene.pushMatrix();

                let help = 0;

                if(this.stemHigh == 5)
                    help = 0.25;
                else if(this.stemHigh == 4)
                    help = 0.8;
                else if(this.stemHigh == 3)
                    help = 1.7;

                this.scene.translate(0,i,-0.51 - this.stemRadius + (i+ help) * 0.1);
                
                this.scene.pushMatrix();
                this.scene.stemDarkGreenMaterial.apply();
                this.leafstem.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(0,this.leafstemHigh-0.05,0);
                this.scene.petalLightGreenMaterial.apply();
                this.leafPetal.display();
                this.scene.popMatrix();

                this.scene.popMatrix();
            } else{
                this.scene.pushMatrix();
                let help = 0;
                if(this.stemHigh == 4)
                    help = 0.1;

                this.scene.translate(0,i, -0.51 + this.stemRadius + (i + help) * 0.06);
                
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.scene.stemDarkGreenMaterial.apply();
                this.leafstem.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 2, 0, 0, 1);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.translate(0,this.leafstemHigh-0.05,0);
                this.scene.petalLightGreenMaterial.apply();
                this.leafPetal.display();
                this.scene.popMatrix();

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
