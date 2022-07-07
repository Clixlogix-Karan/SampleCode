module.exports = {
  reactStrictMode: true,
  target: "serverless",
  distDir: 'out/',
  resolve: {
    fallback: {
      "fs": false
    },
  },
  images: {
    domains: ['nft-user.netlify.app','ipfs.infura.io','cms-runing-worldcup.s3-us-east-2.amazonaws.com','smallbiztrends.com','nft-paltform.s3.us-west-1.amazonaws.com','www.metamastersmedia.io'],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^electron$/
    }));
    return config
  }
}
