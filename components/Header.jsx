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
