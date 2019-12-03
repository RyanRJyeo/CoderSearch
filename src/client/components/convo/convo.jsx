import React, {useEffect} from 'react';

import styles from './style.scss';

import classnames from 'classnames';

import axios from 'axios';

import socketIOClient from 'socket.io-client';

import { animateScroll } from "react-scroll";

const cx = classnames.bind(styles)

class Convo extends React.Component {

    constructor(){
        super();

        this.state = {
            endpoint: null,
            counter: 0,
            coders: [],
            searchers: [],
            loggedIn: "",
            convos: [],
            chats: [],
            message: "",
            currentChat: {
                convo_id: "",
                sender_id: "",
                receiver_id: "",
                sender_name: "",
                receiver_name: "",
            }

        };
    };


// ============================================================================================
//                               GET INFO TO UPDATE STATE
// ============================================================================================
    getCS(){

      const url = '/reactInfo.json';

      axios.get(url)
        .then((response) => {

          const data = response.data

              // IF CODERS LOGGED IN
              if(data.loggedIn === "coders"){
                    let searchers = []
                    // FIND ALL SEARCHERS WHO'S ID EXIST IN THIS.PROPS.CONVOS
                    for(let i=0; i < data.searchers.length; i++){
                        for(let j=0; j < this.props.convos.length; j++){
                            if(data.searchers[i].id === this.props.convos[j].searcher_id){
                                searchers.push({
                                    convo_id: this.props.convos[j].id,
                                    details: data.searchers[i]});
                            }
                        }
                    }
                    // FIND ALL CHATS THAT HAS CONVO_ID OF THIS.PROPS.CONVOS
                    let chats = []
                    for(let i=0; i < data.chats.length; i++){
                        for(let j=0; j < this.props.convos.length; j++){
                            if(data.chats[i].convo_id === this.props.convos[j].id){
                                chats.push(data.chats[i]);
                            }
                        }
                    }
                    // SET CHATS AND SEARCHERS STATES TO THE STUFF I GOT ABOVE, GET CODERS, LOGGED IN AND CONVOS STATE FROM THE AJAX DIRECTLY
                    this.setState({
                        chats: chats,
                        searchers: searchers,
                        coders: data.coders,
                        loggedIn: data.loggedIn,
                        convos: response.data.convos
                    });
              } else {
                    // IF SEARCHERS LOGGED IN
                    let coders = []
                    // FIND ALL CODERS WHO'S ID EXIST IN THIS.PROPS.CONVOS
                    for(let i=0; i < data.coders.length; i++){
                        for(let j=0; j < this.props.convos.length; j++){
                            if(data.coders[i].id === this.props.convos[j].coder_id){
                                coders.push({
                                    convo_id: this.props.convos[j].id,
                                    details: data.coders[i]});
                            }
                        }
                    }
                    // FIND ALL CHATS THAT HAS CONVO_ID OF THIS.PROPS.CONVOS
                    let chats = []
                    for(let i=0; i < data.chats.length; i++){
                        for(let j=0; j < this.props.convos.length; j++){
                            if(data.chats[i].convo_id === this.props.convos[j].id){
                                chats.push(data.chats[i]);
                            }
                        }
                    }
                    // SET CHATS AND CODERS STATES TO THE STUFF I GOT ABOVE, GET SEARCHERS, LOGGED IN AND CONVOS STATE FROM THE AJAX DIRECTLY
                    this.setState({
                        chats: chats,
                        coders: coders,
                        searchers: data.searchers,
                        loggedIn: data.loggedIn,
                        convos: response.data.convos
                    });
            }

        }).catch((error)=>{
          console.log(error);
        })

    }
// ============================================================================================



// ============================================================================================
//          MAKE SURE YOU SEND MESSAGE TO THE RIGHT PERSON WITH THESE PARAMS
// ============================================================================================
    getChat(event){

        let result = event.target.value.split(",")
        if(this.state.loggedIn === "coders"){
            this.setState({currentChat: {
                    convo_id: result[0],
                    sender_id: this.state.coders[0].id,
                    receiver_id: result[2],
                    sender_name: this.state.coders[0].name,
                    receiver_name: result[1],
                }});
        } else {
            this.setState({currentChat: {
                    convo_id: result[0],
                    sender_id: this.state.searchers[0].id,
                    receiver_id: result[2],
                    sender_name: this.state.searchers[0].name,
                    receiver_name: result[1],
                }});
        };
        this.scrollToBottom();
    };
// ============================================================================================



//                  KEEP SAVING INTO STATE WHEN USER TYPES
// ============================================================================================
    setMessage(event){
        this.setState({ message: event.target.value})
    }
// ============================================================================================




//                      SOCKET IO FUNCTIONS HERE
// ============================================================================================
    sendSocket(){
        console.log("sending socket")
        const socket = socketIOClient(this.state.endpoint);
        socket.emit("chat updated", true)
    }
// ============================================================================================




//      SETTING THE URL WHEN THIS COMPONENT RENDERS !!!!(UPDATE URL TO MY OWN HEROKU URL)!!!!
// ============================================================================================
    setURL(){
        const URL = window.location.href;
                if( URL.includes("http://127.0.0.1") ){
                    this.endpoint = "http://localhost";
                }else if( URL.includes("http://localhost") ){
                    this.endpoint = "http://localhost";
                }else{
                    this.endpoint = "https://ga-classroom-controller.herokuapp.com";
                }
    }
// ============================================================================================


//                  SEND THE MESSAGE ACCORDING TO THESE PARAMS
// ============================================================================================
    sendMessage(){
        if(this.state.message === "" || this.state.currentChat.convo_id === ""){
            console.log("message is empty sir????? please type something");
        } else {

        axios.post('/chatInfo.json', {
            convo_id: this.state.currentChat.convo_id,
            sender_id: this.state.currentChat.sender_id,
            receiver_id: this.state.currentChat.receiver_id,
            sender_name: this.state.currentChat.sender_name,
            receiver_name: this.state.currentChat.receiver_name,
            message: this.state.message
          })
          .then(response => {
            console.log(response);
            this.sendSocket();
            this.setState({ message: "" })
            console.log("ok can pass");
          })
          .catch(error => {
            console.log(err);
          });
        }
    }
// ============================================================================================


//     RUN THIS FUNCTION WHEN THIS COMPONENT FIRST LOADS UP(AJAX CALL, CONNECT TO SOCKET.IO)
// ============================================================================================
    componentDidMount(){
        this.getCS();
        this.setURL();
        const socket = socketIOClient();
        socket.on("chat updated", (value) => {
                if(value){
                    this.getCS();
                }
        });
    };
// ============================================================================================



//       RUN THIS FUNCTION WHENEVER THAT PROPS THAT'S PASSED FROM APP.JSX CHANGES
// ============================================================================================
    componentDidUpdate(prevProps){
        if (this.props.convos.length !== prevProps.convos.length) {
            this.getCS();
        }
    }
// ============================================================================================



//                          SCROLL TO BOTTOM OF THE DIV
// ============================================================================================
    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "ContainerElementID"
        });
    }
// ============================================================================================



//                        SEND MESSAGE IF KEYDOWN ON "ENTER"
// ============================================================================================
    checkKey(e) {
        if(e.keyCode === 13 && e.target.value !== ""){
            this.sendMessage();
        }
    }
// ============================================================================================




  render() {



//        SHOW ME THE CURRENT STATES FOR THIS COMPO AND SHOW THE CONVOS IF THEY EXISTS
// ============================================================================================
    let convos = null;
    if(this.state.loggedIn !== ""){
        if(this.state.loggedIn === "coders"){
            convos = this.state.searchers.map(x=>{
                return  <button value={[x.convo_id, x.details.name, x.details.id]} onClick={(event)=> this.getChat(event)} className={styles.convoName}>{x.details.name}</button>
            });
        } else {
            convos = this.state.coders.map(x=>{
                return  <button value={[x.convo_id, x.details.name, x.details.id]} onClick={(event)=> this.getChat(event)} className={styles.convoName}>{x.details.name}</button>
            });
        };

    };
// ============================================================================================




// ============================================================================================
// ============================================================================================
//                THE WHOLE LAYOUT FOR THE CHAT MESSAGING STARTS HERE
// ============================================================================================
// ============================================================================================



//                               FOR THE CHAT TITLE
// ============================================================================================
    let title = "Select a person to start a conversation!"
    if (this.state.currentChat.receiver_name){
        title = this.state.currentChat.receiver_name
    }



//                              FOR EACH CHAT MESSAGE ITSELF
// ============================================================================================

    // GET THE RELEVANT CHAT ACCORDING TO WHO THE USER SELECTED
    let chats = []
    if(this.state.chats.length > 0){
        for (let i=0; i < this.state.chats.length; i++){
            if (parseInt(this.state.currentChat.convo_id) === this.state.chats[i].convo_id){
                chats.push(this.state.chats[i])
            };
        };
    };
    // MAP THE ARRAY OF RELEVANT CHATS
    let allChats = null
    let whoissit = "rocket"
    if(chats.length > 0){
        allChats = chats.map(x =>{
            if(this.state.loggedIn === "coders"){
                if(x.sender_name === this.state.coders[0].name && x.sender_id === this.state.coders[0].id){
                    // IF ITS THE SENDER STYLE LIKE THIS
                    return  <div className={styles.sender}>
                                <p className={styles.messageS}>{x.message} <small></small></p>
                            </div>
                } else {
                    // IF ITS THE RECEIVER STYLE LIKE THIS
                    return  <div className={styles.receiver}>
                                <p className={styles.messageR}>{x.message} <small></small></p>
                            </div>
                }
            } else {
                if(x.receiver_name === this.state.searchers[0].name && x.receiver_id === this.state.searchers[0].id){
                    // IF ITS THE RECEIVER STYLE LIKE THIS
                    return  <div className={styles.receiver}>
                                <p className={styles.messageS}>{x.message} <small></small></p>
                            </div>
                } else {
                    // IF ITS THE SENDER STYLE LIKE THIS
                    return  <div className={styles.sender}>
                                <p className={styles.messageR}>{x.message} <small></small></p>
                            </div>
                }
            }
        })
        // SCROLL TO BOTTOM WHEN ALL THIS DATA IS RETRIEVED
        this.scrollToBottom();
    }





//      THE SKELETON FOR THE WHOLE CHAT APP, POPULATES FROM THE ELEMENTS CREATED ABOVE
// ============================================================================================
    let wholeChat = <p className={styles.title}>Let's start a chat!</p>
    if(this.state.convos.length > 0){
        wholeChat =     <div>
                            <p className={styles.title}>{title}</p>
                            <div className={styles.flex}>
                                <div className={styles.convos}>
                                    {convos}
                                </div>
                                <div id="ContainerElementID" className={styles.chats}>
                                    <div className="mb-4">
                                    </div>
                                    <div className={styles.scrollHolder}>
                                        <div className={styles.scrollHolder2}>
                                            <button onClick={()=> this.scrollToBottom()} className={styles.scrollToBottom}><i className='bx bx-down-arrow align-bottom'></i></button>
                                        </div>
                                    </div>
                                    {allChats}
                                </div>
                            </div>
                            <div className={styles.userInput}>
                                <div className={styles.input}>
                                    <textarea className="form-control" value={this.state.message} onChange={(event)=> this.setMessage(event)} onKeyDown={(e)=> this.checkKey(e)} placeholder="Let's chat!" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <button type="button" onClick={()=> this.sendMessage()} className={styles.button}>Send</button>
                            </div>
                        </div>
    }
// ============================================================================================
// ============================================================================================


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
                {wholeChat}
            </div>
          </div>
      </div>
    );
  }
}

export default Convo;