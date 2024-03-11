declare module '*.json';
declare module '*.webp';
declare module '*.svg';
declare module '*.png';

declare interface ObjectConstructor {
	deepExtend<T, D>(destination: T, source: D): T & D;
}
