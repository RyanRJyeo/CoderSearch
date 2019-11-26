var React = require("react");



class Home extends React.Component {


  render() {

    let Navbar = require('./navbar.jsx');
    // console.log(this.props.allPokemon);

    // const pokemon = this.props.allPokemon.map((pokemon, i)=>{
    //   return <p>{pokemon.name}</p>;
    // });

    const customStyles = {
      control: (base, state) => ({
        ...base,
        boxShadow: state.isFocused ? 0 : 0,
        borderColor: state.isFocused
          ? brandColor
          : base.borderColor,
        '&:hover': {
          borderColor: state.isFocused
            ? brandColor
            : base.borderColor,
        }
      })
    };


    return (
      <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
          <Navbar/>
          <div className="showcase">
          </div>
          <div className="showcase2">
              <img className="search" src="images/search.svg" />
              <p className="search2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="showcase3">
          </div>
          <div className="showcase4">
              <div className="buttons">
                <button className="btn btn-outline-primary mr-5" id="coder">Register as Coder</button>
                <button className="btn btn-outline-secondary" id="searcher">Register as Searcher</button>
              </div>
              <div className="showcase2" id="coderForm">
                  <img className="search" src="images/coder.svg" />
                  <form className="formzz">
                    <h1 className="formTitle">Coder</h1>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Email" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Password" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Confirm Password" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Place of Operations" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Something" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <button type="submit" class="btn btn-outline-light">Submit</button>
                  </form>
              </div>
              <div className="d-none" id="searcherForm">
                  <form className="formzz2">
                    <h1 className="formTitle">Searcher</h1>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Email" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Password" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Confirm Password" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Place of Operations" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Something" aria-label="Example text with button addon" aria-describedby="button-addon1" required={true}/>
                    </div>
                    <button type="submit" class="btn btn-outline-light">Submit</button>
                  </form>
                  <img className="search" src="images/searcher.svg" />
              </div>

          </div>


          <script src="script.js"></script>
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;