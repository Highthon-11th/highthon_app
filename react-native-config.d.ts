declare module 'react-native-config' {
  export interface NativeConfig {
    //TODO: Add config variables here
    PUBLIC_API_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
