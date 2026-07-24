import type { RoutePreference } from '../types/route'

export const scenicSpots: Record<Exclude<RoutePreference, 'fastest'>, string> = {
  waterfront: '豊洲ぐるり公園',
  green: '有明テニスの森',
  cherry: 'シンボルプロムナード公園',
}