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
            userInput: "$@1371263!@#!%@^#!&657",
            loggedIn: "",
        };
    };

    getMapInfo(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

          const data = response.data

          if(data.loggedIn === "coders"){
            this.setState({ coders: data.coders });
            this.setState({ loggedIn: data.loggedIn });
        } else {
            this.setState({ searchers: data.searchers });
            this.setState({ loggedIn: data.loggedIn });
        }

          console.log("Initial states")
          console.log(this.state)

        }).catch((error)=>{
          console.log(error);
        })
    }


    getUserInput(event){

        this.setState({ userInput: event.target.value })
        console.log("userInput")
        console.log(this.state.userInput)

    }

    searchNow(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

        const data = response.data
        console.log(data)
        if (this.state.userInput === ""){
            this.setState({ userInput: "$@1371263!@#!%@^#!&657" })
        }

        let searchers = []
        let coders = []

        if(data.loggedIn === "coders"){
            for(let i=0; i < data.searchers.length; i++){
                if (data.searchers[i].language){
                    if(data.searchers[i].language.includes(this.state.userInput) || data.searchers[i].framework.includes(this.state.userInput) || data.searchers[i].address.includes(this.state.userInput)){
                        searchers.push(data.searchers[i])
                    }
                }
            }
            this.setState({ searchers: searchers });
            console.log("Adding searchers and removing userInput")
            console.log(this.state)
        } else {
            for(let i=0; i < data.coders.length; i++){
                if (data.coders[i].language){
                    if(data.coders[i].language.includes(this.state.userInput) || data.coders[i].framework.includes(this.state.userInput) || data.coders[i].address.includes(this.state.userInput)){
                        coders.push(data.coders[i])
                    }
                }
            }
            this.setState({ coders: coders });
            console.log("Adding coders and removing userInput")
            console.log(this.state)
        }

        this.setState({ userInput: "$@1371263!@#!%@^#!&657" })

        }).catch((error)=>{
          console.log(error);
          this.setState({ userInput: "$@1371263!@#!%@^#!&657" })
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
        <Results loggedIn={this.state.loggedIn} coders={this.state.coders} searchers={this.state.searchers} getUserInput={(event) => this.getUserInput(event)} searchNow={() => this.searchNow()} />
      </div>
    );
  }
}

export default hot(module)(App);