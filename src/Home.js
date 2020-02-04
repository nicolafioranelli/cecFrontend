import React, {useEffect, useState} from "react";
import Toolbar from "./components/Toolbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const API = process.env.REACT_API_KEY;

const Home = (props) => {
    const [phones, setPhones] = useState({});

    const onClick = (imei) => {
        console.log(imei);
        let {history} = props;
        history.push(`/device/${imei}`);
    };

    useEffect(() => {
        // Set the configuration for your app
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

        // Get a reference to the database service
        //const database = firebase.database();

        const reference = firebase.database().ref('/phones');
        reference.on('value', function(snapshot) {
            setPhones((oldState) => {
                const old = {...oldState};
                Object.keys(snapshot.val()).forEach(function(key) {
                    const values = {};
                    Object.keys(snapshot.val()[key]).forEach(function(key2) {
                        values[key2] = snapshot.val()[key][key2];
                    });
                    old[key] = values;

                });
                return old;
            });
        });
    }, []);

    return (
        <>
            <Toolbar title={"C&C"}/>

            <div style={{padding: '.5rem 1rem'}}>
                <h3 style={{color: '#cecece'}}>Active phones</h3>
                <Tab.Container id="left-tabs-example" defaultActiveKey={`${Object.keys(phones)[0]}`}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                {
                                    Object.keys(phones).map((item, index) => {
                                        return (
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={item}>{item}</Nav.Link>
                                            </Nav.Item>
                                        )
                                    })
                                }
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                {
                                    Object.keys(phones).map((imei, index) => {
                                        return (
                                            <Tab.Pane eventKey={`${imei}`} style={{color: '#cecece'}} key={index}>
                                                <h3>Info</h3>

                                                <ul>
                                                    <li>Imei: <b>{imei}</b></li>
                                                    <li>Observed packages:
                                                        <ul>
                                                            {
                                                                Object.keys(phones[imei]).map((app, indx) => {
                                                                    return (
                                                                        <li key={indx}>
                                                                            {phones[imei][app]}
                                                                        </li>
                                                                    )
                                                                })
                                                            }

                                                        </ul>
                                                    </li>
                                                </ul>

                                                <Button style={{float: 'right'}} onClick={() => onClick(`${imei}`)} variant="light">Go</Button>
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

export default Home;