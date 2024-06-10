import { Grid } from "@react-three/drei"
import { GridControl } from "../helpers/leva"

const GridHelper = () => {
  const grid = GridControl()
  const { gridSize, ...config } = grid.values

  return <Grid args={gridSize} {...config} />
}

export default GridHelper
