import { useRef } from "react"
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"
import * as THREE from "three"
import { AssetProps } from "./models.types"
import WaterPark from "./WaterPark/WaterPark"
import Flag from "./Flag/Flag"
import WavePool from "./WavePool/WavePool"

const Models = () => {
  /* -----------------------------Files------------------------------- */
  const modelFiles = useGLTF("/models/water_park-working_version.glb")
  const bakedTexture = useTexture({
    map: "/textures/baked-flat-wave-pool_DIFFUSE_min.jpg",
    // aoMap:
    //   "./textures/baked-flat-no-specular_AO.jpg" /* example how to use multiple textures */,
  })
  const flagTexture = useTexture({
    map: "/textures/water-park-logo.jpg",
  })
  /* ----------------------------Textures---------------------------------- */

  // we need to flip textures in order to align them
  const adjustTexture = (...texturesArray: Record<string, THREE.Texture>[]) => {
    texturesArray.forEach((textures) => {
      Object.values(textures).forEach((texture) => {
        texture.flipY = false
      })
    })
  }

  adjustTexture(bakedTexture, flagTexture)
  /* ------------------------Animations------------------------------ */

  const group = useRef<THREE.Group>(null!)
  const { actions } = useAnimations(modelFiles.animations, group)

  /* ----------------------Data--------------------- */
  const waterParkAssets: AssetProps = {
    model: modelFiles,
    textures: bakedTexture,
    actions: actions,
  }

  const flagAssets = {
    model: modelFiles,
    textures: flagTexture,
  }

  const wavePoolAssets = {
    model: modelFiles,
    textures: bakedTexture,
  }

  return (
    <>
      <group ref={group} dispose={null}>
        <WaterPark {...waterParkAssets} />
        <Flag {...flagAssets} />
        <WavePool {...wavePoolAssets} />
      </group>
    </>
  )
}

export default Models
