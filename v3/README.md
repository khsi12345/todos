# 1. Back-end Set-up

## 1.1 MongoDB Install

- [mLab Hosting service](http://poiemaweb.com/mongdb-basics#43-mlab-hosting-service)

## 1.2 Dependency

- express@4.16.2
- body-parser@1.18.2
- dotenv@5.0.1
- mongoose@5.0.8
- nodemon@1.17.1

```bash
$ npm install nodemon -g
$ cd <project>
$ npm init --yes
$ npm install express body-parser dotenv mongoose
```

## 1.3 Configuration

.env

```bash
# port number
PORT=4500
# MongoDB URI & User/Password
MONGO_URI=mongodb://localhost/<db-name>
# mlab의 경우
# MONGO_URI=mongodb://<userid>:<password>@<database>:<port>/<db-name>
```

package.json

```json
  ...
  "scripts": {
    "start": "nodemon server.js"
  },
```

## 1.4 디렉터리 구조

```bash
Project/
├── models/
│   └── todo.js
├── routes/
│   └── todos.js
├── .env
├── server.js
└── pakage.json
```

## 1.5 APIs

### 1.5.1 Find All

```
GET /todos
```

### 1.5.2 Create new todo document

```
POST /todos

{
	"id": <number>,
	"content": <string>,
	"completed": <boolean>
}
```

### 1.5.3 Update All

```
PATCH /todos

{
	"completed": <boolean>
}
```

### 1.5.4 Update by id

```
PATCH /todos/:id

{
	"completed": <boolean>
}
```

### 1.5.5 Delete by id

```
DELETE /todos/:id
```

### 1.5.6 Delete by completed

```
DELETE /todos/completed
```

## 1.6 Serve

```bash
$ npm start
```

# 2. Front-end Set-up

## 2.1 Dependency

- babel
  - babel-cli@6.26.0
  - babel-preset-env@1.6.1
  - babel-polyfill@6.26.0
- Webpack
  - babel-loader@7.1.3
  - css-loader@0.28.10
  - style-loader@0.20.2
  - file-loader@1.1.11
  - sass-loader@6.0.7
  - extract-text-webpack-plugin@4.0.0-beta.0
    (* webpack V4에서 3.0.2 사용시 빌드 에러 발생: https://github.com/webpack/webpack/issues/6568)
  - webpack@4.1.0
  - webpack-cli@2.0.1
- Sass
  - node-sass@4.7.2
- axios@0.18.0

```bash
# babel
$ npm install babel-cli babel-preset-env --save-dev
# polyfill은 소스코드 이전에 실행되어야 한다. 따라서 devDependency가 아닌 dependency로 설치하여야 한다.
# polyfill 적용: js entry point의 가장 선두에 import 또는 webpack.config.js의 bundle 프로퍼티에 추가
$ npm install babel-polyfill

# webpack & friends
$ npm install webpack webpack-cli babel-loader node-sass css-loader sass-loader style-loader file-loader extract-text-webpack-plugin@next --save-dev

# axios
$ npm install axios
```

## 2.2 Configuration

webpack.config.js

```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/js/app.js', './src/sass/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader?outputStyle=expanded']
        }),
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // css내의 path: publicPath + outputPath => ../assets/fonts/
              publicPath: '../',
              outputPath: 'assets/fonts/'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/[name].bundle.css',
      allChunks: true
    })
  ],
  devtool: 'source-map'
};
```

package.json

```json
  ...
  "scripts": {
    "start": "nodemon server.js",
    "build": "webpack -w"
  },
```

## 2.3 디렉터리 구조

```bash
Project/
├── models/
│   └── todo.js
├── routes/
│   └── todos.js
├── src
│   ├── js
│   │   └── app.js
│   ├── sass
│   │   ├── partial/
│   │   └── style.scss
│   └── index.html
├── .env
├── pakage.json
├── server.js
└── webpack.config.js
```

## 2.4 axios을 사용한 API 호출

- [axios](https://github.com/axios/axios)

```javascript
// GET ALL
axios.get('/todos')
  .then(({ data }) => console.log(data)) // res.data에 결과가 담겨있다.
  .catch(err => console.log(err.response));

// POST
axios.post('/todos', payload) // payload: { id, content, completed }
  .then(() => console.log('Add todo'))
  .catch(err => console.log(err.response));

// PATCH
axios.patch(`/todos/${id}`, payload) // payload: { completed }
  .then(() => console.log('Patch todo by id', id))
  .catch(err => console.log(err.response));

// PATCH ALL
axios.patch('/todos', payload) // payload: { completed }
  .then(() => console.log('Patch all todo'))
  .catch(err => console.log(err.response));

// DELETE
axios.delete(`/todos/${id}`)
  .then(() => console.log('Delete todo by id', id))
  .catch(err => console.log(err.response));

// DELETE Completed All
axios.delete('/todos/completed')
  .then(() => console.log('Delete all completed todo'))
  .catch(err => console.log(err.response));
```

## 2.5 Build

```bash
$ npm run build
```

- [http://localhost:4500](http://localhost:4500)
