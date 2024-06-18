import { useRef, forwardRef, useImperativeHandle } from "react"
import { PerspectiveCamera, useHelper } from "@react-three/drei"
import * as THREE from "three"
import { CameraControl } from "../helpers/leva"

const Camera = forwardRef((_, ref) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  useImperativeHandle(ref, () => cameraRef.current)

  const camera = CameraControl(cameraRef)

  const { CameraHelper } = THREE

  useHelper(camera.values.helper && cameraRef, CameraHelper)

  return <PerspectiveCamera ref={cameraRef} makeDefault />
})

Camera.displayName = "Camera"

export default Camera
