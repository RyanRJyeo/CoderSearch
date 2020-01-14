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


// RESULTS ARE SHOWN, AND RUN THESE FUNCTIONS IF USER PRESS THE SEE MORE BUTTON
// ====================================
  handleClick(event){
    this.props.selectedProfile(event);
    this.props.showProfile();
  }
// ====================================



// SEND USER INPUT IF KEYDOWN ON "ENTER"
// ====================================
  checkKey(e) {
    if(e.keyCode === 13 && e.target.value !== ""){
      this.props.searchNow()
    }
  }
// ====================================






  render() {



//  IF CODERS LOGGED IN, SHOW THESE RESULTS, IF SEARCHERS LOGGED IN, SHOW ANOTHER
// ====================================
  let results = null;
  if(this.props.loggedIn === "coders"){
    if(this.props.searchers){
      results = this.props.searchers.map(x =>{
        return  <div key={x.id} className="card bg-light mt-4 mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{x.name}</h5>
                    <p className="card-text">{x.language}</p>
                    <p className="card-text">{x.framework}</p>
                    <p className="card-text"><small>{x.street} {x.city} {x.country}</small></p>
                    <button value={x.id} onClick={(event)=> this.handleClick(event)} className={styles.button}>See More</button>
                  </div>
                </div>
      });
    };
  } else {
    if(this.props.coders){
      results = this.props.coders.map(x =>{
        return  <div key={x.id} className="card bg-light mt-4 mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{x.name} <span className={styles.purple}>{x.occupation_type}</span></h5>
                    <p className="card-text"><b>Language:</b> {x.language}</p>
                    <p className="card-text"><b>Framework:</b> {x.framework}</p>
                    <p className="card-text"><small>{x.street} {x.city} {x.country}</small></p>
                    <button value={x.id} onClick={(event)=> this.handleClick(event)}className={styles.button}>See More</button>
                  </div>
                </div>
      });
    };
  }
// ====================================

    return (
      <div>
          <div className={styles.form}>
            <div className={styles.buttonGroup} role="group" aria-label="Basic example">
              <button type="button" className={styles.button1} onClick={()=> this.props.showSearch()}>Search</button>
              <button type="button" className={styles.button2} onClick={()=> this.props.showProfile()}>Profile</button>
              <button type="button" className={styles.button3} onClick={()=> this.props.showConvo()}>Convo</button>
            </div>
            <div className={styles.title}>
                <h3>Start Your Search!</h3>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" onKeyDown={(e)=> this.checkKey(e)} placeholder="Skills / Place of Operations" name="name" onChange={this.props.getUserInput} required/>
            </div>
            <button type="submit" className="btn btn-outline-light" onClick={()=>this.props.searchNow()}>Submit</button>
            {results}
          </div>
      </div>
    );
  }
}

export default Results;