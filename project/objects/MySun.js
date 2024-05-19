import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../primitives/MySphere.js";

/**
 * MySun
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numberOfRays - Number of rays the sun will have
 */

export class MySun extends CGFobject {
    constructor(scene, numberOfRays = 12) {
        super(scene);
        this.numberOfRays = numberOfRays;
        this.sphere = new MySphere(this.scene, 16, 8, false, 5);
        this.ray = new MySphere(this.scene, 16, 8);
        this.initMaterials();
    }

    initMaterials(){
        this.sunMaterial = new CGFappearance(this.scene);
        this.sunMaterial.setAmbient(253 / 256, 184 / 256, 19/256, 1.0); 
        this.sunMaterial.setDiffuse(253 / 256, 184 / 256, 19/256, 1.0); 
        this.sunMaterial.setSpecular(253 / 256, 184 / 256, 19/256, 1.0);
        this.sunMaterial.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix();
        this.sunMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        const angleIncrement = (2 * Math.PI) / this.numberOfRays;
    
        for (let i = 0; i < this.numberOfRays; i++) {
            this.scene.pushMatrix();
            
            const angle = i * angleIncrement;
            const x = Math.cos(angle) * 6; 
            const y = Math.sin(angle) * 6; 
    
            this.scene.translate(x, y, 0); 
            this.scene.scale(0.4, 0.4, 2);
            
            this.sunMaterial.apply();
            this.ray.display();

            this.scene.popMatrix();
        }
    }
    

}