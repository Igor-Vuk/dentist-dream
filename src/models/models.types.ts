import { GLTF } from "three-stdlib"
/* import * as THREE from "three" */

export type AssetProps = {
  model: GLTF
  /* textures: Record<string, THREE.Texture> */
}

export type ExplanationProps = {
  hideTooth: boolean
  hoveredBackMeshName: string | null
}

export type DescriptionProps = {
  name: string | null
  imageUrl: string

  textPosition?: [number, number, number]
  imagePosition: [number, number, number]
  meshBorderPosition: [number, number, number]
  linePoints: [number, number, number][]

  imageScale: [number, number]
  meshBorderVisible: boolean

  imageVisible: boolean
  meshBorderGeometry: [number, number, number]
}
