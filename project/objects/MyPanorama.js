import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - The texture to be applied to the panorama
 */
export class MyPanorama extends CGFobject{
    constructor(scene, texture){
        super(scene);
        this.sphere = new MySphere(this.scene, 32, 32, true, 200.0);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
    }

    display(){
        this.scene.pushMatrix();
        this.material.apply(); 
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.sphere.display(); 
        this.scene.popMatrix();
    }
}