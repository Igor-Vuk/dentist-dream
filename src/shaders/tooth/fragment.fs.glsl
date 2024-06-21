varying vec3 vPosition;
uniform float uTime;

void main() {
float uSliceStart = 0.0;
float uSliceArc = 0.0 + uTime;

  // Compute the angle and adjust the range to [0, 2*PI]
float angle = atan(vPosition.y, vPosition.x) + PI;

  // Wrap the angle to [0, PI]
if(angle > PI) {
angle = angle - PI;
}

if(angle > uSliceStart && angle < uSliceStart + uSliceArc) discard;

/* activate patchMap */
// float csm_Slice;
}