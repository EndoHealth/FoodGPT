module.exports = {
	apps: [
		{
			name: 'server',
			script: 'src/index.ts',
			instance: 'max',
			exec_mode: 'fork',
			interpreter: 'node',
			interpreter_args:
				'-r tsconfig-paths/register --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts',
		},
	],
};
