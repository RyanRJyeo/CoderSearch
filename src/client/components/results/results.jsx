import React from 'react';

import styles from './style.scss';

import classnames from 'classnames';

const cx = classnames.bind(styles)

class Results extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
            results: "",
        };
    };


    getResults(){

        if(this.props.loggedIn === "coders"){
            this.setState({ results: this.props.searchers });
        } else {
            this.setState({ results: this.props.coders });
        }

    }




  render() {

    let results = null;
    if(this.props.results !== ""){
        results = this.state.results.map(x =>{
            return  <div>
                        <div class="card bg-light mb-3" style="max-width: 18rem;">
                          <div class="card-header">{x.name}</div>
                          <div class="card-body">
                            <h5 class="card-title">Light card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          </div>
                        </div>
                    </div>
        })
    }

    return (
      <div>
          <div className={styles.form}>
            <div className={styles.title}>
                <h3>Start Your Search!</h3>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Skills / Place of Operations" name="name" onChange={this.props.getUserInput} required/>
            </div>
            <button type="submit" className="btn btn-outline-light" onClick={this.props.searchNow, ()=>this.getResults()}>Submit</button>
          </div>
      </div>
    );
  }
}

export default Results;