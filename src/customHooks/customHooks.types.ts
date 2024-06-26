import * as THREE from "three"

export type CurvePath = {
  curve: THREE.CatmullRomCurve3
  mesh: THREE.Mesh
}

export type CurvePoints = {
  points: {
    x: number
    y: number
    z: number
  }[]
}

export type CatmullRomCurve3 = {
  curvePoints: CurvePoints
  curveClosed?: boolean
  curveType?: "centripetal" | "chordal" | "catmullrom"
  curveTension?: number
}

export type TubeGeometry = {
  tubeTubularSegments?: number
  tubeRadius?: number
  tubeRadialSegments?: number
  tubeClosed?: boolean
  tubeColor?: number
}

export type CurveProps = CatmullRomCurve3 & TubeGeometry
