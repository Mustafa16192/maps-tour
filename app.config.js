module.exports = ({ config }) => {
  const mapsOptions = {};
  const androidApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY
    || process.env.GOOGLE_MAPS_ANDROID_API_KEY;
  const iosApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY
    || process.env.GOOGLE_MAPS_IOS_API_KEY;

  if (androidApiKey) {
    mapsOptions.androidGoogleMapsApiKey = androidApiKey;
  }
  if (iosApiKey) {
    mapsOptions.iosGoogleMapsApiKey = iosApiKey;
  }

  return {
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      ...(Object.keys(mapsOptions).length > 0 ? [['react-native-maps', mapsOptions]] : []),
    ],
  };
};
