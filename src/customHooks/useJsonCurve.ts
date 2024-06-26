import { useEffect, useState } from "react"
import loadCurveFromJSON from "../helpers/catmullRomCurve.js"
import { CurvePath, CurveProps } from "./customHooks.types.js"

const useJsonCurve = (
  curveProps: CurveProps,
): { curvePath: CurvePath | null } => {
  const [curvePath, setCurvePath] = useState<CurvePath | null>(null)

  useEffect(() => {
    const loadCurve = async () => {
      try {
        /* wait for the curve to be generated before animating in useFrame */
        const curve = await loadCurveFromJSON(curveProps)

        setCurvePath(curve)
      } catch (error) {
        console.error("Error loading curve:", error)
      }
    }
    loadCurve()
  }, [curveProps])

  return { curvePath }
}

export default useJsonCurve
