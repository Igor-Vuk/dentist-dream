import { Text3D, Line, Image } from "@react-three/drei"
import * as THREE from "three"
import { FC, useRef, useEffect } from "react"
import { useFrame, extend } from "@react-three/fiber"
import { ExplanationProps, DescriptionProps } from "../models.types"
import { geometry } from "maath"

const Explanation: FC<ExplanationProps> = ({
  hideTooth,
  hoveredBackMeshName,
}) => {
  const groupRef = useRef<THREE.Group>(null!)

  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

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

  const updateDescriptionProps = (
    props: DescriptionProps,
    updates: DescriptionProps,
  ): DescriptionProps => ({ ...props, ...updates })

  const renderDescription = () => {
    let descriptionProps: DescriptionProps = {
      name: null,
      imageUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/eqpWQAAAABJRU5ErkJggg==",

      textPosition: undefined,
      imagePosition: [0, 0, 0],
      meshBorderPosition: [0, 0, 0],
      linePoints: [[0, 0, 0]],

      imageScale: [1, 1],
      meshBorderGeometry: [0, 0, 0],

      imageVisible: false,
      meshBorderVisible: false,
    }

    switch (hoveredBackMeshName) {
      case "enamel_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Enamel",
          imageUrl: "/image/enamel.jpg",

          textPosition: [3.7, 2.8, 0],
          imagePosition: [5, 1.5, 0.1],
          meshBorderPosition: [5, 1.5, 0.09],
          linePoints: [
            [0, 3, 0],
            [0, 3, 0.1],
            [3.5, 3, 0.1],
          ],

          imageScale: [3, 2],
          meshBorderGeometry: [3.1, 2.1, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "bone_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Bone",
          imageUrl: "/image/bone.jpg",

          textPosition: [4.2, -2.2, 0],
          imagePosition: [5, -4.1, 0.1],
          meshBorderPosition: [5, -4.1, 0.09],
          linePoints: [
            [2, -2, 0],
            [2, -2, 0.1],
            [4, -2, 0.1],
          ],

          imageScale: [4, 3],
          meshBorderGeometry: [4.2, 3.2, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "gum_bottom_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Periodontal Ligament",
          imageUrl: "/image/periodontal_ligament.jpg",

          textPosition: [4.2, -1.2, 0],
          imagePosition: [8, -4.1, 0.1],
          meshBorderPosition: [8, -4.1, 0.09],
          linePoints: [
            [1.4, -1, 0],
            [1.4, -1, 0.1],
            [4, -1, 0.1],
          ],

          imageScale: [4, 5],
          meshBorderGeometry: [4.2, 5.2, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break

      default:
        break
    }

    return (
      <group ref={groupRef}>
        <Line
          color="#5a5956"
          lineWidth={4}
          points={descriptionProps.linePoints}
          transparent={true}
          opacity={0}
        />
        <Text3D
          size={0.5}
          height={0.2}
          position={descriptionProps.textPosition}
          font="/Inter_Bold.json"
          castShadow={!!(hideTooth && descriptionProps.name)}
          receiveShadow={!!(hideTooth && descriptionProps.name)}
        >
          {descriptionProps.name}
          <meshStandardMaterial color="#73726f" transparent opacity={0} />
        </Text3D>

        <Image
          position={descriptionProps.imagePosition}
          scale={descriptionProps.imageScale}
          url={descriptionProps.imageUrl}
          visible={hideTooth && descriptionProps.imageVisible}
          transparent={true}
        >
          <roundedPlaneGeometry args={[1.0, 1.0, 0.03]} />
        </Image>
        <mesh
          position={descriptionProps.meshBorderPosition}
          visible={descriptionProps.meshBorderVisible}
          castShadow={true}
          receiveShadow={true}
        >
          <roundedPlaneGeometry args={descriptionProps.meshBorderGeometry} />
          <meshStandardMaterial color="black" transparent opacity={0} />
        </mesh>
      </group>
    )
  }

  return <>{renderDescription()}</>
}

export default Explanation
