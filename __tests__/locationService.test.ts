import * as Location from 'expo-location';
import { getCurrentCoordinates } from '../src/services/locationService';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

const requestPermission = jest.mocked(Location.requestForegroundPermissionsAsync);
const getPosition = jest.mocked(Location.getCurrentPositionAsync);

beforeEach(() => jest.clearAllMocks());

test('returns coordinates after foreground permission is granted', async () => {
  requestPermission.mockResolvedValue({ status: 'granted' } as Location.LocationPermissionResponse);
  getPosition.mockResolvedValue({
    coords: { latitude: 42.28, longitude: -83.74 },
  } as Location.LocationObject);

  await expect(getCurrentCoordinates()).resolves.toEqual({
    status: 'granted',
    coordinate: { latitude: 42.28, longitude: -83.74 },
  });
  expect(getPosition).toHaveBeenCalledTimes(1);
});

test('does not read the position when foreground permission is denied', async () => {
  requestPermission.mockResolvedValue({ status: 'denied' } as Location.LocationPermissionResponse);

  await expect(getCurrentCoordinates()).resolves.toEqual({ status: 'denied' });
  expect(getPosition).not.toHaveBeenCalled();
});
