import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import styles from './style.scss';
import { Redirect } from 'react-router-dom'

import Mapz from './components/mapz/mapz';
import Results from './components/results/results';

class App extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
            coders: "",
            searchers: "",
            userInput: "",
        };
    };

    // getMapInfo(){

    //   const url = '/reactInfo.json';

    //   axios.get(url)
    //     .then((response) => {

    //       const data = response.data

    //       this.setState({ coders: data.coders });

    //       this.setState({ searchers: data.searchers });

    //       console.log("App states")
    //       console.log(this.state)
    //       console.log(data)

    //     }).catch((error)=>{
    //       console.log(error);
    //     })
    // }


    getUserInput(event){

        console.log(event.target.value)
        this.setState({ userInput: event.target.value })

    }

    searchNow(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

          const data = response.data
          console.log(data)
          let coders = []
          for(let i=0; i < data.coders.length; i++){
            if (data.coders[i].language){
                if(data.coders[i].language.includes(this.state.userInput) || data.coders[i].framework.includes(this.state.userInput) || data.coders[i].address.includes(this.state.userInput)){
                    coders.push(data.coders[i])
                }
            }
          }

          let searchers = []
          for(let i=0; i < data.searchers.length; i++){
            if (data.searchers[i].language){
                if(data.searchers[i].language.includes(this.state.userInput) || data.searchers[i].framework.includes(this.state.userInput) || data.searchers[i].address.includes(this.state.userInput)){
                    searchers.push(data.searchers[i])
                }
            }
          }

          this.setState({ coders: coders });

          this.setState({ searchers: searchers });

          console.log("Reset states")
          console.log(this.state)

        }).catch((error)=>{
          console.log(error);
        })

      this.setState({ userInput: "" })

    }


  render() {

    // if (this.state.counter < 1){

    //     this.setState({ counter: this.state.counter + 1});
    //     this.getMapInfo();

    // };

    return (
      <div>
        <Mapz coders={this.state.coders} searchers ={this.state.searchers} />
        <Results getUserInput={(event) => this.getUserInput(event)} searchNow={() => this.searchNow()} />
      </div>
    );
  }
}

export default hot(module)(App);