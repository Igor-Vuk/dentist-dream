uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
    // texture2d returns vec4
vec4 textureColor = texture2D(uTexture, vUv);
textureColor.rgb *= vElevation * 2.0 + 1.2;

gl_FragColor = textureColor;

}