import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
 * MyRockSet creates a pyramid-shaped pile of rocks.
 * @constructor
 * @param scene - Reference to MyScene object
 * @param minRadius - minimum radius of the rocks
 * @param maxRadius - maximum radius of the rocks
 */

export class MyRockSet extends CGFobject {
    constructor(scene, minRadius, maxRadius) {
        super(scene);
        this.rocks = [];
        this.createPyramid(minRadius, maxRadius);
    }

    createPyramid(minRadius, maxRadius) {
        const layers = 4; // number of layers in the pyramid
        let currentNumRocks = 19; // rocks in the bottom layer at the start
    
        let offsetY = 0; // vertical offset for each layer
        const verticalSpacing = 0.7; // vertical space between layers
    
        for (let layer = 0; layer < layers; layer++) {
            const angleIncrement = Math.PI * 2 / currentNumRocks;
            const radius = 2.3 - layer; // radius of the circle in which rocks are placed
    
            for (let i = 0; i < currentNumRocks; i++) {
                const radiusRock = (maxRadius - minRadius) + minRadius;
                const angle = i * angleIncrement;
                var x, y, z;
                var scaleX, scaleY, scaleZ;
    
                if (currentNumRocks == 1) {
                    x = 0;
                    y = offsetY + 0.1;
                    z = 0;
    
                    scaleX = 0;
                    scaleY = 0;
                    scaleZ = 0;
                } else {
                    x = radius * Math.cos(angle);
                    y = offsetY;
                    z = radius * Math.sin(angle);
    
                    scaleX = Math.random() * 2 + 1;
                    scaleY = Math.random() * 2 + 1;
                    scaleZ = Math.random() * 2 + 1;
                }
    
                const rock = new MyRock(this.scene, 30, 15, radiusRock);
    
                // if (layer === layers - 1) {
                //     y += radiusRock;
                // }
    
                this.rocks.push({
                    rock,
                    position: { x, y, z },
                    scale: { scaleX, scaleY, scaleZ }
                });
            }
    
            currentNumRocks -= 8;
            offsetY += verticalSpacing;
        }
    }
    

    display() {
        this.rocks.forEach(({ rock, position, scale }) => {
            this.scene.pushMatrix();
            this.scene.translate(position.x, position.y, position.z);
            this.scene.scale(scale.scaleX, scale.scaleY, scale.scaleZ);
            rock.display();
            this.scene.popMatrix();
        });
    }
}
