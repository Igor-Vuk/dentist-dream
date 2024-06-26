import * as THREE from "three"
import { CurvePath, CurveProps } from "../customHooks/customHooks.types"

const createCurveFromJSON = ({
  curvePoints,
  curveClosed = false,
  curveType = "centripetal",
  curveTension = 0.5,
}: CurveProps): Promise<THREE.CatmullRomCurve3> => {
  return new Promise((resolve) => {
    // Extract the vertices array from the JSON object
    const vertices = curvePoints.points

    // Create an empty array to store THREE.Vector3 instances
    const points = []

    // Iterate over the vertices and push THREE.Vector3 instances to the points array
    // we can reduce the number of vertices being pushed by putting i += 3
    for (let i = 0; i < vertices.length; i++) {
      const x = vertices[i].x
      const y = vertices[i].y
      const z = vertices[i].z
      points.push(new THREE.Vector3(x, y, z))
    }

    // Create a CatmullRomCurve3 using the points array
    const curve = new THREE.CatmullRomCurve3(points)

    // choose if it's closed or open curve
    curve.closed = curveClosed

    // choose curveType. Default is "centripetal". It can also be "chordal" and "catmullrom".
    curve.curveType = curveType

    // default is 0.5. When curveType is "catmullrom", defines "catmullrom's" tension.
    curve.tension = curveTension

    resolve(curve)
  })
}

const getTubeFromCurve = (
  curve: THREE.CatmullRomCurve3,
  {
    tubeTubularSegments = 100,
    tubeRadius = 0.05,
    tubeRadialSegments = 8,
    tubeClosed = true,
    tubeColor = 0xffffff,
  }: CurveProps,
): Promise<THREE.Mesh> => {
  return new Promise((resolve) => {
    const geometry = new THREE.TubeGeometry(
      curve,
      tubeTubularSegments,
      tubeRadius,
      tubeRadialSegments,
      tubeClosed,
    )
    const material = new THREE.MeshBasicMaterial({
      color: tubeColor,
      wireframe: false,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geometry, material)

    resolve(mesh)
  })
}

const loadCurveFromJSON = async (
  curveProps: CurveProps,
): Promise<CurvePath> => {
  const curve = await createCurveFromJSON(curveProps)
  const curveTubeMesh = await getTubeFromCurve(curve, curveProps)

  const curveAndMesh = {
    curve,
    mesh: curveTubeMesh,
  }

  return curveAndMesh
}

export default loadCurveFromJSON
