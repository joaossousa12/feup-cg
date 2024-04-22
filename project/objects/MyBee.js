import { CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
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
    }

    display(){
        var thoraxAngle = Math.PI / 8;

        this.scene.pushMatrix();
        this.scene.rotate(thoraxAngle, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(thoraxAngle), -0.3 - Math.cos(thoraxAngle));
        this.scene.scale(0.3, 0.3, 0.5);
        this.thorax.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(thoraxAngle), -0.9 - Math.cos(thoraxAngle));
        this.scene.rotate(-thoraxAngle * 2, 1, 0, 0);
        this.scene.scale(0.25, 0.25, 0.3);
        this.head.display();
        this.scene.popMatrix();
    }
}