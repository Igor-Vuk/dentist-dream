import { useRef, useEffect, FC } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { AssetProps } from "../models.types"

import useJsonCurve from "../../customHooks/useJsonCurve"
import parrotPath from "../../data/parrotPath.json"

const WaterPark: FC<AssetProps> = ({ model, textures, actions }) => {
  /* ----------------------ref--------------------- */
  const parrotRef = useRef<THREE.Group>(null!)

  const { curvePath } = useJsonCurve(parrotPath)

  useEffect(() => {
    /* Adjust and play animations */
    if (actions) {
      actions.ChildrenPoolWater?.setDuration(4).play()
      actions.Flamingo?.setDuration(20).play()
      actions.Parrot?.play()
    }
  }, [actions])

  useFrame((state) => {
    /* after curve is generated start following the path */
    if (curvePath && parrotRef.current) {
      const elapsedTime = state.clock.elapsedTime

      /* Adjust the speed  */
      const time = (elapsedTime * 0.1) % 1

      /* Position of the model */
      const position = curvePath.curve.getPointAt(time)

      /* Look at the right direction  */
      const position2 = curvePath.curve.getPointAt(
        Math.min(1, time + 0.00001) ?? position,
      )

      parrotRef.current.position.copy(position)
      parrotRef.current.lookAt(position2)
    }
  })

  /* --------------------------------------------------- */

  const isMeshType = (mesh: THREE.Object3D): mesh is THREE.Mesh => {
    return mesh instanceof THREE.Mesh
  }

  const isSkinnedMeshType = (
    mesh: THREE.Object3D,
  ): mesh is THREE.SkinnedMesh => {
    return mesh instanceof THREE.SkinnedMesh
  }

  const renderModel = () => {
    return model.scene.children.map((mesh) => {
      /* Choose which collections to render */
      const collection = mesh.userData.collection
      if (
        collection === "ground_base" ||
        collection === "children_pool" ||
        collection === "animals" ||
        collection === "vegetation"
      ) {
        /* Default props */
        const defaultProperties = {
          name: mesh.name,
          position: mesh.position,
          rotation: mesh.rotation,
          scale: mesh.scale,
        }

        if (isMeshType(mesh)) {
          /* Default props */
          const defaultMeshProperties = {
            castShadow: true,
            receiveShadow: true,
            geometry: mesh.geometry,
            ...defaultProperties,
          }

          /* Add or remove properties from specific objects and render the rest as default */

          switch (mesh.name) {
            case "children_pool_water": {
              const { castShadow, ...customMeshProperties } = {
                // remove and add properties
                ...defaultMeshProperties,
                morphTargetDictionary: mesh.morphTargetDictionary,
                morphTargetInfluences: mesh.morphTargetInfluences,
              }

              return (
                <mesh {...customMeshProperties} key={mesh.uuid}>
                  <meshStandardMaterial
                    {...textures}

                    /*  color={"#1D8D90"} */
                  />
                </mesh>
              )
            }

            default: {
              return (
                <mesh {...defaultMeshProperties} key={mesh.uuid}>
                  <meshStandardMaterial
                    {...textures}
                    // wireframe
                  />
                </mesh>
              )
            }
          }
        }

        if (isSkinnedMeshType(mesh.children[0])) {
          switch (mesh.name) {
            case "parrot-armature": {
              const customMeshProperties = {
                ...defaultProperties,
                ref: parrotRef,
              }

              const skinnedMeshChild = mesh.children[0] as THREE.SkinnedMesh
              const buttBone = skinnedMeshChild.skeleton.bones.find(
                (obj: THREE.Bone) => obj.name === "butt_bone",
              )

              return (
                <group {...customMeshProperties} key={mesh.uuid}>
                  <skinnedMesh
                    castShadow
                    name={skinnedMeshChild.name}
                    geometry={skinnedMeshChild.geometry}
                    material={skinnedMeshChild.material}
                    skeleton={skinnedMeshChild.skeleton}
                  >
                    <meshStandardMaterial {...textures} />
                  </skinnedMesh>

                  {buttBone && <primitive object={buttBone} />}
                </group>
              )
            }
          }
        }
      }
      return null
    })
  }

  /* we can render curve if needed */
  /*  const renderCurve = () => {
    return curvePath ? <primitive object={curvePath.mesh} /> : null
  } */

  return (
    <>
      {renderModel()}
      {/*  {renderCurve()} */}
    </>
  )
}

export default WaterPark
