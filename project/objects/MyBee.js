import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyBeeLeg } from "./MyBeeLeg.js";
/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject{
    constructor(scene){
        super(scene);
        this.abdomen = new MySphere(this.scene, 16, 8);
        this.thorax = new MySphere(this.scene, 16, 8);
        this.head = new MySphere(this.scene, 16, 8);
        this.eye = new MySphere(this.scene, 16, 8);
        this.wing = new MySphere(this.scene, 16, 8);
        this.leg =  new MyBeeLeg(this.scene);
        this.antenna = new MyBeeLeg(this.scene); // the bee's antennas are using the legs model
        this.initMaterials();
    }

    initMaterials(){
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(231 / 255, 141 / 255, 33 / 255, 1.0);
        this.abdomenMaterial.setDiffuse(231 / 255, 141 / 255, 33 / 255, 1.0);

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
        this.wingMaterial.setAmbient(251 / 255, 226 / 255, 142 / 255, 1.0);
        this.wingMaterial.setDiffuse(251 / 255, 226 / 255, 142 / 255, 1.0);
    }

    display(){
        var thoraxAngle = Math.PI / 8;

        this.scene.pushMatrix();
        this.scene.rotate(thoraxAngle, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
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
        this.scene.translate(-0.4, 0.7, -0.57);
        this.scene.rotate(thoraxAngle * 3.5, 1, 0, 0);
        this.scene.rotate(Math.PI / 8, 0, 0, 1);
        this.scene.scale(0, 0.97, 0.25);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.7, -0.57);
        this.scene.rotate(thoraxAngle * 3.5, 1, 0, 0);
        this.scene.rotate(-Math.PI / 8, 0, 0, 1);
        this.scene.scale(0, 0.97, 0.25);
        this.wingMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        // Other wing representations below but the best was the one above
        // this.scene.pushMatrix();
        // this.scene.translate(0.4, 1, -0.87);
        // this.scene.rotate(thoraxAngle * 2, 1, 0, 0);
        // this.scene.rotate(-Math.PI / 8, 0, 0, 1);
        // this.scene.scale(0, 0.97, 0.25);
        // this.wingMaterial.apply();
        // this.wing.display();
        // this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.translate(0.3,0.4,0);
        // this.scene.rotate(-thoraxAngle * 2, 0, 0, 1);
        // this.scene.scale(0, 0.97, 0.25);
        // this.wingMaterial.apply();
        // this.wing.display();
        // this.scene.popMatrix();
        
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
    }
}