const React = require("react");

class SearcherEdit extends React.Component {
  render() {

    const NavbarTwo = require('./navbarTwo.jsx');

    let language = null;
    let framework = null;
    let description = null;
    if (this.props.results[0].language){
        language = this.props.results[0].language;
        framework = this.props.results[0].framework;
        description = this.props.results[0].description;
    }


    let alertUser = null
    if (this.props.alertMessage){
        if (this.props.alertMessage.includes("Error")){
            alertUser =     <div class="alert alert-danger text-center" role="alert">
                              {this.props.alertMessage}
                            </div>
        } else {
            alertUser =     <div class="alert alert-primary text-center" role="alert">
                              {this.props.alertMessage}
                            </div>
        }

    }


    let street = null;
    let city = null;
    let state = null;
    let zip = null;
    let country = null;
    if(this.props.results[0].street){
        street = this.props.results[0].street;
        city = this.props.results[0].city
        state = this.props.results[0].state
        zip = this.props.results[0].zip
        country = this.props.results[0].country
    }


    return (
      <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>

            {alertUser}
            <NavbarTwo/>

            <div className="container mt-5">
                <h1 className="text-center mt-5">Edit Your Seacher Profile</h1>
                <a className="row justify-content-center editProfilePic">
                    <img data-toggle="modal" data-target="#profilePic" className="btn img-thumbnail" src={this.props.results[0].image} />
                </a>

                <form className="col align-self-center" method='POST' action='/saveProfile'>
                  <div className="form-group">
                    <input type="number" className="form-control rounded d-none" readonly="true" name="coder_id" value={this.props.results[0].id} required/>
                  </div>
                  <div className="form-group">
                    <p>Name:</p>
                    <input type="text" className="form-control rounded" name="name" value={this.props.results[0].name} maxlength="20" required/>
                  </div>
                  <div className="form-group">
                    <p>Email:</p>
                    <input type="text" className="form-control rounded" readonly="true" name="email" value={this.props.results[0].email} maxlength="20" required/>
                  </div>
                  <div className="form-group">
                    <p>Skills required for your project:</p>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Languages:</span>
                      </div>
                      <input type="text" maxlength="500" className="form-control rounded" name="language" placeholder="HTML, CSS, JavaScript, Ruby, Python, Java, C#, C/C++, PHP, etc..." value={language} required />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Frameworks:</span>
                      </div>
                      <input type="text" maxlength="500" className="form-control rounded" name="framework" placeholder="Node.js, Rails, Spring Boot, Angular, React, Bootstrap, Firebase, Xamarin, Django, etc..." value={framework} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <p>Self Description:</p>
                    <textarea rows="8" maxlength="5000" className="form-control rounded" name="description" placeholder="Let coders know something about yourself (scale of your project, function you having problem with, etc)" value={description} required >
                    </textarea>
                    <small class="form-text text-muted">up to 5000(char)</small>
                  </div>
                  <div className="form-group">
                    <p>Place of Operations: </p>
                    <p>(If you have a few, please enter your main one)</p>
                    <input name="street"
                         class="form-control rounded"
                         id="autocomplete"
                         placeholder="Street" value={street} required />

                    <input name="city"
                         class="form-control rounded"
                         id="inputCity"
                         placeholder="City" value={city} required />

                    <input name="state"
                         class="form-control rounded"
                         id="inputState"
                         placeholder="State" value={state} required />

                    <input name="zip"
                         class="form-control rounded"
                         id="inputZip"
                         placeholder="Zip" value={zip} required />

                    <input name="country"
                         class="form-control rounded"
                         id="inputCountry"
                         placeholder="Country" value={country} required />
                    <small class="form-text text-muted mb-5">The geolocation derived from your address input may not have 100% accuracy, we apologise for any inconvenience caused</small>
                  </div>
                  <button type="submit" className="btn button-primary ">Save Changes</button>
                  <br/>
                  <br/>
                  <button type="button" class="btn button-outline-primary mb-5" data-toggle="modal" data-target="#exampleModalLong">Change Password?</button>
                </form>

                <div class="modal fade" id="profilePic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Change Profile Picture</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form enctype="multipart/form-data" action="/changeProfilePic" method="POST">
                          <div class="form-group">
                            <input type="file" name="myFile" class="form-control-file" id="exampleFormControlFile1" required/>
                          </div>
                              <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                              <button type="submit" class="btn button-primary"><i class='bx bx-save' ></i></button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Change Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form className="col align-self-center" method='POST' action='/changePassword'>
                          <div className="form-group">
                            <input type="password" className="form-control rounded" id="password" name="password" placeholder="New Password" required/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control rounded" id="confirm_password" name="confirm_password" placeholder="Confirm New Password" required/>
                          </div>
                          <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                          <button type="submit" className="btn button-primary"><i class='bx bx-save' ></i></button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>



            </div>


        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = SearcherEdit;