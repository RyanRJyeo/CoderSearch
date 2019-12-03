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
            convos: [],
            chats: [],
        };
    };



// ====================================================================================
//                      GET THE INITIAL MAP INFO
// ====================================================================================
    getMapInfo(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

          const data = response.data

        // GET OWN INPUT TO PLOT ON THE MAP FIRST
        if(data.loggedIn === "coders"){
            this.setState({
                coders: data.coders,
                loggedIn: data.loggedIn,
                convos: response.data.convos,
                chats: response.data.chats
             });

        } else {
            this.setState({
                searchers: data.searchers,
                convos: response.data.convos,
                chats: response.data.chats,
                loggedIn: data.loggedIn
            });
        }

        // GET ALL CHATS AND CONVOS

        // SHOW INITIAL STATE
          console.log("Initial states")
          console.log(this.state)

        }).catch((error)=>{
          console.log(error);
        })
    }
// ====================================================================================




// ====================================================================================
//                GET USER INPUT FROM COMPONENT CALLED RESULTS
// ====================================================================================
    getUserInput(event){
        // SHOW INPUT AT ALL TIMES ON CONSOLE.LOG
        this.setState({ userInput: event.target.value })
        console.log("userInput")
        console.log(this.state.userInput)

    }
// ====================================================================================



// ====================================================================================
//                 SEARCH BASED ON USER'S INPUT
// ====================================================================================
    searchNow(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

        const data = response.data

        // PREVENT AJAX CALL WHEN USER DID NOT TYPE ANYTHING
        if (this.state.userInput === ""){
            this.setState({ userInput: "$@1371263!@#!%@^#!&657" })
        }

        // PUSH THE RESULTS INTO THESE ARRAYS
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
            // SAVE RESULTS IN THE STATE
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
            // SAVE RESULTS IN THE STATE
            this.setState({ coders: coders });
            console.log("Adding coders and removing userInput")
            console.log(this.state)
        }


        }).catch((error)=>{
          console.log(error);
        })

    }
// ====================================================================================


// ====================================================================================
//              SHOW SELECTED PROFILE BASED ON USER'S DECISION
// ====================================================================================
    selectedProfile(event){

        // USER'S SELECTION
        let id = event.target.value

        // PUT SELECTED PROFILE IN THIS ARRAY
        let selectedProfile = [];

        // AJAX CALL (ACTUALLY MIGHT NOT NEED THIS, REFACTOR NEXT TIME)
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
// ====================================================================================


// ====================================================================================
//                  START A CONVO BASED ON USER'S INPUT
// ====================================================================================
    startConvo(event){

        // AJAX POST TO INSERT INTO THE CONVOS TABLE
        axios.post('/convoInfo.json', {
            id: event.target.value
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(err);
          });


        // GETTING THE FRESHEST INFO FROM THE DATABASE
        const url = '/reactInfo.json';
        axios.get(url)
        .then((response) => {

          const data = response.data;

          // UPDATE CONVOS AND CHATS STATE BASE ON FRESHEST INFO
          this.setState({ convos: response.data.convos});
          this.setState({ chats: response.data.chats});
          console.log("Chat states")
          console.log(this.state)

        }).catch((error)=>{
          console.log(error);
        })

    }
// ====================================================================================



// ====================================================================================
//            TOGGLE REACT VIEW BETWEEN SEARCH, PROFILE, AND CHAT
// ====================================================================================
    showSearch(){
        this.setState({
            hideSearch: false,
            hideProfile: true,
            hideConvo: true
        })
    }

    showProfile(){
        this.setState({
            hideSearch: true,
            hideProfile: false,
            hideConvo: true
        })
    }

    showConvo(){
        this.setState({
            hideSearch: true,
            hideProfile: true,
            hideConvo: false
        })
    }
// ====================================================================================




// ====================================================================================
//        DO THIS FUNCTION WHEN THIS REACT COMPONENT FIRST GET RENDERED
// ====================================================================================
    componentDidMount(){
        this.getMapInfo();
    }
// ====================================================================================




  render() {



//                      THE CSS FOR TOGGLING THE VIEWS
// ====================================================================================
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
// ====================================================================================



    return (
      <div>
        <Mapz
            coders={this.state.coders}
            searchers ={this.state.searchers}
            selectedProfile={(event)=> this.selectedProfile(event)}
            showProfile={()=> this.showProfile()}
        />
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
                    //           Initiate a convo
                    startConvo={(event)=> this.startConvo(event)}
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
                    // ========================================
                    //    Parse Convos into here
                    convos={this.state.convos}
                    // ========================================
                />
            </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);