import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {useAuth} from "./context/auth";
import './style/Login.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Authentication failed
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.error}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [modalShow, setModalShow] = useState(true);
    const auth = useAuth();

    const postLogin = async (event) => {
        event.preventDefault();

        await auth.login(userName, password);
    };

    if (auth.token) {
        return <Redirect to={props.location.state.referrer.path}/>;
    }

    return (
        <>
            <form>
                <div className={"container"}>
                    <div className={"login"}>
                        <div className="item"><img src="./logo.png" alt={"logo"} className="logo"/></div>
                        <div className="item mt2">
                            <img src="./user.png" alt={"user"} className="icon"/>
                            <input type="username"
                                   value={userName}
                                   onChange={e => {
                                       setUserName(e.target.value);
                                   }}
                                   placeholder="Username"/>
                        </div>
                        <div className="item mt2">
                            <img src="./password.png" alt={"password"} className="icon"/>
                            <input type="password"
                                   value={password}
                                   onChange={e => {
                                       setPassword(e.target.value);
                                   }}
                                   placeholder="Password"/>
                        </div>
                        <div className="item">
                            <button className="button" onClick={postLogin}>
                                <span>LOGIN</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {
                (auth.error !== null) ? <MyVerticallyCenteredModal show={modalShow} error={auth.error} onHide={() => {
                    setModalShow(false);
                    auth.clearError();
                    setModalShow(true);
                }}/> : null
            }
        </>
    );
}

export default Login;
