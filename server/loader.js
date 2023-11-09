import { resolve as resolveTs, getFormat, transformSource } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, context, defaultResolver) {
	const mappedSpecifier = matchPath(specifier);
	if (mappedSpecifier) {
		specifier = `${mappedSpecifier}.js`;
	}
	return resolveTs(specifier, context, defaultResolver);
}

export { transformSource, load } from 'ts-node/esm';
