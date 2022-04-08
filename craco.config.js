const CracoLess = require('craco-less');
const CracoAntDesign = require('craco-antd');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { whenDev, whenProd, whenTest } = require('@craco/craco');
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
module.exports = {
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