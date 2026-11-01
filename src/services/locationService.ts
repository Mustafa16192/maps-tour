import * as Location from 'expo-location';

export type CurrentCoordinatesResult =
  | { status: 'granted'; coordinate: { latitude: number; longitude: number } }
  | { status: 'denied' };

export async function getCurrentCoordinates(): Promise<CurrentCoordinatesResult> {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== 'granted') return { status: 'denied' };

  const position = await Location.getCurrentPositionAsync({});
  return {
    status: 'granted',
    coordinate: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    },
  };
}
