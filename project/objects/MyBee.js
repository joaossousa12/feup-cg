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
    }

    update(t){
        this.time = t;

        let frequencyHeight = 2 * Math.PI / 1500;
        let amplitude = 1;

        this.y = amplitude * Math.sin(frequencyHeight * t);

        let frequencyWings = 2 * Math.PI / 500;

        // max wing angle of Math.PI / 6 and min of Math.PI / 8
        let wingAmplitude = (Math.PI / 6 - Math.PI / 8) / 2;
        let wingOffset = (Math.PI / 6 + Math.PI / 8) / 2;

        this.wingAngle = wingAmplitude * Math.sin(frequencyWings * t) + wingOffset;
    }
}