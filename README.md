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

Using webpack to render a website statically, and react-router to switch between pages dynamically.
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
  /components
      Header.jsx
      Root.jx
  /pages
      RootPage.js
      Home.jsx
      About.jsx
      404Page.js
    entry.js
  webpack.config.js
```
and the static output should be like this :
```
/project
  /build
    /about
      index.html
    /projects
      index.html
    index.html
    404.html
    bundle.js
    style.css
```
to show how you can have apps for static pages and posts indexed by search engines and thus easier to find by potential users in search engines.

### Setup

First, let's install some dependencies :

~~~
// Make sure to include the babel-core we will use ES6
$ npm i --save-dev webpack webpack-dev-server react babel-core babel-preset-es2015 babel-preset-react react-router history static-render-webpack-plugin babel-loader
~~~

### Webpack

Let's take a look at our webpack config.

### Other Isomorphic Tutorials & Resources

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
