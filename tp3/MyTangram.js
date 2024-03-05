import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.initMaterials();
	}

	initMaterials(){
        
        this.triangleSmallRedMaterial = new CGFappearance(this.scene);
        this.triangleSmallRedMaterial.setAmbient(255 / 255, 20 / 255, 20 / 255, 1.0);
        this.triangleSmallRedMaterial.setDiffuse(255 / 255, 20 / 255, 20 / 255, 1.0);
        this.triangleSmallRedMaterial.setSpecular(0.9,0.9,0.9,1.0);
        this.triangleSmallRedMaterial.setShininess(10.0);

        this.triangleBigOrangeMaterial = new CGFappearance(this.scene);
        this.triangleBigOrangeMaterial.setAmbient(255 / 255, 156 / 255, 0, 1.0);
        this.triangleBigOrangeMaterial.setDiffuse(255 / 255, 156 / 255, 0, 1.0);
        this.triangleBigOrangeMaterial.setSpecular(0.9,0.9,0.9,1.0);
        this.triangleBigOrangeMaterial.setShininess(10.0);

        this.trianglePinkMaterial = new CGFappearance(this.scene);
        this.trianglePinkMaterial.setAmbient(255 / 255, 156 / 255, 210 / 255, 1.0);
        this.trianglePinkMaterial.setDiffuse(255 / 255, 156 / 255, 210 / 255, 1.0);
        this.trianglePinkMaterial.setSpecular(0.95,0.95,0.95,1.0);
        this.trianglePinkMaterial.setShininess(10.0);

        this.triangleBigBlueMaterial = new CGFappearance(this.scene);
        this.triangleBigBlueMaterial.setAmbient(0, 156 / 255, 255 / 255,1.0);
        this.triangleBigBlueMaterial.setDiffuse(0, 156 / 255, 255 / 255,1.0);
        this.triangleBigBlueMaterial.setSpecular(0.95,0.95,0.95,1.0);
        this.triangleBigBlueMaterial.setShininess(10.0);

        this.paralleloramYellowMaterial = new CGFappearance(this.scene);
        this.paralleloramYellowMaterial.setAmbient(255 / 255, 255 / 255, 0, 1.0);
        this.paralleloramYellowMaterial.setDiffuse(255 / 255, 255 / 255, 0, 1.0);
        this.paralleloramYellowMaterial.setSpecular(0.95,0.95,0.95,1.0);
        this.paralleloramYellowMaterial.setShininess(10.0);

        this.triangleSmallPurpleMaterial = new CGFappearance(this.scene);
        this.triangleSmallPurpleMaterial.setAmbient(170 / 255, 79 / 255, 194 / 255, 1.0);
        this.triangleSmallPurpleMaterial.setDiffuse(170 / 255, 79 / 255, 194 / 255, 1.0);
        this.triangleSmallPurpleMaterial.setSpecular(0.95,0.95,0.95,1.0);
        this.triangleSmallPurpleMaterial.setShininess(10.0);

    }
	display(){ 
        this.scene.pushMatrix();
        let translationMatrix =[
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0, 
            0, -1, 0, 1
        ];
		this.scene.multMatrix(translationMatrix);
        this.scene.customMaterial.apply();
		this.diamond.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.triangleSmallRedMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleBigOrangeMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.trianglePinkMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 1, 0);
        this.triangleBigBlueMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,1,0);
        this.scene.scale(-1, 1, 1);
        this.paralleloramYellowMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,2,0);
        this.triangleSmallPurpleMaterial.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    };

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    };
}

