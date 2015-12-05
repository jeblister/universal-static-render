---
layout: post
title:  "Creating Static, Universal Websites with React"
excerpt_separator: <!--more-->
author: Mohamed JEBLI
date: 2015-12-05
published: false
categories: react
---
Shared a JavaScript project for static websites that runs on both the client & server.

Using webpack to render a website statically, and react-router to switch between pages dynamically all the code use ES6.
<!--more-->

### What is Universal JavaScript ?

Shared a JavaScript project for static websites that runs on both the client & server.

#### What's the point?

Many web applications today are written with JavaScript driven MVCs Framework (angular, ember, backbone, etc.) and use a single `index.html` page.

This is great for web applications. you get fast switching between routes (no HTML is reloaded).

However, when render on DOM load, this can be really slow,  can make for a bad user experience and when building more traditional (ex. static) websites that consist of many static pages, this presents a few problems :

- A major problem is with Search engine bolts (they don't load javascript), then the javascript files  aren't indexable by search engines. If your app is serving any kind of data that people might be searching for, **this is a bad thing**.

- You can't use the awesome github pages tool. You can't configure the server on github pages to always serve the root index.html. You'll need to create a static website instead.

When you rendering Static Websites and use a server-side approach (render JavaScript on the server side) you use `Universal Javascript` and solve these problems with some benefits.

#### Universal Javascript Benefits:

-   Better overall user experience
-   Search engine indexable
-   Easier code maintenance
-   Free progressive enhancements

I've built a live example of static website Universal JS for you to check out here: <https://github.com/jeblister/universal-static-render.git>

The demo uses the a project source structure like this :
```
/project
  /build
  /scss
  /components
      Header.jsx
      Root.jx
  /pages
      Home.jsx
      About.jsx
      Index.jsx
  entry.js
  data.js
  Routes.jsx
  webpack.config.js
```
and the static output should be like this :
```
/project
  /build
    /about
      index.html
    /home
      home.html
    index.html
    bundle.js
    style.css
```
to show how you can have apps for static pages and posts indexed by search engines and thus easier to find by potential users in search engines.

### Setup

First, let's install some dependencies :

~~~
// Make sure to include the babel-core we will use ES6
$ npm i --save-dev webpack webpack-dev-server react react-router static-site-generator-webpack-plugin babel-core babel-loader css-laoder extract-text-webpack-plugin node-libs-browser node-sass sass-loader style-loader
~~~
> We're using Babel 5 here for now as babel-plugin-react-transform still needs to receive its Babel 6 fixes. The configuration will change considerably with Babel 6!

### Webpack

Let's take a look at our webpack config.

```

// webpack.config.js
// requite a plugin to provide a series of paths to be rendered.
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
// The ExtractTextPlugin moves every require("style.css") in entry chunks into a separate css output file.
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// data is a custum configuration librery to store routes , title ...
var data = require('./data')

module.exports = {
  entry: {
      main: './entry.js' // our main javascript file

    },
  output: {
    filename: 'bundle.js',
    path: './build', // build directory
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.css$/, loaders: [ 'css' ] }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data),
    new ExtractTextPlugin('style.css')
  ],
  watch: true
}

```
The StaticSiteGeneratorPlugin will look at our 'entry' package to compile.

StaticSiteGeneratorPlugin expects 3 parameters, our package name (set above in entry), the paths we will eventually pass to React-Router, and a locals variable we can access in our rendering function.

Since we haven't set our locals variable yet, let's do that. Put the following code in the `data.js`.
```
// data.js
module.exports = {
  title: 'My Static Site',
  // Define the routes we want in this project
  routes: [
    '/',
    '/about',
    '/home'
  ]
}
```
we have  include initial props passed to the Root component and routes used for the router.
You can add more paths as your site grows.
### Create an Entry File
Create `entry.js` in your project's root directory, and add this code
```
import React from 'react'
import Router from 'react-router'
import Routes from './Routes.jsx'

if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, initialProps), document)
  })
}

/**
 * This function is the global export that static-render-webpack-plugin uses
 */
var render =  (locals, callback) => {
  Router.run(Routes, locals.path, function (Handler) {
    // renderToString() is for when you want to pre-render on the server and eventually run the same React code on the client
    /**
     * React.renderToString() converts your react elements
     * into regular html as a string.
     * we want to pre-render on the server and run the same React code on the client
     */
    var html = React.renderToString(React.createElement(Handler, locals))
    /**
   * Each route that is provided will execute the following function once,
   * the callback is called with the desired html
   */
    callback(null, `<!DOCTYPE html>
      ${html}`
    )
  })
}

export default render;

```
The entry file is what webpack will read to build bundle.js, and the static-site-generator-webpack-plugin uses the bundle to generate HTML.

For a single rendered page, you can skip React Router and create an entry.js file like the following.

Webpack expect our entry point to to build bundle.js, and the static-site-generator-webpack-plugin uses the bundle to generate HTML. We're provided with the data variables set in webpack.config.js. We call the callback with our rendered html.
### Create Routes.jsx
For handling multiple routes, update the entry file using React Router and create a `Routes.jsx` file.
```
// `Routes.jsx
import React from 'react'
import Router from 'react-router'
var Route = Router.Route
var NotFoundRoute = Router.NotFoundRoute

import Root  from './components/Root.jsx'
import Index from  './pages/Index.jsx'
import About from  './pages/About.jsx'
import Home  from './pages/Home.jsx'


var Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/about' handler={About} />
    <Route path='/home' handler={Home} />
  </Route>
)

export default Routes
```

### Create all pages
I'll show you the index page, you should be able to build About page and Home page.
```
import React from 'react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  <main>
        Index component
      </main>);
  }
}

```
### Navigation Links

To link the pages together, create a new Header component.
```
import React, {PropTypes} from 'react'
import Router from 'react-router'
var Link = Router.Link

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className='py2'>
        <h1 className='mt0'>{this.props.title}</h1>
        <div className='mxn2'>
          <Link to='/' className='button button-transparent'>Index</Link>
          <span>  // </span>
            <Link to='/about' className='button button-transparent'>About</Link>
              <span>  // </span>
          <Link to='/home' className='button button-transparent'>Home</Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
    title: React.PropTypes.string
  };

```
### Create the root Component
The Root component will include the <html> element, <head> and other code that will be shared across all pages. The page components themselves will be passed through the <RouteHander> component with React Router. To keep things somewhat organized, create this file in a new components directory.
```
// components/Root.jsx
import React, {PropTypes} from 'react'
import Router from 'react-router'
var RouteHandler = Router.RouteHandler
import Header from './Header.jsx'


export default class Root extends React.Component {
  render() {

      var initialProps = {
        __html: safeStringify(this.props)
      }

      return (
        <html>
          <head>
            <title>{this.props.title}</title>
              <link rel="stylesheet" href="./style.css"/>

          </head>
          <body className='p2'>
            <Header {...this.props} />
            <RouteHandler {...this.props} />
            <script
              id='initial-props'
              type='application/json'
              dangerouslySetInnerHTML={initialProps} />
            <script src='/bundle.js' />
          </body>
        </html>

    );
  }
}

Root.propTypes = {
      title: React.PropTypes.string
};


function safeStringify (obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
```
### Adding SCSS
We'll put our styles in ./scss/app.scss. If you don't know Sass, just use CSS and rename the .scss extension to .css. Or, spend 10 minutes reading [Sass Basics](http://sass-lang.com/guide) and you'll be set.

Finally, we need to tell webpack what to do with our Sass files. Do that by adding a new entry for all ours styles files and  configure loaders for .scss files.
```
// webpack.config.js
// ...
module.exports = {
  entry: {
      main: './entry.js', // our main javascript file
      css: './scss/app.scss' // our sass entry
    },
  //....
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.css$/, loaders: [ 'css' ] },
      {
    test: /\.scss/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      '!css-loader!sass-loader'
    )
  }
    ]
  },
/....

```
This config will output all of our css into a nice packaged file at project/build/style.css. We just have to import it in `Root.jsx`.

Finally add some basic stylings to scss/app.scss
```
body {
  color: #4983A0;
  font-size: 2em;
  padding-top: 2em
}

```
Run the start script to start a development server.
```
npm start
```
Open http://localhost:8080 in a browser.

### Render to Static Markup

Stop the development server and run `npm run webpack`. This should generate all statics files in the `build` directory.

### Fin

Thanks for reading. In a follow up article, I'll show you how to create a landing website with static rendering.
I'd be happy to hear your feedback on this tutorial and have any suggestions for improving on this, I’d love to hear them.
###Questions, Comments, Suggestions?
Open an [Issue](https://github.com/jeblister/universal-static-render/issues)
### Credits & Sources
- [jxnblk](http://jxnblk.com/writing/posts/static-site-generation-with-react-and-webpack/)
- [ryandurk.com](http://ryandurk.com/blog/build-a-static-site-webpack-tutorial/)

### Other  Tutorials & Resources
#### Static with react
- [react-static-boilerplat](https://github.com/koistya/react-static-boilerplate)
- [react-routing](https://github.com/kriasoft/react-routing)

##### Server-Client with React

-   [Server/Client With React, Part 1: Getting Started](http://eflorenzano.com/blog/2014/04/09/react-part-1-getting-started/)
-   [Server/Client With React, Part 2: The Build System](http://eflorenzano.com/blog/2014/04/10/react-part-2-build-system/)
-   [Server/Client With React, Part 3: Frontend Server](http://eflorenzano.com/blog/2014/04/11/react-part-3-frontend-server/)

##### Server Side rendering

-   [Server Side Rendering for ReactJS](http://yanns.github.io/blog/2014/03/15/server-side-rendering-for-javascript-reactjs-framework/)
-   [React Server Rendering](https://github.com/mhart/react-server-example)
-   [JDK8 + Facebook React: Rendering single page apps on the server](http://augustl.com/blog/2014/jdk8_react_rendering_on_server/)
-   [Server-side React with PHP – part 1](http://www.phpied.com/server-side-react-with-php/)
-   [Server-side React with PHP – part 2](http://www.phpied.com/server-side-react-with-php-part-2/)
-   [Server-rendered React components in Rails](http://bensmithett.com/server-rendered-react-components-in-rails/)

### New to React? Check out these tutorials

-   [ReactJS For Stupid People](http://blog.andrewray.me/reactjs-for-stupid-people/)
-   [Flux For Stupid People](http://blog.andrewray.me/flux-for-stupid-people/)

### Licence
MIT
