import { useControls, button } from "leva"
import { Color } from "three"
import * as LevaTypes from "./leva.types.ts"

/* ---------------------------------SceneRender-------------------------------------- */

const SceneRenderControl = (): LevaTypes.SceneRenderControlType => {
  const defaultValues: LevaTypes.SceneRenderControlDefaultValues = {
    orbit_controls: true,
    directional_lights: true,
    environment_map: true,
    soft_shadows: false,
    axes_helper: false,
    performance_monitor: false,
    grid_helper: false,
  }

  const [returnedValues, set] = useControls("scene_render", () => ({
    ...defaultValues,
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))
  return {
    values: returnedValues,
    set,
  }
}

/* ---------------------------------CanvasControl-------------------------------------- */

const TONE_MAPPING_OPTIONS = [
  "NoToneMapping",
  "LinearToneMapping",
  "ReinhardToneMapping",
  "CineonToneMapping",
  "ACESFilmicToneMapping",
  "AgXToneMapping",
  "CustomToneMapping",
] as const

const COLOR_SPACE_OPTIONS = ["SRGBColorSpace", "LinearSRGBColorSpace"] as const

export type ToneMappingOptions = (typeof TONE_MAPPING_OPTIONS)[number]
export type ColorSpaceOptions = (typeof COLOR_SPACE_OPTIONS)[number]

const CanvasControl = (): LevaTypes.CanvasControlType => {
  const defaultValues: LevaTypes.CanvasControlDefaultValues = {
    toneMapping: "ACESFilmicToneMapping",
    colorSpace: "SRGBColorSpace",
  }

  const [returnedValues, set] = useControls("canvas", () => ({
    toneMapping: {
      value: defaultValues.toneMapping,
      options: TONE_MAPPING_OPTIONS,
    },
    colorSpace: {
      value: defaultValues.colorSpace,
      options: COLOR_SPACE_OPTIONS,
    },
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))

  return {
    values: {
      toneMapping: returnedValues.toneMapping as ToneMappingOptions,
      colorSpace: returnedValues.colorSpace as ColorSpaceOptions,
    },
    set,
  }
}

/* ---------------------------------CameraControl--------------------------------- */

const CameraControl = (
  cameraRef: LevaTypes.CameraControlRef,
): LevaTypes.CameraControlType => {
  const defaultValues: LevaTypes.CameraControlDefaultValues = {
    helper: false,
    fov: 45,
    position: {
      x: 0,
      y: 6,
      z: 20,
    },
    angle: {
      x: 0,
      y: 1,
      z: 0,
    },
    near: 0.1,
    far: 200,
  }
  const [returnedValues, set] = useControls("camera", () => ({
    helper: defaultValues.helper,
    fov: {
      value: defaultValues.fov,
      min: 1,
      step: 1,
      onChange: (value: number) => {
        if (cameraRef.current) {
          cameraRef.current.fov = value
          cameraRef.current.updateProjectionMatrix()
        }
      },
    },
    position: {
      value: defaultValues.position,
      onChange: (value: { x: number; y: number; z: number }) => {
        if (cameraRef.current) {
          cameraRef.current.position.copy(value)
        }
      },
    },
    angle: {
      value: defaultValues.angle,
      onChange: (value: { x: number; y: number; z: number }) => {
        if (cameraRef.current) {
          cameraRef.current.up.copy(value)
        }
      },
    },
    near: {
      value: defaultValues.near,
      min: 0.1,
      step: 1,
      onChange: (value: number) => {
        if (cameraRef.current) {
          cameraRef.current.near = value
          cameraRef.current.updateProjectionMatrix()
        }
      },
    },
    far: {
      value: defaultValues.far,
      min: 1,
      step: 1,
      onChange: (value: number) => {
        if (cameraRef.current) {
          cameraRef.current.far = value
          cameraRef.current.updateProjectionMatrix()
        }
      },
    },
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))

  return { values: returnedValues, set }
}

/* ----------------------------ControlsControl----------------------------- */

const ControlsControl = (
  controlsRef: LevaTypes.ControlsControlRef,
): LevaTypes.ControlsControlType => {
  const defaultValues: LevaTypes.ControlsControlDefaultValues = {
    damping: true,
  }

  const [, set] = useControls("orbit_controls", () => ({
    damping: {
      value: defaultValues.damping,
      onChange: (value: boolean) => {
        if (controlsRef.current) {
          controlsRef.current.enableDamping = value
        }
      },
    },
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))

  return { set }
}

/* ----------------------------DirectionalLightControl----------------------------- */

const DirectionalLightControl = (
  directionalLightRef: LevaTypes.DirectionalLightControlRef,
): LevaTypes.DirectionalLightControlType => {
  const defaultValues: LevaTypes.DirectionalLightControlDefaultValues = {
    helper: false,
    castShadow: true,
    intensity: 2.8,
    position: {
      x: -48,
      y: 48,
      z: -25,
    },
    color: "#ffffff",
  }

  const [returnedValues, set] = useControls("directional_lights", () => ({
    helper: defaultValues.helper,
    castShadow: {
      value: defaultValues.castShadow,
      onChange: (value: boolean) => {
        if (directionalLightRef.current) {
          directionalLightRef.current.castShadow = value
        }
      },
    },
    intensity: {
      value: defaultValues.intensity,
      min: 0,
      max: 10,
      step: 0.001,
      onChange: (value: number) => {
        if (directionalLightRef.current) {
          directionalLightRef.current.intensity = value
        }
      },
    },
    position: {
      value: defaultValues.position,
      onChange: (value: { x: number; y: number; z: number }) => {
        if (directionalLightRef.current) {
          directionalLightRef.current.position.copy(value)
        }
      },
    },
    color: {
      value: defaultValues.color,
      onChange: (value: string) => {
        if (directionalLightRef.current) {
          directionalLightRef.current.color = new Color(value)
        }
      },
    },
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))

  return { values: returnedValues, set }
}

/* -------------------------------ShadowCameraControl-------------------------------- */

const ShadowCameraControl = (
  directionalLightRef: LevaTypes.DirectionalLightControlRef,
): LevaTypes.ShadowCameraControlType => {
  const defaultValues: LevaTypes.ShadowCameraControlDefaultValues = {
    helper: false,
    near: 39,
    far: 85.8,
    top: 12,
    bottom: -25,
    left: -7.3,
    right: 20.6,
    quality: 1024,
    bias: 0,
    normalBias: 0,
  }

  const [returnedValues, set] = useControls(
    "directional_lights_shadow_camera",
    () => ({
      helper: defaultValues.helper,
      near: {
        value: defaultValues.near,
        min: 1,
        max: 50,
        step: 0.1,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.camera.near = value
            directionalLightRef.current.shadow.camera.updateProjectionMatrix()
          }
        },
      },
      far: {
        value: defaultValues.far,
        min: 1,
        max: 100,
        step: 0.1,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.camera.far = value
            directionalLightRef.current.shadow.camera.updateProjectionMatrix()
          }
        },
      },
      top: {
        value: defaultValues.top,
        min: 0,
        step: 0.1,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.camera.top = value
            directionalLightRef.current.shadow.camera.updateProjectionMatrix()
          }
        },
      },
      bottom: {
        value: defaultValues.bottom,
        max: 0,
        step: 0.1,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.camera.bottom = value
            directionalLightRef.current.shadow.camera.updateProjectionMatrix()
          }
        },
      },
      left: {
        value: defaultValues.left,
        max: 0,
        step: 0.1,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.camera.left = value
            directionalLightRef.current.shadow.camera.updateProjectionMatrix()
          }
        },
      },
      right: {
        value: defaultValues.right,
        min: 0,
        step: 0.1,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.camera.right = value
            directionalLightRef.current.shadow.camera.updateProjectionMatrix()
          }
        },
      },
      quality: {
        value: defaultValues.quality,
        options: [128, 256, 512, 1024, 2048, 4096],
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            const mapSizeValue = { x: value, y: value }
            directionalLightRef.current.shadow.mapSize.copy(mapSizeValue)
            directionalLightRef.current.shadow.map?.setSize(value, value)
          }
        },
      },
      bias: {
        value: defaultValues.bias,
        min: -0.05,
        max: 0.05,
        step: 0.001,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.bias = value
          }
        },
      },
      normalBias: {
        value: defaultValues.normalBias,
        min: -0.05,
        max: 0.05,
        step: 0.001,
        onChange: (value: number) => {
          if (directionalLightRef.current) {
            directionalLightRef.current.shadow.normalBias = value
          }
        },
      },
      reset: button(() => {
        set({
          ...defaultValues,
        })
      }),
    }),
  )
  return { values: returnedValues, set }
}

/* ------------------------------SoftShadowsControl-------------------------------- */

const SoftShadowsControl = (): LevaTypes.SoftShadowsControlType => {
  const defaultValues: LevaTypes.SoftShadowsControlDefaultValues = {
    size: 3,
    focus: 0.2,
    samples: 10,
  }
  const [returnedValues, set] = useControls("soft_shadows", () => ({
    size: { value: defaultValues.size, min: 0, max: 100, step: 1 },
    focus: { value: defaultValues.focus, min: 0, max: 2, step: 0.1 },
    samples: { value: defaultValues.samples, min: 1, max: 20, step: 1 },
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))

  return { values: returnedValues, set }
}

/* --------------------------------EnvironmentMapControl------------------------------- */

const EnvironmentMapControl = (): LevaTypes.EnvironmentMapControlType => {
  const defaultValues: LevaTypes.EnvironmentMapControlDefaultValues = {
    background: true,
    backgroundIntensity: 1.0,
    backgroundRotation: [0, Math.PI / 2, 0],
    blur: 0,
    environmentIntensity: 1.0,
    environmentRotation: [0, Math.PI / 2, 0],
  }

  const [returnedValues, set] = useControls("environment_map", () => ({
    background: defaultValues.background,
    backgroundIntensity: {
      value: defaultValues.backgroundIntensity,
      min: 0,
      step: 0.01,
    },
    backgroundRotation: defaultValues.backgroundRotation,
    blur: {
      value: defaultValues.blur,
      min: 0,
      max: 1,
      step: 0.01,
    },
    environmentIntensity: {
      value: defaultValues.environmentIntensity,
      min: 0,
      max: 2,
      step: 0.01,
    },
    environmentRotation: defaultValues.environmentRotation,

    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))
  return {
    values: returnedValues,
    set,
  }
}

/* --------------------------------AxesControl------------------------------------ */

const AxesControl = (
  axesHelperRef: LevaTypes.AxesControlRef,
): LevaTypes.AxesControlType => {
  const defaultValues: LevaTypes.AxesControlDefaultValues = {
    extend: 1,
  }

  const [, set] = useControls("axes_helper", () => ({
    extend: {
      value: defaultValues.extend,
      min: 1,
      max: 30,
      step: 1,
      onChange: (value: number) => {
        if (axesHelperRef.current) {
          // we put the same value for x,y,z axis so we don't need to adjust every separately
          const scaleValue = { x: value, y: value, z: value }
          axesHelperRef.current.scale.copy(scaleValue)
        }
      },
    },
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))
  return { set }
}
/* --------------------------------GridControl------------------------------------ */

const GridControl = (): LevaTypes.GridControlType => {
  const defaultValues: LevaTypes.GridControlDefaultValues = {
    position: [0, 0, 0],
    gridSize: [5, 5],
    cellSize: 1,
    cellThickness: 2,
    cellColor: "#6f6f6f",
    sectionSize: 5,
    sectionThickness: 1.5,
    sectionColor: "#9d4b4b",
    fadeDistance: 200,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  }

  const [returnedValues, set] = useControls("grid_helper", () => ({
    position: defaultValues.position,
    gridSize: defaultValues.gridSize,
    cellSize: { value: defaultValues.cellSize, min: 0, max: 10, step: 0.1 },
    cellThickness: {
      value: defaultValues.cellThickness,
      min: 0,
      max: 5,
      step: 0.1,
    },
    cellColor: defaultValues.cellColor,
    sectionSize: {
      value: defaultValues.sectionSize,
      min: 0,
      max: 10,
      step: 0.1,
    },
    sectionThickness: {
      value: defaultValues.sectionThickness,
      min: 0,
      max: 5,
      step: 0.1,
    },
    sectionColor: defaultValues.sectionColor,
    fadeDistance: {
      value: defaultValues.fadeDistance,
      min: 0,
      max: 500,
      step: 1,
    },
    fadeStrength: {
      value: defaultValues.fadeStrength,
      min: 0,
      max: 1,
      step: 0.1,
    },
    followCamera: defaultValues.followCamera,
    infiniteGrid: defaultValues.infiniteGrid,
    reset: button(() => {
      set({
        ...defaultValues,
      })
    }),
  }))

  return {
    values: returnedValues,
    set,
  }
}

export {
  SceneRenderControl,
  CanvasControl,
  CameraControl,
  ControlsControl,
  DirectionalLightControl,
  ShadowCameraControl,
  SoftShadowsControl,
  EnvironmentMapControl,
  AxesControl,
  GridControl,
}
