import { Environment } from "@react-three/drei"
import { EnvironmentMapControl } from "../helpers/leva"

const environmentMapFiles =
  "/environmentMaps/kloofendal_48d_partly_cloudy_puresky_1k.hdr"

const EnvironmentMap = () => {
  const environmentMap = EnvironmentMapControl()

  return (
    <Environment
      background={environmentMap.values.background}
      backgroundIntensity={environmentMap.values.backgroundIntensity}
      backgroundRotation={environmentMap.values.backgroundRotation}
      backgroundBlurriness={environmentMap.values.blur}
      environmentIntensity={environmentMap.values.environmentIntensity}
      environmentRotation={environmentMap.values.environmentRotation}
      files={environmentMapFiles}
    />
  )
}

export default EnvironmentMap
