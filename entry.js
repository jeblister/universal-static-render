import React from 'react'
import Router from 'react-router'
import Routes from './Routes.jsx'
// This code will only run on the browser, where there is a document object
// The initialProps value will come from a script tag with the id initial-props. 
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
