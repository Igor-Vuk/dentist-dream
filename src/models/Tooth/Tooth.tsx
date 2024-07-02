import { FC, useEffect, useState, useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import debounce from "debounce"
import CustomShaderMaterial from "three-custom-shader-material"
import { AssetProps } from "../models.types"
import Camera from "../../scene/Camera"
import Explanation from "./Explanation"

import toothVertexShader from "../../shaders/tooth/vertex.vs.glsl"
import toothFragmentShader from "../../shaders/tooth/fragment.fs.glsl"

const Tooth: FC<AssetProps> = ({ model }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const uniformsRef = useRef({
    uTime: { value: 0 },
  })
  // update Three js shader to color faces back side faces
  const patchMap = useMemo(
    () => ({
      // we can pick any name
      csm_Slice: {
        // name of property inside of THREE.js that we want to replace and what we are replacing it with
        "#include <colorspace_fragment>": `
        #include <colorspace_fragment>
        if(!gl_FrontFacing)
        gl_FragColor = vec4(0.75, 0.15, 0.3, 1.0);
        `,
      },
    }),
    [],
  )

  const [hideTooth, setHideTooth] = useState(false)
  const [hoveredBackMeshName, setHoveredBackMeshName] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleMouseMove = debounce((event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      if (cameraRef.current) {
        raycaster.setFromCamera(mouse, cameraRef.current)

        const intersects = raycaster.intersectObject(model.scene, true)

        let newHoveredBackMeshName = null
        let shouldHideTooth = false

        if (intersects.length > 0) {
          if (intersects[0].object.userData?.back === false) {
            shouldHideTooth = true
          }

          if (hideTooth) {
            const firstElementWithName = intersects.find(
              (backTooth) => backTooth.object.userData.back === true,
            )

            if (firstElementWithName) {
              /* since we have 3 nerves we combine them under the same name 
              so they all change color and show the image on hover together */
              /* ----------------------nerves-------------------------------- */
              if (
                firstElementWithName.object.name === "nerve_blue_back" ||
                firstElementWithName.object.name === "nerve_yellow_back" ||
                firstElementWithName.object.name === "nerve_red_back"
              ) {
                newHoveredBackMeshName = "nerves"
                /* ------------------------------------------------------ */
              } else {
                newHoveredBackMeshName = firstElementWithName.object.name
              }
            }
          }
        }

        setHoveredBackMeshName(newHoveredBackMeshName)
        setHideTooth(shouldHideTooth)
      }
    }, 5)

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
        uTime.value = Math.min(uTime.value + delta * 7.0, Math.PI)
      } else {
        uTime.value = Math.max(uTime.value - delta * 8.0, 0)
      }
    }
  })

  const isMeshType = (mesh: THREE.Object3D): mesh is THREE.Mesh => {
    return mesh instanceof THREE.Mesh
  }

  const renderFrontModel = useMemo(() => {
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

        if (mesh.userData.back === false) {
          return (
            <mesh {...defaultProperties} key={mesh.uuid}>
              <CustomShaderMaterial
                attach="customDepthMaterial" // attach it to the `customDepthMaterial` property of the parent `mesh` component.
                baseMaterial={THREE.MeshDepthMaterial}
                vertexShader={toothVertexShader}
                fragmentShader={toothFragmentShader}
                uniforms={uniformsRef.current}
                patchMap={patchMap}
                silent={true}
                depthPacking={THREE.RGBADepthPacking}
              />
              <CustomShaderMaterial
                attach="material" // attach it to the `material` property of the parent `mesh` component.
                baseMaterial={
                  Array.isArray(mesh.material)
                    ? mesh.material[0]
                    : mesh.material
                }
                vertexShader={toothVertexShader}
                fragmentShader={toothFragmentShader}
                uniforms={uniformsRef.current}
                patchMap={patchMap}
                silent={true}
                side={THREE.DoubleSide}
              />
            </mesh>
          )
        }
      }
      return null
    })
  }, [model.scene.children, patchMap])

  const renderBackModel = () => {
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
          let originalMaterial

          // material property on a THREE.Mesh can either be a single Material or an array of Materials.
          // When it's an array, you need to handle each element of the array individually.
          // We do this to not get typescript error
          if (Array.isArray(mesh.material)) {
            originalMaterial = mesh.material.map((material) => material.clone())
          } else {
            originalMaterial = mesh.material.clone()
          }

          /* since we have 3 nerves we combined them under the same name "nerves" above 
              so they all change color and show the image on hover together */
          /* ----------------------nerves-------------------------------- */
          if (
            (mesh.name === "nerve_blue_back" ||
              mesh.name === "nerve_yellow_back" ||
              mesh.name === "nerve_red_back") &&
            hoveredBackMeshName === "nerves" &&
            originalMaterial instanceof THREE.MeshStandardMaterial
          ) {
            originalMaterial.color.set(0xff8080)
          }
          /* ------------------------------------------------------------ */

          if (
            mesh.name === hoveredBackMeshName &&
            originalMaterial instanceof THREE.MeshStandardMaterial
          ) {
            originalMaterial.color.set(0xff8080) // Apply a red tint
          }

          return (
            <mesh
              {...defaultProperties}
              key={mesh.uuid}
              material={originalMaterial}
            />
          )
        }
      }
      return null
    })
  }

  const renderPlane = () => {
    return (
      <mesh
        position={[7, 0, -7]}
        rotation={[0, -0.6, 0]}
        receiveShadow={true}
        castShadow={true}
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial />
      </mesh>
    )
  }

  return (
    <>
      {renderBackModel()}
      {renderFrontModel}

      {renderPlane()}
      <Explanation
        hideTooth={hideTooth}
        hoveredBackMeshName={hoveredBackMeshName}
      />
      <Camera ref={cameraRef} />
    </>
  )
}

export default Tooth
