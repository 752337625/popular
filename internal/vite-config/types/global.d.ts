declare global {
  declare type Recordable<T = any> = Record<string, T>;
  declare type Nullable<T> = T | null;
  declare interface ViteEnv {
    readonly VITE_DEFAULT_VERSION_UPDATE_KEY: string;
    readonly VITE_PORT: number;
    readonly VITE_BASE_URL: string;
    readonly VITE_ROUTER_History: 'Web' | 'Hash';
    readonly VITE_DEFAULT_LYRICS_KEY: string;
    readonly VITE_DEFAULT_LOCALE_KEY: string;
    readonly VITE_DEFAULT_PLAYLIST_KEY: string;
    readonly VITE_DEFAULT_PLAYINDEX_KEY: string;
    readonly VITE_DEFAULT_THEME_KEY: string;
    readonly VITE_PUBLIC_PATH: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_GLOB_APP_TITLE: string;
    readonly VITE_GLOB_APP_SHORT_NAME: string;
    readonly VITE_DEFAULT_CACHE_TIME: string;
    readonly VITE_DEFAULT_CACHE_KEY: string;
    readonly VITE_PUBLIC_DIR: string;
    readonly VITE_USE_PWA: boolean;
    readonly VITE_BUILD_COMPRESS: boolean;
    readonly VITE_BUILD_COMPRESS_TYPE: 'gzip' | 'brotli' | 'none';
    readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    readonly VITE_USE_LEGACY: boolean;
    readonly VITE_USE_IMAGEMIN: boolean;
    readonly VITE_SETUP_EXTEND: boolean;
    readonly VITE_USE_MOCK: boolean;
    readonly VITE_GLOB_API_URL: string;
    readonly VITE_GLOB_UPLOAD_URL: string;
  }
}

export {};
