import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyTriangle } from "../primitives/MyTriangle.js";
import { MyTriangleV2 } from "../primitives/MyTriangleV2.js";

/**
 * MyGrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyGrassBlade extends CGFobject {
    constructor(scene){
        super(scene);
        
        this.triangle = new MyTriangle(this.scene);
        this.triangleV2 = new MyTriangleV2(this.scene);
        
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.0, 1.0, 0.0, 1.0);   
        this.material.setDiffuse(0.0, 1.0, 0.0, 1.0);   
        this.material.setSpecular(0.0, 1.0, 0.0, 1.0);  
        this.material.setShininess(10.0);
    }

    display() {
        this.square();

        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.9, 0);
        this.scene.scale(0.6664,0.6664,0.6664);
        this.square();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.496, 1.49, 0);
        this.scene.scale(0.448,0.448,0.448);
        this.square();
        this.scene.popMatrix();
    }   

    square(){
        // this.scene.pushMatrix();

        // this.scene.scale(0.3, 0.3, 0.3);

        // this.scene.pushMatrix();
        // this.scene.translate(1, 1, 0);
        // this.material.apply();
        // this.triangle.display();
        // this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.translate(1, 1, 0);
        // this.scene.scale(-1, -1, 1);
        // this.material.apply();
        // this.triangle.display();
        // this.scene.popMatrix();

        // this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1.5, 1.5);
        this.scene.pushMatrix();

        this.scene.scale(0.3, 0.3, 0.3);

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 0);
        this.scene.scale(-1,1,1);
        this.material.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1); 
        this.scene.scale(-1,1,1);
        this.material.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.translate(0.6, 1, 0);
        // this.scene.rotate(-Math.PI, 0, 0, 1);
        // this.scene.rotate(-Math.PI/16, 0, 0, 1);
        // this.scene.scale(-0.6,1,1);
        // this.material.apply();
        // this.triangle.display();
        // this.scene.popMatrix();

        this.scene.popMatrix();


        this.triangleV2.display();

        this.scene.pushMatrix();
        this.scene.translate(1.2, 0, 0);
        this.scene.scale(-1, 1, -1);
        this.triangleV2.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}