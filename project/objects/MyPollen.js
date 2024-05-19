import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";

/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyPollen extends CGFobject{
    constructor(scene){
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 8);
    }

    display(){
        this.scene.pushMatrix();

        this.scene.scale(0.5, 0.5, 0.5);
        this.display2();

        this.scene.popMatrix();
    }

    display2(){
        this.scene.pushMatrix();

        this.scene.pollenMaterial.apply();
        this.sphere.display();

        this.scene.pushMatrix(); // make another sphere on top of the first one so only one of the hemispheres is scaled
        this.scene.scale(1, 1.3, 1);
        this.scene.translate(0, 0.24, 0);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}