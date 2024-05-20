#ifdef GL_ES
precision highp float;
#endif

varying vec2 textureCoord;
uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform float currentTime;

void main() {
    vec2 tiledCoords = mod(textureCoord + vec2(currentTime * 0.005, 0.0), 1.0);
    vec4 cloudColor = texture2D(sampler2, tiledCoords);
    vec4 panoramaColor = texture2D(sampler1, textureCoord);
    float alpha = 0.5;
    vec4 finalColor = mix(panoramaColor, cloudColor, alpha);
    gl_FragColor = finalColor;
}