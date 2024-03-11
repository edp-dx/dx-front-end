declare module '*.json';
declare module '*.webp';
declare module '*.png';
declare module '*.svg';
declare module '*.d.ts';

declare interface ObjectConstructor {
	deepExtend<T, D>(destination: T, source: D): T & D;
}
