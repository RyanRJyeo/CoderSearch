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
                    <span className="navBurger"><i className='bx bx-chevrons-down bx-md' ></i></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <button type="button" id="nav-butts-one " className="btn button-outline-light mt-2 mb-2 mr-5" data-toggle="modal" data-target="#exampleModalCenter">
                      <i className='bx bx-log-in-circle' ></i> Coder
                    </button>
                    <br/>
                    <button type="button" id="nav-butts-two" className="btn button-outline-primary mt-2 mb-2" data-toggle="modal" data-target="#exampleModalCenter2">
                      <i className='bx bx-log-in-circle' ></i> Searcher
                    </button>
                    <button type="button" id="nav-logout" className="d-none">
                      <a class="navlink" href="/logout">Log Out</a>
                    </button>
                  </div>
                </nav>


                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <form  method='POST' action='/loginCoder'>
                          <h3 className="mb-4 text-center">Coder Login</h3>
                          <div className="form-group">
                            <input type="email" className="form-control rounded" name="email" placeholder="Email" required/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control rounded" name="password" placeholder="Password" required/>
                          </div>
                          <button type="submit" className="btn button-primary mb-3">Login</button>
                        </form>
                        <a href="/">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <form  method='POST' action='/loginSearcher'>
                          <h3 className="mb-4 text-center">Searcher Login</h3>
                          <div className="form-group">
                            <input type="email" className="form-control rounded" name="email" placeholder="Email" required/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control rounded" name="password" placeholder="Password" required/>
                          </div>
                          <button type="submit" className="btn button-primary mb-3">Login</button>
                        </form>
                        <a href="/">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                </div>

            </header>
        </html>
    );
  }
}

module.exports = Navbar;