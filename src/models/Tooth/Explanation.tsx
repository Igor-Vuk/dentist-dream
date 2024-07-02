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
      imageUrl: "/image/default.png",

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

          textPosition: [4.0, 2.8, 0],
          imagePosition: [5.2, 1.2, 0.1],
          meshBorderPosition: [5.2, 1.2, 0.09],
          linePoints: [
            [0, 3, 0],
            [0, 3, 0.1],
            [3.7, 3, 0.1],
          ],

          imageScale: [3.5, 2.5],
          meshBorderGeometry: [3.6, 2.6, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "dentin_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Dentin",
          imageUrl: "/image/dentin.jpg",

          textPosition: [-6.5, 2.1, 0],
          imagePosition: [-5.5, -0.3, 0.1],
          meshBorderPosition: [-5.5, -0.3, 0.09],
          linePoints: [
            [0, 2.3, 0],
            [0, 2.3, 0.1],
            [-4.0, 2.3, 0.1],
          ],

          imageScale: [4.0, 4.0],
          meshBorderGeometry: [4.1, 4.1, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "pulp_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Pulp",
          imageUrl: "/image/pulp.jpg",

          textPosition: [-6.2, 1.55, 0],
          imagePosition: [-5.5, -0.9, 0.1],
          meshBorderPosition: [-5.5, -0.9, 0.09],
          linePoints: [
            [0, 1.75, 0],
            [0, 1.75, 0.1],
            [-4.4, 1.75, 0.1],
          ],

          imageScale: [4.0, 4.0],
          meshBorderGeometry: [4.1, 4.1, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "nerves":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Nerves",
          imageUrl: "/image/nerves.jpg",

          textPosition: [-6.6, 1.55, 0],
          imagePosition: [-5.5, -1.5, 0.1],
          meshBorderPosition: [-5.5, -1.5, 0.09],
          linePoints: [
            [0, 1.75, 0],
            [0, 1.75, 0.1],
            [-3.8, 1.75, 0.1],
          ],

          imageScale: [4.0, 5.0],
          meshBorderGeometry: [4.1, 5.1, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "bone_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Bone",
          imageUrl: "/image/bone.jpg",

          textPosition: [4.8, -2.2, 0],
          imagePosition: [5.6, -4.1, 0.1],
          meshBorderPosition: [5.6, -4.1, 0.09],
          linePoints: [
            [2, -2, 0],
            [2, -2, 0.1],
            [4.6, -2, 0.1],
          ],

          imageScale: [4, 3],
          meshBorderGeometry: [4.1, 3.1, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })

        break
      case "gum_bottom_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: `
          Periodontal
            Ligament`,
          imageUrl: "/image/periodontal_ligament.jpg",

          textPosition: [3.0, 0.4, 0],
          imagePosition: [6.6, -4.7, 0.1],
          meshBorderPosition: [6.6, -4.7, 0.09],
          linePoints: [
            [1.4, -1, 0],
            [1.4, -1, 0.1],
            [4.3, -1, 0.1],
          ],

          imageScale: [4, 5],
          meshBorderGeometry: [4.1, 5.1, 0.12],

          imageVisible: true,
          meshBorderVisible: true,
        })
        break
      case "gum_top_back":
        descriptionProps = updateDescriptionProps(descriptionProps, {
          name: "Gum",
          imageUrl: "/image/gum.jpg",

          textPosition: [5.2, 0, 0],
          imagePosition: [6, -1.9, 0.1],
          meshBorderPosition: [6, -1.9, 0.09],
          linePoints: [
            [2.6, 0.2, 0],
            [2.6, 0.2, 0.1],
            [4.8, 0.2, 0.1],
          ],

          imageScale: [4, 3],
          meshBorderGeometry: [4.1, 3.1, 0.12],

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
          <meshStandardMaterial color="#73726f" transparent opacity={0} />
        </mesh>
      </group>
    )
  }

  return <>{renderDescription()}</>
}

export default Explanation
