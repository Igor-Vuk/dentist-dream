import { useRef } from "react"
import { PerspectiveCamera, useHelper } from "@react-three/drei"
import * as THREE from "three"
import { CameraControl } from "../helpers/leva"

const Camera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  const camera = CameraControl(cameraRef)

  const { CameraHelper } = THREE

  useHelper(camera.values.helper && cameraRef, CameraHelper)

  return <PerspectiveCamera ref={cameraRef} makeDefault />
}

export default Camera
