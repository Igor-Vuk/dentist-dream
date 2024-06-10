import { MutableRefObject } from "react"
import { PerspectiveCamera, DirectionalLight, AxesHelper } from "three"
import { ToneMappingOptions, ColorSpaceOptions } from "./leva.ts"
import type { OrbitControls as ThreeOrbitControls } from "three-stdlib"

/* ---------------------------------SceneRender-------------------------------------- */
export type SceneRenderControlDefaultValues = {
  orbit_controls: boolean
  directional_lights: boolean
  environment_map: boolean
  soft_shadows: boolean
  axes_helper: boolean
  performance_monitor: boolean
  grid_helper: boolean
}

export type SceneRenderControlType = {
  values: SceneRenderControlDefaultValues
  set: (value: Partial<SceneRenderControlDefaultValues>) => void
}
/* ---------------------------------CanvasControl-------------------------------------- */

export type CanvasControlDefaultValues = {
  toneMapping: ToneMappingOptions
  colorSpace: ColorSpaceOptions
}

export type CanvasControlType = {
  values: CanvasControlDefaultValues
  set: (value: Partial<CanvasControlDefaultValues>) => void
}

/* ---------------------------------CameraControl--------------------------------- */

export type CameraControlRef = MutableRefObject<PerspectiveCamera | null>

export type CameraControlReturnedValues = {
  helper: boolean
}

export type CameraControlDefaultValues = Pick<
  CameraControlReturnedValues,
  "helper"
> & {
  fov: number
  position: {
    x: number
    y: number
    z: number
  }
  angle: {
    x: number
    y: number
    z: number
  }
  near: number
  far: number
}

export type CameraControlType = {
  values: CameraControlReturnedValues
  set: (value: Partial<CameraControlDefaultValues>) => void
}

/* ----------------------------ControlsControl----------------------------- */

export type ControlsControlRef = MutableRefObject<ThreeOrbitControls | null>

export type ControlsControlDefaultValues = {
  damping: boolean
}

export type ControlsControlType = {
  set: (value: Partial<ControlsControlDefaultValues>) => void
}

/* ----------------------------DirectionalLightControl----------------------------- */
export type DirectionalLightControlRef =
  MutableRefObject<DirectionalLight | null>

export type DirectionalLightControlReturnedValues = {
  helper: boolean
}

export type DirectionalLightControlDefaultValues = Pick<
  DirectionalLightControlReturnedValues,
  "helper"
> & {
  castShadow: boolean
  intensity: number
  position: { x: number; y: number; z: number }
  color: string
}

export type DirectionalLightControlType = {
  values: DirectionalLightControlReturnedValues
  set: (value: Partial<DirectionalLightControlDefaultValues>) => void
}
/* -------------------------------ShadowCameraControl-------------------------------- */

export type ShadowCameraControlReturnedValues = {
  helper: boolean
}

export type ShadowCameraControlDefaultValues = Pick<
  ShadowCameraControlReturnedValues,
  "helper"
> & {
  near: number
  far: number
  top: number
  bottom: number
  left: number
  right: number
  quality: number
  bias: number
  normalBias: number
}

export type ShadowCameraControlType = {
  values: ShadowCameraControlReturnedValues
  set: (value: Partial<ShadowCameraControlDefaultValues>) => void
}

/* ------------------------------SoftShadowsControl-------------------------------- */

export type SoftShadowsControlDefaultValues = {
  size: number
  focus: number
  samples: number
}

export type SoftShadowsControlType = {
  values: SoftShadowsControlDefaultValues
  set: (value: Partial<SoftShadowsControlDefaultValues>) => void
}
/* --------------------------------EnvironmentMapControl------------------------------- */

export type EnvironmentMapControlDefaultValues = {
  background: boolean
  backgroundIntensity: number
  backgroundRotation: [number, number, number]
  blur: number
  environmentIntensity: number
  environmentRotation: [number, number, number]
}

export type EnvironmentMapControlType = {
  values: EnvironmentMapControlDefaultValues
  set: (value: Partial<EnvironmentMapControlDefaultValues>) => void
}
/* --------------------------------AxesControl------------------------------------ */

export type AxesControlRef = MutableRefObject<AxesHelper | null>

export type AxesControlDefaultValues = {
  extend: number
}

export type AxesControlType = {
  set: (value: Partial<AxesControlDefaultValues>) => void
}

/* --------------------------------GridControl------------------------------------ */

export type GridControlDefaultValues = {
  position: [number, number, number]
  gridSize: [number, number]
  cellSize: number
  cellThickness: number
  cellColor: string
  sectionSize: number
  sectionThickness: number
  sectionColor: string
  fadeDistance: number
  fadeStrength: number
  followCamera: boolean
  infiniteGrid: boolean
}

export type GridControlType = {
  values: GridControlDefaultValues
  set: (value: Partial<GridControlDefaultValues>) => void
}
