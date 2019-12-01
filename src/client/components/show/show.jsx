import React from 'react';

import styles from './style.scss';

import classnames from 'classnames';

const cx = classnames.bind(styles)

class Show extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
        };
    };



  render() {

    let profile = null;
    if(this.state.counter < 1){
        if(this.props.selectedProfile.length === 1){
            profile = this.props.selectedProfile.map(x=>{
                return  <div>
                            <div className="card">
                              <img src={x.image} className={styles.image} alt="User Profile Image" />
                              <div className="card-body">
                                <h2 className="card-title text-center mb-5">{x.name}</h2>
                                <p><b>Languages:</b> {x.language}</p>
                                <p><b>Framework:</b> {x.framework}</p>
                                <p></p>
                                <p className="card-text"><b>Description:</b><br/>{x.description}</p>
                                <p className="mb-5"><b>Place of operations:</b><br/>{x.address}</p>
                                <button className={styles.button}>Chat Now</button>
                              </div>
                            </div>
                        </div>
            });
        }
    };

    return (
      <div>
          <div>
            <div className={styles.profile}>
                <div className={styles.buttonGroup} role="group" aria-label="Basic example">
                  <button type="button" className={styles.button1} onClick={()=> this.props.showSearch()}>Search</button>
                  <button type="button" className={styles.button2} onClick={()=> this.props.showProfile()}>Profile</button>
                  <button type="button" className={styles.button3} onClick={()=> this.props.showConvo()}>Convo</button>
                </div>
                <h3 className={styles.title}>Profile</h3>
                {profile}
            </div>
          </div>
      </div>
    );
  }
}

export default Show;