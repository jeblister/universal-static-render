
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
