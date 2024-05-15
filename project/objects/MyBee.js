import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyBeeLeg } from "../components/MyBeeLeg.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject{
    constructor(scene, x, y, z){
        super(scene);
        this.abdomen = new MySphere(this.scene, 16, 8);
        this.thorax = new MySphere(this.scene, 16, 8);
        this.head = new MySphere(this.scene, 16, 8);
        this.eye = new MySphere(this.scene, 16, 8);
        this.wing = new MySphere(this.scene, 16, 8);
        this.leg =  new MyBeeLeg(this.scene);
        this.antenna = new MyBeeLeg(this.scene); // the bee's antennas are using the legs model
        this.mandible = new MyBeeLeg(this.scene); // the bee's mandibles are using the legs model
        
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
        this.beePosChanged = false;
        this.objectBelowY = -2;
        this.initial = {x: x, y: y, z: z};

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
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
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

    update(t){
        let delta_t = t - this.time;
       
        if(this.time == undefined){
            this.time = t;
            delta_t = 0;
        }

        this.time = t;

        let frequencyHeight = 2 * Math.PI / 1500;
        let amplitude = 1;
        
        if(!this.descending && !this.stationary && !this.ascending)
            this.y = this.help * this.initial.y + amplitude * Math.sin(frequencyHeight * t);   

        else if(this.ascending && this.y <= this.initial.y)
            this.y += 0.05;

        else if(this.descending && this.y >= this.objectBelowY) // the floor for the bee absolute position is around -2
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
        this.orientation += v * this.scene.beeSpeed;
    }

    accelerate(v) { 
        let accSpeed = Math.sqrt(this.velocity ** 2) + (v * this.scene.beeSpeed);
        accSpeed = Math.max(0, accSpeed);
        
        if(!this.descending && !this.stationary)
            this.velocity = -accSpeed;
    }

    descend(flowersX, flowersY, flowersZ){
        if(this.velocity != 0)
            this.flagvelocity = this.velocity;

        this.flowersXX = flowersX;
        this.flowersYY = flowersY;
        this.flowersZZ = flowersZ;
        this.changeBeeXZ();
        
        this.velocity = 0;
        this.descending = true;
    }

    ascend(){
        if(!this.descending && this.stationary){
            this.ascending = true;
        } else {
            console.log("Either initiate a descend or wait until descend is finished and try again!");
        }
    }

    changeBeeXZ(){
        if(this.flowersXX.length > 0){
            for (let i = 0; i < this.flowersXX.length; i++) {
                let distanceX = Math.abs(this.x - this.flowersXX[i]);
                let distanceZ = Math.abs(this.z - this.flowersZZ[i]);
                console.log(distanceX,distanceZ);

                if (distanceX <= 3 && distanceZ <= 3){
                    this.x = this.flowersXX[i];
                    this.z = this.flowersZZ[i];
                    this.beePosChanged = true;
                    this.objectBelowY = this.flowersYY[i];
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
        this.beePosChanged = false;
        this.objectBelowY = -2;
    }
}