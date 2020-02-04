import React, {useEffect, useState} from "react";
import Toolbar from "./components/Toolbar";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Chat from "./components/Chat";

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const API = process.env.REACT_API_KEY;

//TODO: load data only when clicked

const Details = (props) => {
    const [apps, setApps] = useState({});
    const [chats, setChats] = useState({});

    useEffect(() => {
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

        const reference = firebase.database().ref('/phones/' + props.match.params.device);
        reference.once('value').then((snapshot) => {
            setApps((oldState) => {
                const old = {...oldState};
                Object.keys(snapshot.val()).forEach((key) => {
                    old[key] = snapshot.val()[key];
                    //old.push(snapshot.val()[key]);
                });
                return old;
            });
        });



    }, []);

    useEffect(() => {
        Object.keys(apps).map((item) => {
            const chatReference = firebase.database().ref('/chats/' + props.match.params.device + '/' + item);
            chatReference.once('value', (snapshot) => {
                setChats( (oldState) => {
                    const old = {...oldState};
                    Object.keys(snapshot.val()).forEach((key) => {
                        old[key] = snapshot.val()[key];
                    });
                    return old;
                });
            });
        });
    }, [apps]);

    return (
        <>
            <Toolbar title={"Details"}/>

            <div style={{padding: '.5rem 1rem'}}>
                <h3 style={{color: '#cecece'}}>Apps</h3>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {
                                    Object.keys(apps).map((item, indx) => {
                                        return (
                                            <Nav.Item key={indx}>
                                                <Nav.Link eventKey={item}>{apps[item]}</Nav.Link>
                                            </Nav.Item>
                                        )
                                    })
                                }
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {
                                    Object.keys(apps).map((item, indx) => {
                                        return (
                                            <Tab.Pane eventKey={item} style={{color: '#cecece'}} key={indx}>
                                                <h3>{apps[item]}</h3>

                                                <Accordion>
                                                    {
                                                        Object.keys(chats).map((item2, index) => {
                                                            return (
                                                                <Card style={{background: '#cecece'}} key={index}>

                                                                    <Accordion.Toggle as={Card.Header} eventKey={`${item2}`} style={{color: '#1c1c1c'}}>
                                                                        {chats[item2]}
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey={`${item2}`}>
                                                                        <Card.Body>
                                                                            <Chat device={props.match.params.device} chat={`${item}`} id={`${item2}`}/>
                                                                        </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Card>
                                                            )
                                                        })
                                                    }
                                                </Accordion>
                                            </Tab.Pane>
                                        )
                                    })
                                }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    );
};

export default Details;