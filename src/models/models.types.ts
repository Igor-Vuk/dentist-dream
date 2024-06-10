import { GLTF } from "three-stdlib"
import * as THREE from "three"

export type AssetProps = {
  model: GLTF
  textures: Record<string, THREE.Texture>
  actions?: Record<string, THREE.AnimationAction | null>
}

/* ------------------------WavePool--------------------------- */
export type WavePoolUniforms = {
  uTime: number
  uBigWavesElevation: number
  uBigWavesSpeed: number
  uBigWavesFrequency: THREE.Vector2
  uSmallWavesElevation: number
  uSmallWavesSpeed: number
  uSmallWavesFrequency: number
  uSmallWavesIterations: number
  uDepthColor: THREE.Color
  uSurfaceColor: THREE.Color
  uColorOffset: number
  uColorMultiplier: number
}

/* ------------------------Flag--------------------------- */
export type FlagUniforms = {
  uFrequency: THREE.Vector2
  uAmplitude: THREE.Vector2
  uTime: 0
  uTexture: THREE.Texture
}
