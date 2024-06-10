import { useRef } from "react"
import { useHelper } from "@react-three/drei"
import * as THREE from "three"
import { DirectionalLightControl, ShadowCameraControl } from "../helpers/leva"

const DirectionalLight = () => {
  /* ----------------------ref--------------------- */
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!)
  const cameraRef = useRef<THREE.OrthographicCamera>(null!)

  /* ---------------------leva--------------------- */
  const directionalLight = DirectionalLightControl(directionalLightRef)

  const shadowCamera = ShadowCameraControl(directionalLightRef)

  /* --------------------helper-------------------- */

  const { DirectionalLightHelper, CameraHelper } = THREE

  useHelper(
    directionalLight.values.helper && directionalLightRef,
    DirectionalLightHelper,
  )
  useHelper(shadowCamera.values.helper && cameraRef, CameraHelper)

  return (
    <directionalLight ref={directionalLightRef}>
      <orthographicCamera ref={cameraRef} attach="shadow-camera" />
    </directionalLight>
  )
}

export default DirectionalLight
