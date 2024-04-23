import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyCylinder } from "../primitives/MyCylinder.js";
/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBeeLeg extends CGFobject{
    constructor(scene){
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 8);
        this.cylinder = new MyCylinder(this.scene, 50, 20);
        this.initMaterials();
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0, 0, 0, 1.0);
        this.material.setDiffuse(0, 0, 0, 1.0);
    }

    display(){
        var legAngle = Math.PI / 2;

        var sphereX = 0.37 - Math.cos(legAngle);
        var sphereY = 0.63 - Math.sin(legAngle);

        this.scene.pushMatrix();
        this.scene.rotate(legAngle, 1, 0, 0);
        this.scene.rotate(legAngle / 2, 0, 1, 0);
        this.scene.scale(0.05, 0.05, 0.5);
        this.material.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(sphereX, sphereY, 0);
        this.scene.scale(0.05, 0.05, 0.05);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(sphereX, sphereY - 0.01, 0);
        this.scene.rotate(legAngle, 1, 0, 0);
        this.scene.scale(0.05, 0.05, 0.5);
        this.material.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}