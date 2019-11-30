import React from 'react';

import styles from './style.scss';

import classnames from 'classnames';

const cx = classnames.bind(styles)

class Results extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
            coders: "",
            searchers: "",
        };
    };



  render() {



    return (
      <div>
          <div className={styles.form}>
            <div className={styles.title}>
                <h3>Start Your Search!</h3>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Skills / Place of Operations" name="name" onChange={this.props.getUserInput} required/>
            </div>
            <button type="submit" className="btn btn-outline-light" onClick={this.props.searchNow}>Submit</button>
          </div>
      </div>
    );
  }
}

export default Results;