const CracoLess = require('craco-less');
const CracoAntDesign = require('craco-antd');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { whenDev, whenProd, whenTest } = require('@craco/craco');
const px2rem = require('postcss-px2rem-exclude')
// // postcss配置
// {
//     plugin: require('postcss-px2rem-exclude'),
//     options: {
//         remUnit: 75, //设计图大小
//         remPrecision: 2, //只转换到两位小数
//         exclude: /node_modules/i //插件不需要转rem
//     }
// },
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
module.exports = {
    style: {
        // postcss配置
        postcss: {
            loaderOptions: {
                ident: 'postcss',
                plugins: () => [
                    px2rem({
                        remUnit: 41, //设计图大小
                        remPrecision: 2, //只转换到两位小数
                        // baseDpr: 2,
                        exclude: /node_modules/i //插件不需要转rem
                    })
                ]
            }
        }
    },
    plugins: [
        // 针对Less的相关配置（如module样式）
        {
        plugin: CracoLess,
        options: {
            lessLoaderOptions: {
            lessOptions: { javascriptEnabled: true },
            },
            modifyLessRule: function() {
            return {
                test: /\.module\.less$/,
                exclude: /node_modules/,
                use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                    modules: {
                        localIdentName: '[local]_[hash:base64:6]',
                    },
                    },
                },
                { loader: 'less-loader' },
                ],
            };
            },
        },
        },
        // `Ant Design`相关配置
        {
        plugin: CracoAntDesign,
        options: {
            customizeThemeLessPath: path.join(
            __dirname,
            'src/antd.customize.less',
            ),
        },
        },
        // 打包配置
        {
            plugin: {
                ...whenProd(() => [
                    new TerserPlugin({
                        terserOptions: {
                        ecma: undefined,
                        parse: {},
                        compress: {
                            warnings: false,
                            drop_console: true, // 生产环境下移除控制台所有的内容
                            drop_debugger: true, // 移除断点
                            pure_funcs: ['console.log'] // 生产环境下移除console
                        }
                    }
                })])
            }
        }
    ],
    webpack: {
        alias: {
        '@com': pathResolve('src/components'),
        '@': pathResolve('src'),
        }
    },
};