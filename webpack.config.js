require('dotenv').config({ path: __dirname + '/.env' });
//.envの設定
const config = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VUE_APP_applicationId: JSON.stringify(process.env.VUE_APP_applicationId)
       
      }
    })
  ]
};
