export type Place = {
  id: string;
  name: string;
  category: string;
  address: string;
  description: string;
  coordinate: { latitude: number; longitude: number };
};

export const PLACES: Place[] = [
  {
    id: 'mission-dolores',
    name: 'Mission Dolores Park',
    category: 'Park',
    address: '19th and Dolores St',
    description: 'A sunny neighborhood park with a view of the city.',
    coordinate: { latitude: 37.7596, longitude: -122.4269 },
  },
  {
    id: 'ferry-building',
    name: 'Ferry Building',
    category: 'Market',
    address: '1 Ferry Building',
    description: 'A waterfront landmark filled with local food makers.',
    coordinate: { latitude: 37.7955, longitude: -122.3937 },
  },
  {
    id: 'painted-ladies',
    name: 'Painted Ladies',
    category: 'Landmark',
    address: '700 Steiner St',
    description: 'A colorful row of Victorian homes beside Alamo Square.',
    coordinate: { latitude: 37.7761, longitude: -122.4328 },
  },
  {
    id: 'japantown-peace-plaza',
    name: 'Peace Plaza',
    category: 'Plaza',
    address: '1610 Geary Blvd',
    description: 'A compact plaza at the center of Japantown.',
    coordinate: { latitude: 37.7854, longitude: -122.4294 },
  },
];

export const ROUTE = [
  PLACES[0].coordinate,
  { latitude: 37.7715, longitude: -122.4188 },
  PLACES[2].coordinate,
];

export const TOUR_BOUNDARY = [
  { latitude: 37.751, longitude: -122.438 },
  { latitude: 37.802, longitude: -122.438 },
  { latitude: 37.802, longitude: -122.386 },
  { latitude: 37.751, longitude: -122.386 },
];
