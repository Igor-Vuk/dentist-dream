import { useRef } from "react"
import { AxesControl } from "../helpers/leva"
import * as THREE from "three"

const AxesHelperComponent = () => {
  const axesHelperRef = useRef<THREE.AxesHelper>(null!)

  AxesControl(axesHelperRef)

  return <axesHelper ref={axesHelperRef} />
}

export default AxesHelperComponent
