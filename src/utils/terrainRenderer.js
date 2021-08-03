import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Import utils
import { loadTerrainTextures, loadFile } from 'Utils/renderUtils'
// Import types
import { MAPPING_TYPES } from 'Types'
// Import constants
import {
  TERRAIN_VERTEX_SHADER_PATH,
  TERRAIN_FRAGMENT_SHADER_PATH,
  DEFAULT_SETTINGS,
} from 'Constants'

class TerrainRenderer {
  constructor(container) {
    this.container = container // Parent node of canvas
    this.width = container.offsetWidth // Container width
    this.height = container.offsetHeight // Container height
    this.aspect = this.width / this.height // Camera aspect
    this.ratio = window.devicePixelRatio // Display ratio
    this.disposed = false // Flag for disposal. If true stop rendering and dispose gpu consumers

    this.terrainBumpTexture = null // Bump texture
    this.terrainDiffuseTexture = null // Diffuse texture
    this.terrainSize = 256 // Terrain size. (Same as the size of mapbox tile)
    this.terrainSegment = 128 // Terrain segment.

    this.init()
  }

  /**
   * Initialize all setups
   */
  init = async () => {
    this.rendererSetup()
    this.sceneSetup()
    this.cameraSetup()
    this.lightSetup()
    this.eventSetup()
    await this.assetLoad() // Here load frag&vert shaders from external files
    this.meshSetup()
    this.tick()
  }

  /**
   * Setup renderer and append to dom
   */
  rendererSetup = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(this.ratio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * Setup scene
   */
  sceneSetup = () => {
    this.scene = new THREE.Scene()
  }

  /**
   * Setup camera, add controls
   */
  cameraSetup = () => {
    this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000)
    this.camera.position.set(0, 150, 150)

    this.scene.add(this.camera)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  /**
   * Setup all lights
   */
  lightSetup = () => {
    const ambLight = new THREE.AmbientLight(0x808080)
    this.scene.add(ambLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.35)
    this.scene.add(dirLight)
  }

  /**
   * Setup event listener
   */
  eventSetup = () => {
    window.addEventListener('resize', this.onWindowResize, false)
  }

  /**
   * Resize event listener
   */
  onWindowResize = () => {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.aspect = this.width / this.height

    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.aspect

    this.camera.updateProjectionMatrix()
  }

  /**
   * Load assets (Here only loads frag&vert shaders)
   */
  assetLoad = async () => {
    const promises = [loadFile(TERRAIN_VERTEX_SHADER_PATH), loadFile(TERRAIN_FRAGMENT_SHADER_PATH)]

    try {
      const [vertexShader, fragmentShader] = await Promise.all(promises)

      this.vertexShader = vertexShader
      this.fragmentShader = fragmentShader
    } catch (error) {
      throw new Error(`Fetching shaders failed ${error}`)
    }
  }

  /**
   * Setup all meshes, models
   */
  meshSetup = () => {
    this.terrainGeo = new THREE.PlaneBufferGeometry(
      this.terrainSize,
      this.terrainSize,
      this.terrainSegment,
      this.terrainSegment
    )
    this.uniforms = {
      bumpTexture: { type: 't', value: this.terrainBumpTexture },
      bumpScale: { type: 'f', value: 50.0 },
      diffuseTexture: { tyep: 't', value: this.terrainDiffuseTexture },
      gradientMapping: { type: 'b', value: true },
      textureMapping: { type: 'b', value: true },
    }
    const terrainMat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
    })

    const terrainMesh = new THREE.Mesh(this.terrainGeo, terrainMat)
    terrainMesh.rotateX(-Math.PI / 2)

    this.scene.add(terrainMesh)

    // Initially run updateTile with default settings
    this.updateTile(DEFAULT_SETTINGS)
  }

  /**
   * Update tile after applying settings
   */
  updateTile = async (settings) => {
    const { lat, lon, zoom, mapping } = settings

    // If settings coord and zoom have been changed, refetch textures
    if (this.settings?.lat !== lat || this.settings?.lon !== lon || this.settings?.zoom !== zoom) {
      const [terrainBumpTexture, terrainDiffuseTexture] = await Promise.all(
        loadTerrainTextures(lat, lon, zoom)
      )

      // First, dispose existing terrain textures
      this.disposeTextures()

      this.terrainBumpTexture = terrainBumpTexture
      this.terrainDiffuseTexture = terrainDiffuseTexture

      this.uniforms.bumpTexture.value = this.terrainBumpTexture
      this.uniforms.diffuseTexture.value = this.terrainDiffuseTexture
    }

    // If settings mapping has been changed, update mapping style
    if (this.settings?.mapping !== mapping) {
      if (mapping === MAPPING_TYPES.GRADIENT) {
        this.uniforms.gradientMapping.value = true
        this.uniforms.textureMapping.value = false
      } else if (mapping === MAPPING_TYPES.TEXTURE) {
        this.uniforms.gradientMapping.value = false
        this.uniforms.textureMapping.value = true
      } else {
        this.uniforms.gradientMapping.value = true
        this.uniforms.textureMapping.value = true
      }
    }

    this.settings = settings
  }

  /**
   * Tick
   */
  tick = () => {
    // If disposed, cancel frame update
    if (this.disposed) {
      window.cancelAnimationFrame(this.requestID)

      return
    }

    this.render()
    this.controls.update()

    this.requestID = window.requestAnimationFrame(this.tick)
  }

  /**
   * Render scene per frame
   */
  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Set dispose flag as true. Remove all event listeners, dispose assets
   */
  dispose = () => {
    this.disposed = true
    // Dispose geometry
    this.terrainGeo?.dispose()
    // Dispose textures
    this.disposeTextures()
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize)
  }

  /**
   * Dispose textures
   */
  disposeTextures = () => {
    this.terrainBumpTexture?.dispose()
    this.terrainDiffuseTexture?.dispose()
  }
}

export default TerrainRenderer
