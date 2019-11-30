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
    if(this.props.searchers){
        results = this.props.searchers.map(x =>{
            return  <div>
                        <div className="card bg-light mt-4 mb-3">
                          <div className="card-body">
                            <h5 className="card-title">{x.name}</h5>
                            <p className="card-text">{x.language}</p>
                            <p className="card-text">{x.framework}</p>
                            <p className="card-text"><small>{x.street} {x.city} {x.country}</small></p>
                            <button className={styles.button}>See More</button>
                          </div>
                        </div>
                    </div>
        })
    }

    return (
      <div className={styles.results}>
          <div className={styles.form}>
            <div className={styles.title}>
                <h3>Start Your Search!</h3>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Skills / Place of Operations" name="name" onChange={this.props.getUserInput} required/>
            </div>
            <button type="submit" className="btn btn-outline-light" onClick={()=>this.props.searchNow()}>Submit</button>
            {results}
          </div>
      </div>
    );
  }
}

export default Results;