const { relative, resolve, sep } = require("path");

const webpack = require("webpack");
const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { NativeScriptWorkerPlugin } = require("nativescript-worker-loader/NativeScriptWorkerPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const hashSalt = Date.now().toString();
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap((env) => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = [
        "tns-core-modules/ui/frame",
        "tns-core-modules/ui/frame/activity"
    ];

    const platform = env && ((env.android && "android") || (env.ios && "ios"));
    if (!platform) {
        throw new Error("You need to provide a target platform!");
    }

    const platforms = ["ios", "android"];
    const projectRoot = __dirname;

    // Default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));
    const appResourcesPlatformDir = platform === "android" ? "Android" : "iOS";

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file
        // when bundling with `tns run android|ios --bundle`.
        appPath = "app",
        appResourcesPath = "app/App_Resources",

        // You can provide the following flags when running 'tns run android|ios'
        snapshot, // --env.snapshot
        uglify, // --env.uglify
        report, // --env.report
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        hmr, // --env.hmr,
        unitTesting // --env.unitTesting
    } = env;

    const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
    const externals = nsWebpack.getConvertedExternals(env.externals);
    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
    const entryPath = `.${sep}${entryModule}.js`;
    const entries = { bundle: entryPath };

    if (platform === "ios") {
        entries["tns_modules/tns-core-modules/inspector_modules"] = "inspector_modules.js";
    }

    const sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

    const config = {
        mode: uglify ? "production" : "development",
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                "**/.*"
            ]
        },
        target: nativescriptTarget,
        entry: entries,
        output: {
            pathinfo: false,
            path: dist,
            sourceMapFilename,
            libraryTarget: "commonjs2",
            filename: "[name].js",
            globalObject: "global",
            hashSalt
        },
        resolve: {
            extensions: [".js", ".scss", ".css"],
            // Resolve {N} system modules from tns-core-modules
            modules: [
                "node_modules/tns-core-modules",
                "node_modules"
            ],
            alias: {
                "~": appFullPath
            },
            // don't resolve symlinks to symlinked modules
            symlinks: false
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false
        },
        node: {
            // Disable node shims that conflict with NativeScript
            "http": false,
            "timers": false,
            "setImmediate": false,
            "fs": "empty",
            "__dirname": false
        },
        // eslint-disable-next-line no-nested-ternary
        devtool: hiddenSourceMap ? "hidden-source-map" : (sourceMap ? "inline-source-map" : "none"),
        optimization:  {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: "styles",
                        test: /\.scss$/,
                        chunks: "all",
                        enforce: true
                    },
                    vendor: {
                        name: "vendor",
                        chunks: "all",
                        test: (module) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : "";
                            return (/[\\/]node_modules[\\/]/).test(moduleName) ||
                                    appComponents.some((comp) => comp === moduleName);

                        },
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            },
            minimize: !!uglify,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: isAnySourceMapEnabled,
                    terserOptions: {
                        output: {
                            comments: false,
                            semicolons: !isAnySourceMapEnabled
                        },
                        compress: {
                            // The Android SBG has problems parsing the output
                            // when these options are enabled
                            "collapse_vars": platform !== "android",
                            sequences: platform !== "android"
                        }
                    }
                })
            ]
        },
        module: {
            rules: [
                {
                    test: nsWebpack.getEntryPathRegExp(appFullPath, entryPath),
                    use: [
                        // Require all Android app components
                        platform === "android" && {
                            loader: "nativescript-dev-webpack/android-app-components-loader",
                            options: { modules: appComponents }
                        },

                        {
                            loader: "nativescript-dev-webpack/bundle-config-loader",
                            options: {
                                registerModules: /\.(xml|css|js|ts)$/,
                                loadCss: !snapshot, // load the application css if in debug mode
                                unitTesting,
                                appFullPath,
                                projectRoot
                            }
                        }
                    ].filter((loader) => !!loader)
                },

                {
                    test: /\.js$/,
                    use: [
                        "cache-loader",
                        "nativescript-dev-webpack/script-hot-loader"
                    ]
                },

                {
                    test: /\.(html|xml)$/,
                    use: [
                        "cache-loader",
                        "nativescript-dev-webpack/markup-hot-loader",
                        "nativescript-dev-webpack/xml-namespace-loader"
                    ]
                },
                {
                    test: /\.s?css$/,
                    use: [
                        "cache-loader",
                        "nativescript-dev-webpack/style-hot-loader",
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require("postcss-custom-properties")({
                                        preserve: false
                                    })
                                ]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("dart-sass")
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            //new webpack.debug.ProfilingPlugin(),

            // Define useful constants like TNS_WEBPACK
            new webpack.DefinePlugin({
                "global.TNS_WEBPACK": "true",
                "process": undefined
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin([`${dist}/**/*`]),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([
                { from: { glob: "assets/**" } },
                { from: { glob: "fonts/**" } },
                { from: { glob: "**/*.jpg" } },
                { from: { glob: "**/*.png" } }
            ], {
                ignore: [
                    `${relative(appPath, appResourcesFullPath)}/**`,
                    "assets/fonts/**"
                ]
            }),
            new CopyWebpackPlugin([
                {
                    from: {
                        glob: "assets/fonts/**"
                    },
                    to: "fonts/",
                    flatten: true
                }
            ]),
            // Generate a bundle starter script and activate it in package.json
            new nsWebpack.GenerateBundleStarterPlugin(
                // Don't include `runtime.js` when creating a snapshot. The plugin
                // configures the WebPack runtime to be generated inside the snapshot
                // module and no `runtime.js` module exist.
                (snapshot ? [] : ["./runtime"])
                .concat([
                    "./vendor",
                    "./bundle",
                    "./styles"
              ])
            ),
            // For instructions on how to set up workers with webpack
            // check out https://github.com/nativescript/worker-loader
            new NativeScriptWorkerPlugin(),
            new nsWebpack.PlatformFSPlugin({
                platform,
                platforms
            }),
            // Does IPC communication with the {N} CLI to notify events when running in watch mode.
            new nsWebpack.WatchStateLoggerPlugin()
        ]
    };

    // Copy the native app resources to the out dir
    // only if doing a full build (tns run/build) and not previewing (tns preview)
    if (!externals || externals.length === 0) {
        config.plugins.push(new CopyWebpackPlugin([
            {
                from: `${appResourcesFullPath}/${appResourcesPlatformDir}`,
                to: `${dist}/App_Resources/${appResourcesPlatformDir}`,
                context: projectRoot
            }
        ]));
    }

    if (report) {
        // Generate report files for bundles content
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            generateStatsFile: true,
            reportFilename: resolve(projectRoot, "report", "report.html"),
            statsFilename: resolve(projectRoot, "report", "stats.json")
        }));
    }

    if (snapshot) {
        config.plugins.push(new nsWebpack.NativeScriptSnapshotPlugin({
            chunk: "vendor",
            requireModules: [
                "tns-core-modules/bundle-entry-points"
            ],
            projectRoot,
            webpackConfig: config
        }));
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }


    return config;
});
