import { GLTF } from "three-stdlib"
/* import * as THREE from "three" */

export type AssetProps = {
  model: GLTF
  /* textures: Record<string, THREE.Texture> */
}

export type ExplanationProps = {
  hideTooth: boolean
}
