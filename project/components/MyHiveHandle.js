import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyCylinder } from "../primitives/MyCylinder.js";
/**
 * MyHiveHandle
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyHiveHandle extends CGFobject{
    constructor(scene){
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 8);
        this.cylinder = new MyCylinder(this.scene, 50, 20);
        this.initMaterials();
    }

    initMaterials(){
        this.goldMaterial = new CGFappearance(this.scene);
        this.goldMaterial.setAmbient(0.24725, 0.1995, 0.0745, 1.0);
        this.goldMaterial.setDiffuse(0.75164, 0.60648, 0.22648, 1.0);
        this.goldMaterial.setSpecular(0.628281, 0.555802, 0.366065, 1.0);
        this.goldMaterial.setShininess(51.2);
    }

    display2(){

        this.scene.pushMatrix();
        this.scene.scale(0.05, 0.05, 0.5);
        this.goldMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.52);
        this.scene.scale(0.05, 0.05, 0.05);
        this.goldMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.52);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.05, 0.05, 1);
        this.goldMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.99, 0.52);
        this.scene.scale(0.05, 0.05, 0.05);
        this.goldMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.991, 0);
        this.scene.scale(0.05, 0.05, 0.52);
        this.goldMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.display2();
        this.scene.popMatrix();
    }
}