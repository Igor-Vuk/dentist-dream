import { useEffect, useState } from "react"
import loadCurveFromJSON from "../helpers/curveMethods.js"
import { CurvePath, CurvePoints } from "./customHooks.types.js"

const useJsonCurve = (
  curvePoints: CurvePoints,
): { curvePath: CurvePath | null } => {
  const [curvePath, setCurvePath] = useState<CurvePath | null>(null)

  useEffect(() => {
    const loadCurve = async () => {
      try {
        /* wait for the curve to be generated before animating in useFrame */
        const curve = await loadCurveFromJSON(curvePoints)

        setCurvePath(curve)
      } catch (error) {
        console.error("Error loading curve:", error)
      }
    }
    loadCurve()
  }, [curvePoints])

  return { curvePath }
}

export default useJsonCurve
