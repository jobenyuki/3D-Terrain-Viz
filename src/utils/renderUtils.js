import * as THREE from 'three'
import { pointToTile } from '@mapbox/tilebelt'
// Import constants
import {
  MAPBOX_TERRAIN_API_HOST,
  MAPBOX_SATELLITE_API_HOST,
  MAPBOX_TOKEN,
  DEFAULT_SETTINGS,
} from 'Constants'

// Load mapbox tile as canvas texture
export const loadTerrainTextures = (
  lat = DEFAULT_SETTINGS.lat,
  lon = DEFAULT_SETTINGS.lon,
  zoom = DEFAULT_SETTINGS.zoom
) => {
  const tiles = pointToTile(lon, lat, zoom)
  const terrainTileSrc = `${MAPBOX_TERRAIN_API_HOST}/${zoom}/${tiles[0]}/${tiles[1]}.pngraw?access_token=${MAPBOX_TOKEN}`
  const satelliteTileSrc = `${MAPBOX_SATELLITE_API_HOST}/${zoom}/${tiles[0]}/${tiles[1]}.jpg90?access_token=${MAPBOX_TOKEN}`

  return [loadTexture(terrainTileSrc), loadTexture(satelliteTileSrc)]
}

// Load texture
export const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader()

    loader.load(
      path,
      (texture) => resolve(texture),
      null,
      (error) => reject(error)
    )
  })
}

// Load file
export const loadFile = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.FileLoader()

    loader.load(
      path,
      (data) => resolve(data),
      null,
      (error) => reject(error)
    )
  })
}
