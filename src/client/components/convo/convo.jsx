import React from 'react';

import styles from './style.scss';

import classnames from 'classnames';

const cx = classnames.bind(styles)

class Convo extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
        };
    };



  render() {


    return (
      <div>
          <div>
            <div className={styles.convo}>
                <div className={styles.buttonGroup} role="group" aria-label="Basic example">
                  <button type="button" className={styles.button1} onClick={()=> this.props.showSearch()}>Search</button>
                  <button type="button" className={styles.button2} onClick={()=> this.props.showProfile()}>Profile</button>
                  <button type="button" className={styles.button3} onClick={()=> this.props.showConvo()}>Convo</button>
                </div>
                <h3 className={styles.title}>Conversations</h3>
            </div>
          </div>
      </div>
    );
  }
}

export default Convo;