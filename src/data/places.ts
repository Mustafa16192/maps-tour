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
    id: 'umich-diag',
    name: 'University of Michigan Diag',
    category: 'Campus',
    address: 'Central Campus, University of Michigan',
    description: 'The campus crossroads where students meet between classes.',
    coordinate: { latitude: 42.278, longitude: -83.7382 },
  },
  {
    id: 'michigan-theater',
    name: 'Michigan Theater',
    category: 'Theater',
    address: '603 E Liberty St',
    description: 'A historic downtown movie palace and performing arts venue.',
    coordinate: { latitude: 42.2808, longitude: -83.7482 },
  },
  {
    id: 'zingermans-deli',
    name: "Zingerman's Delicatessen",
    category: 'Deli',
    address: '422 Detroit St',
    description: 'A much-loved Ann Arbor deli in the historic Kerrytown district.',
    coordinate: { latitude: 42.2847, longitude: -83.7455 },
  },
  {
    id: 'nichols-arboretum',
    name: 'Nichols Arboretum',
    category: 'Park',
    address: '1610 Washington Heights',
    description: 'A riverside botanical garden with wooded trails and open lawns.',
    coordinate: { latitude: 42.2858, longitude: -83.7189 },
  },
];

export const ROUTE = [
  PLACES[0].coordinate,
  { latitude: 42.2817, longitude: -83.7295 },
  PLACES[3].coordinate,
];

export const TOUR_BOUNDARY = [
  { latitude: 42.27, longitude: -83.755 },
  { latitude: 42.292, longitude: -83.755 },
  { latitude: 42.292, longitude: -83.715 },
  { latitude: 42.27, longitude: -83.715 },
];
