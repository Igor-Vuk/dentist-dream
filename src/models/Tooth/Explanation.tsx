import { Text3D, Line, Image } from "@react-three/drei"
import * as THREE from "three"
import { FC, useRef, useEffect } from "react"
import { useFrame, extend } from "@react-three/fiber"
import { ExplanationProps } from "../models.types"
import { geometry } from "maath"

const Explanation: FC<ExplanationProps> = ({
  hideTooth,
  hoveredBackMeshName,
}) => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          if (hideTooth && hoveredBackMeshName) {
            child.material.opacity = Math.min(1, child.material.opacity + 0.01)
          }
        }
      })
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 0
        }
      })
    }
  }, [hoveredBackMeshName])

  const LineText = () => {
    type ExplanationProps = {
      linePoints: [number, number, number][]
      textPosition?: [number, number, number]
      name: string | null
    }
    const explanationProps: ExplanationProps = {
      linePoints: [[0, 0, 0]],
      textPosition: undefined,
      name: null,
    }

    switch (hoveredBackMeshName) {
      case "enamel_back":
        explanationProps.linePoints = [
          [0, 3, 0],
          [0, 3, 0.1],
          [3.5, 3, 0.1],
        ]
        explanationProps.textPosition = [3.7, 2.8, 0]
        explanationProps.name = "Enamel"
        break
      case "bone_back":
        explanationProps.linePoints = [
          [2, -2, 0],
          [2, -2, 0.1],
          [4, -2, 0.1],
        ]
        explanationProps.textPosition = [4.2, -2.2, 0]
        explanationProps.name = "Bone"
        break
      case "gum_bottom_back":
        explanationProps.linePoints = [
          [1.4, -1, 0],
          [1.4, -1, 0.1],
          [4, -1, 0.1],
        ]
        explanationProps.textPosition = [4.2, -1.2, 0]
        explanationProps.name = "Periodontal Ligament"
        break

      default:
        break
    }

    return (
      <group ref={groupRef}>
        <Line
          color="#5a5956"
          lineWidth={4}
          points={explanationProps.linePoints}
          transparent={true}
          opacity={0}
        />
        <Text3D
          size={0.5}
          height={0.2}
          position={explanationProps.textPosition}
          font="/Inter_Bold.json"
          castShadow={!!(hideTooth && explanationProps.name)}
          receiveShadow={!!(hideTooth && explanationProps.name)}
        >
          {explanationProps.name}
          <meshStandardMaterial color="#73726f" transparent opacity={0} />
        </Text3D>
      </group>
    )
  }
  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })
  return (
    <>
      {LineText()}
      <Image
        position={[5, 1.5, 0.1]}
        scale={[3, 2]}
        url={"/image/enamel.jpg"}
        opacity={1}
      >
        <roundedPlaneGeometry args={[1.0, 1.0, 0.03]} />
      </Image>
      <mesh position={[5, 1.5, 0.09]}>
        <roundedPlaneGeometry args={[3.1, 2.1, 0.12]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </>
  )
}

export default Explanation
