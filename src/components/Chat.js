import React, {useState} from "react";

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const API = process.env.REACT_API_KEY;

const Chat = (props) => {
    const [messages, setMessages] = useState({});

    useState(() => {
        const firebaseConfig = {
            apiKey: API,
            authDomain: "cecbackend.firebaseapp.com",
            databaseURL: "https://cecbackend.firebaseio.com",
            projectId: "cecbackend",
            storageBucket: "cecbackend.appspot.com"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const reference = firebase.database().ref('/messages/' + props.device + '/' + props.chat + '/' + props.id);
        reference.on('value', (snapshot) => {

            if (snapshot.val() !== null) {
                setMessages((oldState) => {
                    const old = {...oldState};
                    Object.keys(snapshot.val()).forEach((key) => {
                        const value = {
                            message: snapshot.val()[key].message,
                            timestamp: snapshot.val()[key].timestamp
                        };
                        old[key] = value;
                    });
                    return old;
                });

            }

        });
    }, []);

    return (
        <div style={{color: '#1c1c1c'}}>
            {
                Object.keys(messages).map((item, index) => {
                    return (
                        <>
                            <p style={{marginBottom: '0px'}}>{messages[item].message}</p>
                            <p style={{fontSize: 'x-small'}}>{messages[item].timestamp}</p>
                        </>
                    )
                })
            }
            {
                (Object.keys(messages).length === 0) ?
                    <p>Nothing to display</p> :
                    null
            }
        </div>
    )
};

export default Chat;