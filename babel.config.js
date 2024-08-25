module.exports = function async(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@app/api': './src/api',
            '@app/assets': './src/assets',
            '@app/components': './src/components',
            '@app/constants': './src/constants',
            '@app/context': './src/context',
            '@app/hooks': './src/hooks',
            '@app/lang': './src/lang',
            '@app/layout': './src/layout',
            '@app/lib': './src/lib',
            '@app/navigation': './src/navigation',
            '@app/screens': './src/screens',
            '@app/store': './src/store',
            '@app/styles': './src/styles',
            '@app/types': './src/types',
            '@app/utils': './src/utils',
          },
        },
      ],
    ],
  };
};
