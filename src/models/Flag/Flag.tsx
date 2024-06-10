import { useRef, FC /* useEffect */ } from "react"
import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"

import { AssetProps, FlagUniforms } from "../models.types"

import flagVertexShader from "../../shaders/flag/vertex.vs.glsl"
import flagFragmentShader from "../../shaders/flag/fragment.fs.glsl"

import { FlagControl } from "../../helpers/levaModels.ts"

const Flag: FC<AssetProps> = ({ model, textures }) => {
  // const planeRef = useRef<THREE.Mesh>(null!)
  const flagMaterialRef = useRef<THREE.ShaderMaterial & FlagUniforms>(null!)
  const flag = FlagControl()

  /* --------------------- shader material ------------------------ */

  const FlagMaterial = shaderMaterial(
    {
      uFrequency: new THREE.Vector2(
        flag.values.frequencyX,
        flag.values.frequencyY,
      ),
      uAmplitude: new THREE.Vector2(
        flag.values.amplitudeX,
        flag.values.amplitudeY,
      ),
      uTime: 0,
      uTexture: textures.map,
    },
    flagVertexShader,
    flagFragmentShader,
  )

  extend({ FlagMaterial })

  /* -------------------------------------------------------------- */

  /* Example hot so send attribute to vertex shader */
  // useEffect(() => {
  //   if (planeRef.current) {
  //     const count = planeRef.current.geometry.attributes.position.count
  //     const randoms = new Float32Array(count)

  //     for (let i = 0; i < count; i++) {
  //       randoms[i] = Math.random()
  //     }

  //     planeRef.current.geometry.setAttribute(
  //       "aRandom",
  //       new THREE.BufferAttribute(randoms, 1),
  //     )
  //   }
  // }, [])

  useFrame((_, delta) => {
    if (flagMaterialRef.current) {
      flagMaterialRef.current.uTime += delta
    }
  })

  const isMeshType = (mesh: THREE.Object3D): mesh is THREE.Mesh => {
    return mesh instanceof THREE.Mesh
  }

  const renderModel = () => {
    return model.scene.children.map((mesh) => {
      const collection = mesh.userData.collection
      if (isMeshType(mesh) && collection === "flag") {
        const defaultMeshProperties = {
          // ref: planeRef,
          name: mesh.name,
          castShadow: true,
          receiveShadow: true,
          geometry: mesh.geometry,
          position: mesh.position,
          rotation: mesh.rotation,
          scale: mesh.scale,
        }

        return (
          <mesh {...defaultMeshProperties} key={mesh.uuid}>
            {/* We attach a unique key property to the prototype class to enable hot-reload. */}
            <flagMaterial
              key={FlagMaterial.key}
              ref={flagMaterialRef}
              side={THREE.DoubleSide}
              wireframe={false}
            />
          </mesh>
        )
      }
      return null // Ensure non-flag meshes are handled correctly
    })
  }

  return <>{renderModel()}</>
}

export default Flag
