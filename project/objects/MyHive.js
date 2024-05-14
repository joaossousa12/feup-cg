import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";
import { MySphere } from "../primitives/MySphere.js";

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 8);
        this.quad = new MyQuad(this.scene);
        this.initMaterials();
    }

    initMaterials() {
        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setAmbient(1, 1, 1, 1);
        this.hiveMaterial.setDiffuse(1, 1, 1, 1);
        this.hiveMaterial.setSpecular(1, 1, 1, 1);
        this.hiveMaterial.setShininess(10.0);
        this.hiveMaterial.loadTexture('images/beehivetop.png');

        this.woodMaterial = new CGFappearance(this.scene);
        this.woodMaterial.setAmbient(1, 1, 1, 1);
        this.woodMaterial.setDiffuse(1, 1, 1, 1);
        this.woodMaterial.setSpecular(1, 1, 1, 1);
        this.woodMaterial.setShininess(10.0);
        this.woodMaterial.loadTexture('images/woodHorizontal.png');

        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setAmbient(1, 1, 1, 1);
        this.whiteMaterial.setDiffuse(1, 1, 1, 1);
        this.whiteMaterial.setSpecular(1, 1, 1, 1);
        this.whiteMaterial.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix(); //top
        this.scene.translate(0, 3, 0);
        this.scene.scale(8, 1, 6);
        this.woodMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(8, 1, 6);
        this.woodMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.5,3);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(8, 3, 3);
        this.woodMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.5,-3);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(8, 3, 3);
        this.woodMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 1.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(3, 1, 6);
        this.woodMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4, 1.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(3, 1, 6);
        this.woodMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.01, 0);
        this.scene.scale(7.3, 1, 5.3);
        this.hiveMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}