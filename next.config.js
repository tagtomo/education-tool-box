module.exports = {
  images: {
    // domains: ['unsplash.it'],
    loader: "imgix",
    path: "",
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}