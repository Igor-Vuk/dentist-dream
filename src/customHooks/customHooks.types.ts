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
  closed: boolean
}
