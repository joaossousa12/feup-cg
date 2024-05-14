import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyPetal } from "./MyPetal.js";
import { MySphere } from "../primitives/MySphere.js";
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, petalSize, petalNumber, sphereRadius, petalColor, sphereColor){
        super(scene);
        this.petalSize = petalSize;
        this.petalNumber = petalNumber;
        this.sphereRadius = sphereRadius;
        this.petalColor = petalColor;
        this.sphereColor = sphereColor;
		this.petal = new MyPetal(this.scene, this.petalSize);
        this.sphere = new MySphere(this.scene, 16, 8, false, this.sphereRadius);
        this.initMaterials();
    }
    
    initMaterials(){
        if(this.petalColor==1){
            this.petalMaterial = new CGFappearance(this.scene);
            this.petalMaterial.setAmbient(255 / 255, 255 / 255, 20 / 255, 1.0); // Set ambient color to yellow
            this.petalMaterial.setDiffuse(255 / 255, 255 / 255, 20 / 255, 1.0); // Set diffuse color to yellow
            this.petalMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
            this.petalMaterial.setShininess(10.0); // Set shininess to 10
        } else if(this.petalColor==2){
            this.petalMaterial = new CGFappearance(this.scene);
            this.petalMaterial.setAmbient(255 / 255, 20 / 255, 20 / 255, 1.0); // Set ambient color to red
            this.petalMaterial.setDiffuse(255 / 255, 20 / 255, 20 / 255, 1.0); // Set diffuse color to red
            this.petalMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
            this.petalMaterial.setShininess(10.0);
        }

        if(this.sphereColor==1){
            this.sphereMaterial = new CGFappearance(this.scene);
            this.sphereMaterial.setAmbient(255 / 255, 51 / 255, 51 / 255, 1.0); // Set ambient color to a brighter red
            this.sphereMaterial.setDiffuse(255 / 255, 51 / 255, 51 / 255, 1.0); // Set diffuse color to a brighter red
            this.sphereMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
            this.sphereMaterial.setShininess(10.0);
        } else if(this.sphereColor==2){
            this.sphereMaterial = new CGFappearance(this.scene);
            this.sphereMaterial.setAmbient(255 / 255, 192 / 255, 203 / 255, 1.0); // Set ambient color to pink
            this.sphereMaterial.setDiffuse(255 / 255, 192 / 255, 203 / 255, 1.0); // Set diffuse color to pink
            this.sphereMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
            this.sphereMaterial.setShininess(10.0);
        } else if(this.sphereColor==3){
            this.sphereMaterial = new CGFappearance(this.scene);
            this.sphereMaterial.setAmbient(255 / 255, 165 / 255, 0 / 255, 1.0); // Set ambient color to orange
            this.sphereMaterial.setDiffuse(255 / 255, 165 / 255, 0 / 255, 1.0); // Set diffuse color to orange
            this.sphereMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
            this.sphereMaterial.setShininess(10.0);
        } else if(this.sphereColor==4){
            this.sphereMaterial = new CGFappearance(this.scene);
            this.sphereMaterial.setAmbient(139 / 255, 69 / 255, 19 / 255, 1.0); // Set ambient color to brown
            this.sphereMaterial.setDiffuse(139 / 255, 69 / 255, 19 / 255, 1.0); // Set diffuse color to brown
            this.sphereMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); // Set specular color to white
            this.sphereMaterial.setShininess(10.0);
        }
    }

    display(){
        var radius = (2*Math.PI)/this.petalNumber;
        for (var i = 0; i < this.petalNumber; i++){
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.rotate(radius*i, 1, 0, 0);
            this.scene.translate(0/*this.steamHigh */,this.sphereRadius-0.1,0);
            this.petalMaterial.apply();
            this.petal.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.sphereMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
