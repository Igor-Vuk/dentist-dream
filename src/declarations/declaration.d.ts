import { ReactThreeFiber } from "@react-three/fiber"
import { geometry } from "maath"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: ReactThreeFiber.Object3DNode<
        geometry.RoundedPlaneGeometry,
        typeof geometry.RoundedPlaneGeometry
      >
    }
  }
}
