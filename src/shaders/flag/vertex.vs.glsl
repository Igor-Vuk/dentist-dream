uniform vec2 uFrequency;
uniform vec2 uAmplitude;
uniform float uTime;

varying vec2 vUv; // 'vec2 uv' attribute is prepended so we don't need to import it before using varying
varying float vElevation;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * uAmplitude.x;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * uAmplitude.y;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
}