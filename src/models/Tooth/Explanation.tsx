import { Text3D, Line } from "@react-three/drei"

import enamelPath from "../../data/enamelPath.json"

const Explanation = () => {
  const transformedArray = enamelPath.points.map((obj) => [obj.x, obj.y, obj.z])
  console.log(transformedArray)

  return (
    <>
      <Line
        color="black"
        lineWidth={4}
        points={[
          [0, 3, 0],
          [0, 3, 0.1],
          [3.5, 3, 0.1],
        ]}
      />

      <Text3D
        size={0.5}
        height={0.2}
        position={[3.7, 2.8, 0]}
        font="/Inter_Bold.json"
        castShadow={true}
        receiveShadow={true}
      >
        Enamel
        <meshStandardMaterial color="black" />
      </Text3D>
    </>
  )
}

export default Explanation
