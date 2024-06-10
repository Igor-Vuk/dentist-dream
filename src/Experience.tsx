import { Center } from "@react-three/drei"
import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { Leva } from "leva"

import { CanvasControl, SceneRenderControl } from "./helpers/leva"

import Camera from "./scene/Camera"
import Controls from "./scene/Controls"
import DirectionalLight from "./scene/DirectionalLight"
import EnvironmentMap from "./scene/EnvironmentMap"
import SoftShadowsModifier from "./scene/SoftShadowsModifier"
import AxesHelper from "./scene/AxesHelper"
import PerformanceMonitor from "./scene/PerformanceMonitor"
import GridHelper from "./scene/GridHelper"

// import Fallback from "./models/Fallback"  /* use Fallback component on Suspense if needed */
import Models from "./models/Models"

export default function Experience() {
  const sceneRender = SceneRenderControl()
  const canvas = CanvasControl()

  const [showLeva, setShowLeva] = useState<boolean>(true) //  show or hide leva on first load

  useEffect(() => {
    /*  add event listener to show or hide leva when "h" button is pressed */
    const handleLeva = (event: KeyboardEvent) => {
      if (event.key === "h") {
        setShowLeva((showLeva) => !showLeva)
      }
    }
    window.addEventListener("keydown", handleLeva)
    return () => {
      window.removeEventListener("keydown", handleLeva)
    }
  }, [])

  const {
    orbit_controls,
    performance_monitor,
    directional_lights,
    soft_shadows,
    axes_helper,
    grid_helper,
    environment_map,
  } = sceneRender.values

  const { toneMapping, colorSpace } = canvas.values
  return (
    <>
      <Leva collapsed hidden={showLeva} />
      <Canvas
        shadows
        gl={{
          toneMapping: THREE[toneMapping],
          outputColorSpace: THREE[colorSpace],
        }}
      >
        <Camera />
        {orbit_controls && <Controls />}
        {performance_monitor && <PerformanceMonitor />}
        {directional_lights && <DirectionalLight />}
        {soft_shadows && <SoftShadowsModifier />}
        {axes_helper && <AxesHelper />}
        {grid_helper && <GridHelper />}

        <Center>
          <Suspense fallback={null}>
            {environment_map && <EnvironmentMap />}
            <Models />
          </Suspense>
        </Center>
      </Canvas>
    </>
  )
}
