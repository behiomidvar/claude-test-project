// webpack's require.context, as provided by Remotion's bundler.
declare namespace NodeJS {
	interface Require {
		context(
			directory: string,
			recursive: boolean,
			regExp: RegExp,
		): {
			keys(): string[];
			(id: string): unknown;
		};
	}
}

declare module '*.css';
declare module '*.svg' {
	const url: string;
	export default url;
}
