import { useGLTF /* useTexture */ } from "@react-three/drei"
/* import * as THREE from "three" */
import { AssetProps } from "./models.types"
import Tooth from "./Tooth/Tooth"

const Models = () => {
  /* -----------------------------Files------------------------------- */
  const modelFiles = useGLTF("/models/tooth-final.glb")

  // const flagTexture = useTexture({
  //   map: "/textures/water-park-logo.jpg",
  // })
  /* ----------------------------Textures---------------------------------- */

  /*  we need to flip textures in order to align them */
  // const adjustTexture = (...texturesArray: Record<string, THREE.Texture>[]) => {
  //   texturesArray.forEach((textures) => {
  //     Object.values(textures).forEach((texture) => {
  //       texture.flipY = false
  //     })
  //   })
  // }

  // adjustTexture(bakedTexture, flagTexture)

  /* ----------------------Data--------------------- */
  const toothAssets: AssetProps = {
    model: modelFiles,
    // textures: bakedTexture,
  }

  return (
    <group dispose={null}>
      <Tooth {...toothAssets} />
    </group>
  )
}

export default Models
