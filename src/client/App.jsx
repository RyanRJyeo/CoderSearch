import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import styles from './style.scss';
import { Redirect } from 'react-router-dom'

import Mapz from './components/mapz/mapz';

class App extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
            coders: "",
            searchers: "",
            loggedIn: "",
        };
    };

    getMapInfo(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

          const data = response.data

          this.setState({ coders: data.coders });

          this.setState({ searchers: data.searchers });

          console.log("App states")
          console.log(this.state)

        }).catch((error)=>{
          console.log(error);
        })
    }


  render() {

    if (this.state.counter < 1){

        this.setState({ counter: this.state.counter + 1});
        this.getMapInfo();

    };



    return (
      <div>
        <Mapz coders={this.state.coders} searchers ={this.state.searchers} />
      </div>
    );
  }
}

export default hot(module)(App);