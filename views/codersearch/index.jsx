var React = require("react");



class Home extends React.Component {


  render() {

    let Navbar = require('./navbar.jsx');
    // console.log(this.props.allPokemon);

    // const pokemon = this.props.allPokemon.map((pokemon, i)=>{
    //   return <p>{pokemon.name}</p>;
    // });

    let alertCoder;

    if(this.props.coder){
        if(this.props.status){
            alertCoder =     <div class="alert alert-primary text-center" role="alert">
                              Successfully registered as {this.props.coder} (Coder)
                            </div>
        } else {
            alertCoder =     <div class="alert alert-danger text-center" role="alert">
                              Registration as coder unsuccessful
                            </div>
        };
    } else if (this.props.searcher){
        if(this.props.status){
            alertCoder =     <div class="alert alert-primary text-center" role="alert">
                              Successfully registered as {this.props.searcher} (Searcher)
                            </div>
        } else {
            alertCoder =     <div class="alert alert-danger text-center" role="alert">
                              Registration as searcher unsuccessful
                            </div>
        };
    } else {
        alertCoder= null
    }




    return (
      <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.3/css/boxicons.min.css' rel='stylesheet'/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
          {alertCoder}
          <Navbar/>
          <div className="showcase">
          </div>
          <div className="showcase2">
              <img className="search" src="images/search.svg" />
              <div className="search2 mb-5 mt-5">
                <div className="text-center mb-3 mt-3">
                    <h2>CODER? <span className="blue">SEARCH!</span></h2>
                </div>
                <p>We know how hard it can be to find the right coder / programmer / software-engineer for your projects. Similarly, it can be hard for coders or tech consulting companies to find clients in this highly competitive world. </p>

                <p>Enter CoderSearch, the perfect web app for coders and searchers to find and communicate with one another. Users are able to find their targets by a variety of parameters such as their name, technical skills required, and even their location. With an in-built Map location and chat service, your search have never been clearer and communication have never been faster!</p>
              </div>
          </div>
          <div className="showcase3">
          </div>
          <div className="showcase4">
              <div className="buttons">
                <button className="btn button-outline-primary mr-5" id="coder">Register as Coder</button>
                <button className="btn btn-outline-secondary" id="searcher">Register as Searcher</button>
              </div>
              <div className="showcase2" id="coderForm">
                  <img className="search" src="images/coder.svg" />
                  <form className="formzz" method='POST' action='/registerCoder'>
                    <h1 className="formTitle">Coder</h1>
                    <div class="input-group mb-3">
                        <select class="form-control" name="occupation" required>
                          <option disabled selected value=""> -- select an option -- </option>
                          <option value="Freelancer">Freelancer</option>
                          <option value="Company">Company</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Name" name="name" required/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="email" class="form-control" placeholder="Email" name="email" required/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" id="password" placeholder="Password" name="password" required/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" id="confirm_password" placeholder="Confirm Password" required/>
                    </div>
                    <button type="submit" class="btn button-outline-light">Submit</button>
                  </form>
              </div>
              <div className="d-none" id="searcherForm">
                  <form className="formzz2" method='POST' action='/registerSearcher'>
                    <h1 className="formTitle">Searcher</h1>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Name" name="name" required/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="email" class="form-control" placeholder="Email" name="email" required/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" id="password_searcher" placeholder="Password" name="password" required/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" id="confirm_password_searcher" placeholder="Confirm Password" required/>
                    </div>
                    <button type="submit" class="btn btn-outline-light">Submit</button>
                  </form>
                  <img className="search" src="images/searcher.svg" />
              </div>

          </div>



          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
          <script src="script.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;