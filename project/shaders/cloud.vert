attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;
uniform float time;
uniform sampler2D textureSampler;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    vec3 offset = aVertexNormal * 0.1 * texture2D(textureSampler, vTextureCoord + vec2(0.005 * time, 0.005 * time)).b;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(aVertexPosition + offset, 1.0);
}
