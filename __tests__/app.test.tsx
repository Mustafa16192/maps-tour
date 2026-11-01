import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { PLACES } from '../src/data/places';
import { getCurrentCoordinates } from '../src/services/locationService';

jest.mock('../src/services/locationService', () => ({ getCurrentCoordinates: jest.fn() }));
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
jest.mock('react-native-maps', () => {
  const ReactNative = require('react-native');
  const ReactModule = require('react');
  const fitToCoordinates = jest.fn();
  const animateToRegion = jest.fn();
  const MapView = ReactModule.forwardRef(({ children, ...props }, ref) => {
    ReactModule.useImperativeHandle(ref, () => ({ fitToCoordinates, animateToRegion }));
    return ReactModule.createElement(ReactNative.View, { ...props, testID: props.testID || 'city-map' }, children);
  });
  const Marker = props => ReactModule.createElement(ReactNative.Pressable, {
    accessibilityLabel: props.accessibilityLabel || props.title,
    accessibilityRole: 'button',
    onPress: props.onPress,
    testID: props.testID,
  });
  const Overlay = ({ testID }) => ReactModule.createElement(ReactNative.View, { testID });
  return {
    __esModule: true,
    default: MapView,
    Marker,
    Polygon: Overlay,
    Polyline: Overlay,
    __mapMock: { fitToCoordinates, animateToRegion },
  };
});

const locationMock = jest.mocked(getCurrentCoordinates);

function requireLesson(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

beforeEach(() => {
  jest.clearAllMocks();
  locationMock.mockResolvedValue({
    status: 'granted',
    coordinate: { latitude: 42.28, longitude: -83.74 },
  });
});

test('PART 1 missing behavior: render the interactive map centered on the tour region', async () => {
  const screen = await render(<App />);
  requireLesson(screen.queryByTestId('city-map') !== null, 'PART 1 missing behavior: enable the MapView at the tour region.');
});

test('PART 2 missing behavior: show one marker for every place', async () => {
  const screen = await render(<App />);
  const markers = screen.queryAllByTestId(/^place-marker-/);
  requireLesson(markers.length === PLACES.length, 'PART 2 missing behavior: render a marker for every visible place.');
});

test('PART 3 missing behavior: show details when a marker is selected', async () => {
  const screen = await render(<App />);
  const marker = screen.queryByLabelText('University of Michigan Diag');
  requireLesson(marker !== null, 'PART 3 missing behavior: add selectable place markers.');
  await fireEvent.press(marker!);
  requireLesson(screen.queryByTestId('selected-place-card') !== null, 'PART 3 missing behavior: show the selected place details.');
});

test('PART 4 missing behavior: tapping the map drops a pin and shows its coordinate', async () => {
  const screen = await render(<App />);
  const map = screen.queryByTestId('city-map');
  requireLesson(map !== null, 'PART 4 missing behavior: enable the map before adding its tap handler.');
  await fireEvent.press(map!, { nativeEvent: { coordinate: { latitude: 42.281, longitude: -83.739 } } });
  requireLesson(screen.queryByTestId('dropped-pin-coordinate') !== null, 'PART 4 missing behavior: render a temporary pin and its tapped coordinate.');
  expect(screen.getByText('Dropped pin: 42.2810, -83.7390')).toBeTruthy();
});

test('PART 5 missing behavior: draw the route and tour boundary', async () => {
  const screen = await render(<App />);
  requireLesson(
    screen.queryByTestId('city-route') !== null && screen.queryByTestId('tour-boundary') !== null,
    'PART 5 missing behavior: show both the route polyline and boundary polygon.',
  );
});

test('PART 6 missing behavior: fit the camera to all places', async () => {
  const screen = await render(<App />);
  const button = screen.queryByRole('button', { name: 'Fit all places' });
  requireLesson(button !== null, 'PART 6 missing behavior: add the fit-all camera control.');
  await act(async () => {
    fireEvent.press(button!);
  });
  const mapMock = jest.requireMock('react-native-maps').__mapMock;
  expect(mapMock.fitToCoordinates).toHaveBeenCalledWith(
    PLACES.map(place => place.coordinate),
    expect.objectContaining({ animated: true }),
  );
});

test('PART 7 missing behavior: request foreground location and show the result', async () => {
  const screen = await render(<App />);
  const button = screen.queryByRole('button', { name: 'My location' });
  requireLesson(button !== null, 'PART 7 missing behavior: provide an explicit My location action.');
  await act(async () => {
    fireEvent.press(button!);
  });
  await waitFor(() => expect(locationMock).toHaveBeenCalledTimes(1));
  expect(screen.getByText('Current position: 42.2800, -83.7400')).toBeTruthy();
});

test('PART 7 missing behavior: explain denied permission while keeping the guide usable', async () => {
  locationMock.mockResolvedValueOnce({ status: 'denied' });
  const screen = await render(<App />);
  const button = screen.queryByRole('button', { name: 'My location' });
  requireLesson(button !== null, 'PART 7 missing behavior: provide an explicit My location action.');
  await act(async () => {
    fireEvent.press(button!);
  });
  expect(screen.getByText('Location permission was not granted. You can still explore the map.')).toBeTruthy();
});

test('PART 8 missing behavior: filter places and focus a selected search result', async () => {
  const screen = await render(<App />);
  const search = screen.queryByLabelText('Search places');
  requireLesson(search !== null, 'PART 8 missing behavior: add a place search field.');
  await fireEvent.changeText(search!, 'park');
  expect(screen.getByText('1 place')).toBeTruthy();
  await fireEvent.changeText(search!, 'arboretum');
  const result = screen.queryByTestId('place-card-nichols-arboretum');
  requireLesson(result !== null, 'PART 8 missing behavior: include place names in search results.');
  await fireEvent.press(result!);
  expect(screen.getByTestId('selected-place-card')).toBeTruthy();
  expect(screen.getByText('Focused on Nichols Arboretum')).toBeTruthy();
  const mapMock = jest.requireMock('react-native-maps').__mapMock;
  expect(mapMock.animateToRegion).toHaveBeenCalledWith(
    expect.objectContaining({ latitude: 42.2858, longitude: -83.7189 }),
    450,
  );
});
