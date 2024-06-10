import * as THREE from "three"
import { ReactThreeFiber } from "@react-three/fiber"
import { WavePoolUniforms, FlagUniforms } from "../models/models.types"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      wavePoolMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & WavePoolUniforms,
        typeof THREE.ShaderMaterial
      >
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      flagMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & FlagUniforms,
        typeof THREE.ShaderMaterial
      >
    }
  }
}
