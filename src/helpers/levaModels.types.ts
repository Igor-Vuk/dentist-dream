/* ------------------------------Flag Shader-------------------------------- */
export type FlagControlDefaultValues = {
  frequencyX: number
  frequencyY: number
  amplitudeX: number
  amplitudeY: number
}

export type FlagControlType = {
  values: FlagControlDefaultValues
  set: (value: Partial<FlagControlDefaultValues>) => void
}

/* ------------------------------WavePool Shader-------------------------------- */
export type WavePoolControlDefaultValues = {
  bigWavesElevation: number
  bigWavesSpeed: number
  bigWavesFrequencyX: number
  bigWavesFrequencyY: number

  smallWavesElevation: number
  smallWavesSpeed: number
  smallWavesFrequency: number
  smallWavesIterations: number

  depthColor: string
  surfaceColor: string
  uColorOffset: number
  uColorMultiplier: number

  planeRotationX: number
  planeRotationY: number
  planeRotationZ: number
}

export type WavePoolControlType = {
  values: WavePoolControlDefaultValues
  set: (value: Partial<WavePoolControlDefaultValues>) => void
}
