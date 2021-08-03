import { MAPPING_TYPES } from 'Types'

export const DEFAULT_SETTINGS = {
  lat: 27.986065,
  lon: 86.922623,
  zoom: 2,
  mapping: MAPPING_TYPES.TEXTURE,
}

export const MAPPING_OPTIONS = [
  {
    label: 'Gradient',
    value: MAPPING_TYPES.GRADIENT,
  },
  {
    label: 'Texture',
    value: MAPPING_TYPES.TEXTURE,
  },
  {
    label: 'Both',
    value: MAPPING_TYPES.BOTH,
  },
]

export const TERRAIN_VERTEX_SHADER_PATH = 'src/shaders/terrain/vertex.glsl'

export const TERRAIN_FRAGMENT_SHADER_PATH = 'src/shaders/terrain/fragment.glsl'

export const MAPBOX_TERRAIN_API_HOST = 'https://api.mapbox.com/v4/mapbox.terrain-rgb'

export const MAPBOX_SATELLITE_API_HOST = 'https://api.mapbox.com/v4/mapbox.satellite'

export const MAPBOX_TOKEN =
  'pk.eyJ1Ijoiam9iZW55dWtpIiwiYSI6ImNrcnYxMjEycDAyODIycHJ2MGExZ2xrNGIifQ.XT4UOZq2oruZLehDZ_43VA'
