import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import styles from './style.scss';
import { Redirect } from 'react-router-dom'

import Form from './components/form/form';

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

          console.log(data)

          this.setState({ coders: data.coders });

          this.setState({ searchers: data.searchers });

        }).catch((error)=>{
          console.log(error);
        })
    }


  render() {


    console.log("doing Axios call now")
    if (this.state.counter < 1){

        this.setState({ counter: this.state.counter + 1});
        this.getMapInfo();

    };
    console.log("Axios done")
    console.log(this.state)


    return (
      <div>
        <Form />
        Welcome.
      </div>
    );
  }
}

export default hot(module)(App);