# Expo Maps Tour: City Explorer

A small Expo + React Native code tour that turns an Ann Arbor city guide into an interactive map. The lessons cover a map region, data-driven markers, selection, map taps, overlays, camera controls, foreground location permission, and local search. The app keeps its data and UI local and uses explicit React state.

## Branches

- `main` is the student starter. The app launches to a useful static city guide; each lesson is a switch in `App.tsx`. Feature tests are intentionally red until the tour is completed. `npm run check-progress:report` reports which parts remain without failing.
- `complete` is the reference implementation with all switches enabled. It should pass `npm run verify`.

The progress checker parses active TypeScript/JSX with Babel. It does not count lesson headings or commented code as completed work. Main-branch CI should report progress and run infrastructure tests; complete-branch CI should run full verification.

## Student setup

```sh
git clone <repository-url>
cd maps-tour
npm ci
npx expo start
```

Open the project in Expo Go on an iOS or Android device, or use a simulator/emulator. This is a native-only tour: `react-native-maps` is supported on iOS and Android, not in a browser. Expo SDK 57 includes it in Expo Go, so a Google Cloud project and API key are not needed for the classroom Expo Go workflow.

The map and location packages were installed with `npx expo install react-native-maps expo-location` to match this Expo SDK. A clean checkout already has the resolved versions in `package-lock.json`; `npm ci` is all that is needed to install them.

The location permission copy is configured in `app.json`. Part 7 requests foreground permission only after tapping **My location**. If permission is denied or unavailable, the map and local place list remain usable.

## Optional Google Maps setup for custom native builds

Expo Go includes the map configuration needed for this tour. If you later build a standalone app that uses Google Maps, configure a restricted key and rebuild the native app:

1. Create a Google Cloud project and enable **Maps SDK for Android**. Enable **Maps SDK for iOS** only if you plan to use the Google provider on iOS instead of the default Apple Maps provider.
2. Create an API key restricted to the app package/bundle identifier and the matching Android SHA-1 certificate where applicable. Restrict the key to the map SDKs you enabled.
3. Copy `.env.example` to `.env`, then set `GOOGLE_MAPS_ANDROID_API_KEY` (and optionally `GOOGLE_MAPS_IOS_API_KEY`). `app.config.js` passes configured keys to the `react-native-maps` config plugin. `.env` is ignored by Git; keep real keys out of commits.
4. Create a development or production build; native config changes do not take effect in an already-installed binary.

These API keys are used by a client app, so restrictions and usage limits matter. Do not add service-account credentials or private keys to the app.

## The tour

Complete **Parts 1–8 in order**. Search for each `PART N — ...` heading in `App.tsx`. In every part, change exactly the named `LESSONS` property from `false` to `true`; the feature implementation is already present. Each part includes why it matters, a design question, what to enable, how to verify the result, and the next heading.

After each part, run:

```sh
npm run check-progress
npm test
```

1. Show a map centered on the city.
2. Render markers from the local places array.
3. Select a marker and show its details.
4. Tap the map to add a temporary pin and show its coordinates.
5. Draw a route and a tour boundary.
6. Control the camera to fit places or focus a result.
7. Request foreground permission and show the device location.
8. Search local place data and focus a result.

Part 8 builds on Parts 3 and 6: leave `selection` and `camera` enabled so a search result can show details and move the map. No feature needs to be disabled when moving to a later part.

## Tests and checks

```sh
npm run check-progress:report # report starter progress without failing
npm run test:infrastructure  # setup, docs, and progress-checker tests
npm run check-progress      # fail while a lesson is incomplete
npm test                    # feature and mocked service tests
npm run lint
npm run typecheck
npm run verify               # lint, typecheck, progress, and all tests
```

Unit tests mock `react-native-maps` and the location service. They make no map API requests and never read device location. Manually verify the live map and permission prompt on at least one iOS or Android device/emulator.
