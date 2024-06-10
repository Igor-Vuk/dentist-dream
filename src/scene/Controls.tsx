import { useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import { ControlsControl } from "../helpers/leva"
import type { OrbitControls as ThreeOrbitControls } from "three-stdlib"

const Controls = () => {
  const controlsRef = useRef<ThreeOrbitControls>(null!)

  ControlsControl(controlsRef)

  return <OrbitControls ref={controlsRef} makeDefault />
}

export default Controls
