import { FC, useEffect, useState, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import Camera from "../../scene/Camera"
import CustomShaderMaterial from "three-custom-shader-material"
import { AssetProps } from "../models.types"

import toothVertexShader from "../../shaders/tooth/vertex.vs.glsl"
import toothFragmentShader from "../../shaders/tooth/fragment.fs.glsl"

const Tooth: FC<AssetProps> = ({ model }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const uniformsRef = useRef({
    uTime: { value: 0 },
  })

  const [hideTooth, setHideTooth] = useState(false)

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      if (cameraRef.current) {
        raycaster.setFromCamera(mouse, cameraRef.current)

        const intersects = raycaster.intersectObject(model.scene, true)

        if (
          intersects.length > 0 &&
          intersects[0].object.userData?.back === false
        ) {
          if (!hideTooth) {
            setHideTooth(true)
          }
        } else {
          if (hideTooth === true) {
            setHideTooth(false)
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup function. removes old event listener when component rerenders
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [hideTooth, model.scene])

  useFrame((_, delta) => {
    if (uniformsRef.current) {
      const { uTime } = uniformsRef.current

      if (hideTooth) {
        /* PI is half a circle su that is max value. We can control the speed of delta  */
        uTime.value = Math.min(uTime.value + delta * 3.0, Math.PI)
      } else {
        uTime.value = Math.max(uTime.value - delta * 5.0, 0)
      }
    }
  })

  const isMeshType = (mesh: THREE.Object3D): mesh is THREE.Mesh => {
    return mesh instanceof THREE.Mesh
  }

  const renderModel = () => {
    return model.scene.children.map((mesh) => {
      if (isMeshType(mesh)) {
        const defaultProperties = {
          name: mesh.name,
          position: mesh.position,
          rotation: mesh.rotation,
          scale: mesh.scale,
          castShadow: true,
          receiveShadow: true,
          geometry: mesh.geometry,
        }
        if (mesh.userData.back) {
          return (
            <mesh {...defaultProperties} key={mesh.uuid}>
              <meshStandardMaterial />
            </mesh>
          )
        } else {
          return (
            <mesh {...defaultProperties} key={mesh.uuid}>
              <CustomShaderMaterial
                baseMaterial={THREE.MeshStandardMaterial}
                vertexShader={toothVertexShader}
                fragmentShader={toothFragmentShader}
                uniforms={uniformsRef.current}
                silent={true}
                side={THREE.DoubleSide}
              />
            </mesh>
          )
        }
      }
    })
  }

  return (
    <>
      {renderModel()}
      <Camera ref={cameraRef} />
    </>
  )
}

export default Tooth
