import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

export default [
    {
        input: pkg.source,
        external: Object.keys(pkg.dependencies || {}),
        output: [
            {
                name: 'niceformHook',
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
                compact: true
            },
            {
                name: 'niceformHook',
                file: pkg.module,
                format: 'esm',
                sourcemap: true,
                exports: 'named',
                compact: true
            }
        ],
        plugins: [
            resolve(),
            PeerDepsExternalPlugin(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            terser({
                output: { comments: false },
                compress: {
                  drop_console: true,
                },
            })
        ]
    }
]