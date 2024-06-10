import { useControls, button, folder } from "leva"
import * as LevaModelsTypes from "./levaModels.types.ts"

/* ------------------------------Flag Shader-------------------------------- */

const FlagControl = (): LevaModelsTypes.FlagControlType => {
  const defaultValues: LevaModelsTypes.FlagControlDefaultValues = {
    frequencyX: 4.0,
    frequencyY: 1.5,
    amplitudeX: 0.01,
    amplitudeY: 0.01,
  }
  const [returnedValues, set] = useControls("models", () => ({
    flag: folder({
      frequencyX: {
        value: defaultValues.frequencyX,
        min: 0,
        max: 20,
        step: 0.01,
      },
      frequencyY: {
        value: defaultValues.frequencyY,
        min: 0,
        max: 20,
        step: 0.01,
      },
      amplitudeX: {
        value: defaultValues.amplitudeX,
        min: 0,
        max: 1,
        step: 0.01,
      },
      amplitudeY: {
        value: defaultValues.amplitudeY,
        min: 0,
        max: 1,
        step: 0.01,
      },
      reset: button(() => {
        set({
          ...defaultValues,
        })
      }),
    }),
  }))
  return { values: returnedValues, set }
}

/* ------------------------------WavePool Shader-------------------------------- */

const WavePoolControl = (): LevaModelsTypes.WavePoolControlType => {
  const defaultValues: LevaModelsTypes.WavePoolControlDefaultValues = {
    bigWavesElevation: 0.31,
    bigWavesSpeed: 0.37,
    bigWavesFrequencyX: 1.28,
    bigWavesFrequencyY: 0.0,

    smallWavesElevation: 0.12,
    smallWavesSpeed: 0.3,
    smallWavesFrequency: 0.71,
    smallWavesIterations: 4.0,

    depthColor: "#65acb9",
    surfaceColor: "#85c6d2",
    uColorOffset: 0.08,
    uColorMultiplier: 2.99,

    planeRotationX: Math.PI / 2,
    planeRotationY: 0.02,
    planeRotationZ: -0.28,
  }

  const [returnedValues, set] = useControls("models", () => ({
    wave_pool: folder({
      bigWavesElevation: {
        value: defaultValues.bigWavesElevation,
        min: 0.001,
        max: 1,
        step: 0.001,
      },
      bigWavesSpeed: {
        value: defaultValues.bigWavesSpeed,
        min: 0,
        max: 4,
        step: 0.001,
      },
      bigWavesFrequencyX: {
        value: defaultValues.bigWavesFrequencyX,
        min: 0.001,
        max: 10,
        step: 0.001,
      },
      bigWavesFrequencyY: {
        value: defaultValues.bigWavesFrequencyY,
        min: 0,
        max: 10,
        step: 0.001,
      },

      smallWavesElevation: {
        value: defaultValues.smallWavesElevation,
        min: 0.0,
        max: 1,
        step: 0.001,
      },
      smallWavesSpeed: {
        value: defaultValues.smallWavesSpeed,
        min: 0,
        max: 4,
        step: 0.001,
      },
      smallWavesFrequency: {
        value: defaultValues.smallWavesFrequency,
        min: 0.0,
        max: 30,
        step: 0.001,
      },
      smallWavesIterations: {
        value: defaultValues.smallWavesIterations,
        min: 0,
        max: 8,
        step: 1.0,
      },

      depthColor: {
        value: defaultValues.depthColor,
      },
      surfaceColor: {
        value: defaultValues.surfaceColor,
      },
      uColorOffset: {
        value: defaultValues.uColorOffset,
        min: 0,
        max: 1,
        step: 0.001,
      },
      uColorMultiplier: {
        value: defaultValues.uColorMultiplier,
        min: 0,
        max: 10,
        step: 0.001,
      },

      planeRotationX: {
        value: defaultValues.planeRotationX,
      },
      planeRotationY: {
        value: defaultValues.planeRotationY,
      },
      planeRotationZ: {
        value: defaultValues.planeRotationZ,
      },

      reset: button(() => {
        set({
          ...defaultValues,
        })
      }),
    }),
  }))
  return {
    values: returnedValues,
    set,
  }
}

export { FlagControl, WavePoolControl }
