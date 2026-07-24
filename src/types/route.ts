export type RoutePreference = 'fastest' | 'waterfront' | 'green' | 'cherry'

export type RouteOption = {
  id: string
  title: string
  minutes: number
  distanceKm: number
  via?: string
  description: string
}