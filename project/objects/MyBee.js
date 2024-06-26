import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyBeeLeg } from "../components/MyBeeLeg.js";
import { MyGarden } from "./MyGarden.js";
import { MyPollen } from "./MyPollen.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject{
    constructor(scene, x, y, z, gardenWithBee = false){
        super(scene);
        this.abdomen = new MySphere(this.scene, 16, 8);
        this.thorax = new MySphere(this.scene, 16, 8);
        this.head = new MySphere(this.scene, 16, 8);
        this.eye = new MySphere(this.scene, 16, 8);
        this.wing = new MySphere(this.scene, 16, 8);
        this.leg =  new MyBeeLeg(this.scene);
        this.antenna = new MyBeeLeg(this.scene); // the bee's antennas are using the legs model
        this.mandible = new MyBeeLeg(this.scene); // the bee's mandibles are using the legs model

        if(gardenWithBee){
            this.garden = new MyGarden(this.scene, 7, 7);
            this.pollen = new MyPollen(this.scene);
            this.pollenAngles = this.initPollenAngles();
            this.pollenPositions = [];
            this.pollenInPosition = [];
            this.pollenAlreadyPicked = [];
        }
        
        this.gardenWithBee = gardenWithBee;
        this.x = x;
        this.y = y;
        this.z = z;
        this.wingAngle = Math.PI / 8;
        this.orientation = 0;
        this.velocity = 0;
        this.flagvelocity = 0;
        this.descending = false;
        this.ascending = false;
        this.help = 1;
        this.stationary = false;
        this.flowersXX = [];
        this.flowersYY = [];
        this.flowersZZ = [];
        this.objectBelowY = -2;
        this.beeScaleConstruct = 1;
        this.initial = {x: x, y: y, z: z};
        this.flowerIndex = -1;
        this.notrepeat = false;
        this.pollenPicked = false;
        this.moveToHive = false;
        this.counter = 0;
        this.counterz = 0;

        this.initMaterials();
    }

    initMaterials(){
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.abdomenMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.abdomenMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.abdomenMaterial.setShininess(10.0);
        this.abdomenMaterial.loadTexture('images/beePattern.png');

        this.thoraxMaterial = new CGFappearance(this.scene);
        this.thoraxMaterial.setAmbient(88 / 255, 57 / 255, 39 / 255, 1.0);
        this.thoraxMaterial.setDiffuse(88 / 255, 57 / 255, 39 / 255, 1.0);

        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(231 / 255, 141 / 255, 33 / 255, 1.0);
        this.headMaterial.setDiffuse(231 / 255, 141 / 255, 33 / 255, 1.0);

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0, 0, 0, 1.0);
        this.eyeMaterial.setDiffuse(0, 0, 0, 1.0);

        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(251 / 255, 226 / 255, 142 / 255, 0.2);
        this.wingMaterial.setDiffuse(251 / 255, 226 / 255, 142 / 255, 0.2);
        this.wingMaterial.setSpecular(0.9, 0.9, 0.9, 0.2);
        this.wingMaterial.setEmission(0, 0, 0, 0.2);
    }

    display(){
        if(this.gardenWithBee){
            this.garden.display();
            
            let flowers = this.garden.flowers;
            if(!this.notrepeat){
                for (let i = 0; i < flowers.length; i++) { // display pollens
                    const row = Math.floor(i / this.garden.ySize); 
                    const col = i % this.garden.ySize;
            
                    const x = col * 8;
                    const z = row * 8;

                    this.pollenPositions.push({x: x - 0.3, y: flowers[i].stemHigh + flowers[i].stemRadius * 2 + 0.5, z: z});
                    this.pollenInPosition.push(true);
                    this.pollenAlreadyPicked.push(false);
                    this.notrepeat = true;
                }
            }

            for (let i = 0; i < this.pollenPositions.length; i++) {
                if(this.pollenInPosition[i]){
                    this.scene.pushMatrix();
                    this.scene.translate(this.pollenPositions[i].x, this.pollenPositions[i].y, this.pollenPositions[i].z);
                    this.scene.rotate(this.pollenAngles[i], 0, 0, 1);
                    this.scene.scale(0.5, 0.5, 0.5);
                    this.pollen.display();
                    this.scene.popMatrix();
                }
            }
        }

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.beeScaleConstruct, this.beeScaleConstruct, this.beeScaleConstruct);
        this.display2();
        this.scene.popMatrix();
    }

    display2(){
        var thoraxAngle = Math.PI / 8;

        this.scene.pushMatrix();
        this.scene.rotate(thoraxAngle * 5, 1, 0, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.abdomenMaterial.apply();
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(thoraxAngle), -0.3 - Math.cos(thoraxAngle));
        this.scene.scale(0.3, 0.3, 0.5);
        this.thoraxMaterial.apply();
        this.thorax.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(thoraxAngle), -0.9 - Math.cos(thoraxAngle));
        this.scene.rotate(-thoraxAngle * 2, 1, 0, 0);
        this.scene.scale(0.25, 0.25, 0.3);
        this.headMaterial.apply();
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, Math.sin(thoraxAngle), -0.91 - Math.cos(thoraxAngle));
        this.scene.rotate(-thoraxAngle * 1.8, 1, 0, 0);
        this.scene.scale(0.09, 0.09, 0.16);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, Math.sin(thoraxAngle), -0.91 - Math.cos(thoraxAngle));
        this.scene.rotate(-thoraxAngle * 1.8, 1, 0, 0);
        this.scene.scale(0.09, 0.09, 0.16);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, 0);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0 ,0);
        this.scene.scale(-1, 1, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.12, 0.21, -0.87);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.12, 0.21, -0.87);
        this.scene.scale(-1, 1, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.12, 0.21, -1.47);
        this.scene.rotate(Math.PI / 5, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.12, 0.21, -1.47);
        this.scene.rotate(Math.PI / 5, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.scale(-1, 1, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.12, 0.6, -1.83);
        this.scene.scale(0.3, 0.3, 0.5);
        this.scene.scale(1, -1, 1);
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.12, 0.6, -1.83);
        this.scene.scale(0.3, 0.3, 0.5);
        this.scene.scale(-1, -1, 1);
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.21, -1.9);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.2);
        this.mandible.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.21, -1.9);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.scale(-1, 1, 1);
        this.mandible.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); // bee stinger
        this.scene.translate(0, -0.25, 0.6);
        this.scene.rotate(Math.PI/8, 1, 0, 0);
        this.scene.scale(0.05, 0.02, 0.5);
        this.eyeMaterial.apply(); // using eye material for the stinger
        this.thorax.display();
        this.scene.popMatrix();

        if(this.pollenPicked){ // pollen has been picked by the bee
            this.scene.pushMatrix();
            this.scene.translate(0, -0.8, -0.35);
            this.scene.rotate(-Math.PI / 4, 1, 0, 0);
            this.scene.scale(1, 1, 1);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.7, -0.57);
        this.scene.rotate(thoraxAngle * 3.5, 1, 0, 0);
        this.scene.rotate(this.wingAngle, 0, 0, 1);
        this.scene.scale(0, 0.97, 0.25);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.7, -0.57);
        this.scene.rotate(thoraxAngle * 3.5, 1, 0, 0);
        this.scene.rotate(-this.wingAngle, 0, 0, 1);
        this.scene.scale(0, 0.97, 0.25);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
    }

    update(t, beeScale){
        this.beeScaleConstruct = beeScale;

        let delta_t = t - this.time;
       
        if(this.time == undefined){
            this.time = t;
            delta_t = 0;
        }

        this.time = t;

        let frequencyHeight = 2 * Math.PI / 1500;
        let amplitude = 1;

        let stemThreshold = 1;

        if(this.beeScaleConstruct < 1)
            stemThreshold = 1.5;
        else if(this.beeScaleConstruct < 2)
            stemThreshold = 2.2;
        else 
            stemThreshold = 2.6;
        
        if(this.moveToHive && this.z >= -10 + this.counterz){
            this.orientation = Math.PI * 2;
            this.z -= 0.1;
        }

        else if (this.moveToHive && this.z < -10 + this.counterz - 0.11){
            this.orientation = Math.PI;
            this.z += 0.1;
        }

        else if(this.moveToHive && this.x >= 3 - this.counter) {
            this.orientation = Math.PI / 2;
            this.x -= 0.1;
        }

        else if (this.moveToHive && this.x < 3 - this.counter - 0.11){
            this.orientation = -1.5;
            this.x += 0.1;
        }

        else if(this.moveToHive && this.y >= 8){
            this.orientation = Math.PI;
            this.y -= 0.05;
        }

        else if(!this.descending && !this.stationary && !this.ascending && !this.moveToHive)
            this.y = this.help * this.initial.y + amplitude * Math.sin(frequencyHeight * t);   

        else if(this.ascending && this.y <= this.initial.y)
            this.y += 0.05;

        else if(this.descending && this.y - stemThreshold >= this.objectBelowY) // the floor for the bee absolute position is around -2
            this.y -= 0.05;
        
        else{
            if(this.descending){
                this.descending = false;
                this.help = 0;
                this.stationary = true;
            }

            else if(this.ascending){
                this.ascending = false;
                this.help = 1;
                this.stationary = false;
                this.velocity = this.flagvelocity;
                this.flagvelocity = 0;
            }

            else if(this.moveToHive){
                this.moveToHive = false;
                this.pollenPicked = false;
                this.pollenInPosition[this.flowerIndex] = true;
                this.pollenPositions[this.flowerIndex] = {x: 3 - this.counter, y: 7.5, z: -10 + this.counterz};
                
                this.counter++;
                
                if(this.counter == 7){
                    this.counter = 0;
                    this.counterz++;
                } 
            }
        }

        this.x += (this.velocity * Math.sin(this.orientation) * delta_t) / 500;
        this.z += (this.velocity * Math.cos(this.orientation) * delta_t) / 500;

        let frequencyWings = 2 * Math.PI / 500;

        // max wing angle of Math.PI / 6 and min of Math.PI / 8
        let wingAmplitude = (Math.PI / 6 - Math.PI / 8) / 2;
        let wingOffset = (Math.PI / 6 + Math.PI / 8) / 2;

        this.wingAngle = wingAmplitude * Math.sin(frequencyWings * t) + wingOffset;
    }

    turn(v){
        if(!this.moveToHive)
            this.orientation += v * this.scene.beeSpeed;
    }

    accelerate(v) { 
        if(!this.moveToHive){
            let accSpeed = Math.sqrt(this.velocity ** 2) + (v * this.scene.beeSpeed);
            accSpeed = Math.max(0, accSpeed);
            
            if(!this.descending && !this.stationary)
                this.velocity = -accSpeed;
        }
    }

    descend(){
        if(!this.pollenPicked){
            if(this.velocity != 0)
                this.flagvelocity = this.velocity;

            if(this.gardenWithBee){
                this.flowersXX = this.garden.flowersX;
                this.flowersYY = this.garden.flowersY;
                this.flowersZZ = this.garden.flowersZ;
                this.changeBeeXZ();
            
            }

            this.velocity = 0;
            this.descending = true;
        }
    }

    ascend(){
        if(!this.descending && this.stationary){
            this.ascending = true;

            if(this.pollenInPosition[this.flowerIndex] && !this.pollenAlreadyPicked[this.flowerIndex]){
                this.pollenInPosition[this.flowerIndex] = false;
                this.pollenAlreadyPicked[this.flowerIndex] = true;
                this.pollenPicked = true;
            }
        } else {
            console.log("Either initiate a descend or wait until descend is finished and try again!");
        }
    }

    goToHive(){
        if(this.pollenPicked && !this.ascending){
            this.moveToHive = true;
            this.velocity = 0;
        }
    }

    changeBeeXZ(){
        if(this.flowersXX.length > 0){
            for (let i = 0; i < this.flowersXX.length; i++) {
                let distanceX, distanceZ;
                distanceX = Math.abs(this.x - this.flowersXX[i]);
                distanceZ = Math.abs(this.z - this.flowersZZ[i]);

                if (distanceX <= 3 && distanceZ <= 3){
                    this.x = this.flowersXX[i];
                    this.z = this.flowersZZ[i];
                    this.objectBelowY = this.flowersYY[i];
                    this.flowerIndex = i;
                    break;
                }
            }
        }
    }

    reset() {
        this.x = this.initial.x;
        this.y = this.initial.y;
        this.z = this.initial.z;
        this.orientation = 0;
        this.velocity = 0;
        this.help = 1;
        this.descending = false;
        this.ascending = false;
        this.flagvelocity = 0;
        this.stationary = false;
        this.flowersXX = [];
        this.flowersYY = [];
        this.flowersZZ = [];
        this.objectBelowY = -2;
        this.flowerIndex = -1;
        this.moveToHive = false;
    }

    initPollenAngles(){
        let pollenAngles = [];

        for (let i = 0; i < this.garden.xSize; i++) {
            for (let j = 0; j < this.garden.ySize; j++) {
                pollenAngles.push(Math.random() * -Math.PI/2);
            }
        }

        return pollenAngles;
    }
}