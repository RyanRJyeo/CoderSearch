var React = require("react");

class Navbar extends React.Component {
  render() {

    return (
        <html>
            <head>
                <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.3/css/boxicons.min.css' rel='stylesheet'/>
            </head>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                  <span>
                    <a className="navbar-brand" href="/">Coder<span className="blue">Search</span><i className='bx bx-search'></i></a>
                  </span>

                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <form className="form-inline my-2 my-lg-0 mr-4" method='POST' action='/findCase'>
                      <input className="form-control mr-sm-2" type="text" name="name" placeholder="Email" required/>
                      <input className="form-control mr-sm-2" type="password" name="name" placeholder="Password" required/>
                      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Log In</button>
                    </form>
                  </div>

                </nav>
            </header>
        </html>
    );
  }
}

module.exports = Navbar;