var React = require("react");

class NavbarTwo extends React.Component {
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
                    <button type="button" id="reactNav" className="btn button-outline-primary mt-2 mb-2 mr-5">
                      Discover <i class='bx bx-search-alt'></i>
                    </button>
                    <button type="button" id="logoutNav" className="btn btn-outline-secondary mt-2 mb-2 mr-5">
                      Log Out
                    </button>
                  </div>
                </nav>
                <script src="navigation.js"></script>
            </header>
        </html>
    );
  }
}

module.exports = NavbarTwo;