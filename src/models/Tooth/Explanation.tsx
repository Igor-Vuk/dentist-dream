import { Text3D, Line } from "@react-three/drei"
import * as THREE from "three"
import { FC, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ExplanationProps } from "../models.types"

const Explanation: FC<ExplanationProps> = ({ hideTooth }) => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          if (hideTooth && child.material.opacity < 1) {
            child.material.opacity = Math.min(1, child.material.opacity + 0.01)
          } else if (!hideTooth && child.material.opacity > 0) {
            child.material.opacity = Math.max(0, child.material.opacity - 0.01)
          }
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      <Line
        color="#5a5956"
        lineWidth={4}
        points={[
          [0, 3, 0],
          [0, 3, 0.1],
          [3.5, 3, 0.1],
        ]}
        transparent={true}
        opacity={0}
      />
      <Text3D
        size={0.5}
        height={0.2}
        position={[3.7, 2.8, 0]}
        font="/Inter_Bold.json"
        castShadow={hideTooth}
        receiveShadow={hideTooth}
      >
        Enamel
        <meshStandardMaterial color="#73726f" transparent={true} opacity={0} />
      </Text3D>
    </group>
  )
}

export default Explanation
