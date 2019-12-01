import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import styles from './style.scss';
import { Redirect } from 'react-router-dom'

import Mapz from './components/mapz/mapz';
import Results from './components/results/results';
import Show from './components/show/show';
import Convo from './components/convo/convo';

import classnames from 'classnames';

const cx = classnames.bind(styles)

class App extends React.Component {

    constructor(){
        super();

        this.state = {
            counter: 0,
            coders: "",
            searchers: "",
            userInput: "$@1371263!@#!%@^#!&657",
            loggedIn: "",
            hideSearch: false,
            hideProfile: true,
            hideConvo: true,
            selectedProfile: [],
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


        }).catch((error)=>{
          console.log(error);
        })

    }


    selectedProfile(event){

        let id = event.target.value
        let selectedProfile = [];

        const url = '/reactInfo.json';
        axios.get(url)
            .then((response) => {

            const data = response.data

            if(data.loggedIn === "coders"){
                for(let i=0; i < data.searchers.length; i++){
                    if(parseInt(data.searchers[i].id) === parseInt(id)){
                        selectedProfile.push(data.searchers[i])
                    }
                }
                this.setState({ selectedProfile: selectedProfile })
            } else {
                for(let i=0; i < data.coders.length; i++){
                    if(parseInt(data.coders[i].id) === parseInt(id)){
                        selectedProfile.push(data.coders[i])
                    }
                }
                this.setState({ selectedProfile: selectedProfile })
            }

            console.log("selectedProfile state")
            console.log(this.state)

        }).catch((error)=>{
            console.log(error);
        })

    }


    showSearch(){
        this.setState({ hideSearch: false })
        this.setState({ hideProfile: true })
        this.setState({ hideConvo: true })
    }

    showProfile(){
        this.setState({ hideSearch: true })
        this.setState({ hideProfile: false })
        this.setState({ hideConvo: true })
    }

    showConvo(){
        this.setState({ hideSearch: true })
        this.setState({ hideProfile: true })
        this.setState({ hideConvo: false })
    }

  render() {

    if (this.state.counter < 1){

        this.setState({ counter: this.state.counter + 1});
        this.getMapInfo();

    };

    // calling cx sets all the styles on the element in the display variable
    const displayS= cx(
      styles.main, // styles that never change
      { // dynamic styles
        [styles.other]: this.state.hideSearch // make the key the style name, and the value the dynamic boolean
      }
    )
    // calling cx sets all the styles on the element in the display variable
    const displayP= cx(
      styles.main, // styles that never change
      { // dynamic styles
        [styles.other]: this.state.hideProfile // make the key the style name, and the value the dynamic boolean
      }
    )
    // calling cx sets all the styles on the element in the display variable
    const displayC= cx(
      styles.main, // styles that never change
      { // dynamic styles
        [styles.other]: this.state.hideConvo // make the key the style name, and the value the dynamic boolean
      }
    )

    return (
      <div>
        <Mapz coders={this.state.coders} searchers ={this.state.searchers} />
        <div className={styles.flex}>
            <div className={displayS}>
                <Results
                    // ========================================
                    //          Toggle view button
                    showSearch={()=> this.showSearch()}
                    showProfile={()=> this.showProfile()}
                    showConvo={()=> this.showConvo()}
                    // ========================================
                    // Get input from user for the map and results
                    getUserInput={(event) => this.getUserInput(event)}
                    searchNow={() => this.searchNow()}
                    // ========================================
                    // Displaying the results in results.jsx
                    loggedIn={this.state.loggedIn}
                    coders={this.state.coders}
                    searchers={this.state.searchers}
                    // ========================================
                    // Choose one result to display full profile
                    selectedProfile={(event)=> this.selectedProfile(event)}
                    // ========================================
                />
            </div>
            <div className={displayP}>
                <Show
                    // ========================================
                    //          Toggle view button
                    showSearch={()=> this.showSearch()}
                    showProfile={()=> this.showProfile()}
                    showConvo={()=> this.showConvo()}
                    // ========================================
                    //     Display this user's full profile
                    selectedProfile={this.state.selectedProfile}
                    // ========================================
                />
            </div>
            <div className={displayC}>
                <Convo
                    // ========================================
                    //          Toggle view button
                    showSearch={()=> this.showSearch()}
                    showProfile={()=> this.showProfile()}
                    showConvo={()=> this.showConvo()}
                    // ========================================
                />
            </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);