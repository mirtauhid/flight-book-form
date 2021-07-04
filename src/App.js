/* eslint-disable jsx-a11y/label-has-associated-control */
import DateFnsUtils from '@date-io/date-fns';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import Arrive from './Assets/arrive.png';
import Depart from './Assets/depart.png';

function App() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [adultsCount, setAdultsCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [data, setData] = useState({});

    const addAdult = () => {
        setAdultsCount(adultsCount + 1);
    };

    const removeAdult = () => {
        if (adultsCount > 0) {
            setAdultsCount(adultsCount - 1);
        }
    };

    const addChild = () => {
        setChildCount(childCount + 1);
    };

    const removeChild = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
        }
    };

    const templateParams = data;

    function sendEmail(e) {
        e.preventDefault();

        emailjs
            .send(
                'service_3xjmjao',
                'template_kyu8ez9',
                templateParams,
                'user_0H2rO4Hyu0QmmGlvgC3JY'
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    }

    const sendData = (e) => {
        sendEmail(e);
    };

    const confirmData = (e) => {
        const x = 2 + 5;
        console.log(x);
        sendData(e);
    };

    const viewData = (e) => {
        console.log(data);
        confirmData(e);
    };

    function onSubmit(token) {
        document.getElementById('form').submit(token);
    }

    const dataSubmitted = (e) => {
        e.preventDefault();
        onSubmit();
        setData({
            ...data,
            Adults: adultsCount,
            Child: childCount,
            Date: selectedDate.toDateString().split(' ').join(' '),
            Return: returnDate.toDateString().split(' ').join(' '),
        });
        document.getElementById('form')?.reset();
        setAdultsCount(0);
        setChildCount(0);
        viewData(e);
    };

    console.log(data);

    const disableInput = document.getElementById('disableInput');
    if (data.Type === 'One way') {
        disableInput.disabled = true;
    } else if (data.Type === 'Round trip') {
        disableInput.disabled = false;
    }

    return (
        <div className="App">
            <Container fluid>
                <Row className="mainRow">
                    <Col md={7} id="left-sec">
                        <h1>
                            Submit Quote <br />
                            <span>Get Your Flight Booked</span>
                        </h1>
                    </Col>
                    <Col md={5} id="right-sec">
                        <div id="formWrapper">
                            <form id="form ">
                                <div className="top">
                                    <div className="topContainer">
                                        <div className="tabs">
                                            <input
                                                required
                                                type="radio"
                                                id="radio-1"
                                                name="Type"
                                                defaultChecked
                                                onChange={() =>
                                                    setData({ ...data, Type: 'One way' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-1">
                                                One Way
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-2"
                                                name="Type"
                                                onChange={() =>
                                                    setData({ ...data, Type: 'Round trip' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-2">
                                                Round Trip
                                            </label>

                                            <span className="glider" />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="leftIcon">
                                        <img src={Depart} alt="Departure" />
                                    </div>
                                    <div className="rightInp">
                                        <input
                                            required
                                            type="text"
                                            name="From"
                                            id="from"
                                            placeholder="From"
                                            onChange={(e) =>
                                                setData({ ...data, From: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="leftIcon">
                                        <img src={Arrive} alt="Arrive" />
                                    </div>
                                    <div className="rightInp">
                                        <input
                                            required
                                            type="text"
                                            name="To"
                                            id="to"
                                            placeholder="To"
                                            onChange={(e) =>
                                                setData({ ...data, To: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className="flex-row">
                                        <div className="date">
                                            <DatePicker
                                                required
                                                disableToolbar
                                                label="Departure"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                name="Departure"
                                            />
                                        </div>

                                        <div className="date">
                                            <DatePicker
                                                id="disableInput"
                                                disableToolbar
                                                label="Return"
                                                value={returnDate}
                                                onChange={setReturnDate}
                                                name="Return"
                                                disabled="disabled"
                                            />
                                        </div>
                                    </div>
                                </MuiPickersUtilsProvider>
                                <div className="flex-row">
                                    <div className="pass">
                                        <div className="arrange">
                                            <strong>Adults</strong>
                                            <strong className="counter">{adultsCount}</strong>
                                        </div>
                                        <div className="arrange">
                                            <button onClick={() => addAdult()} type="button">
                                                +
                                            </button>
                                            <button onClick={() => removeAdult()} type="button">
                                                -
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pass">
                                        <div className="arrange">
                                            <strong>Children</strong>
                                            <strong className="counter">{childCount}</strong>
                                        </div>
                                        <div className="arrange">
                                            <button onClick={() => addChild()} type="button">
                                                +
                                            </button>
                                            <button onClick={() => removeChild()} type="button">
                                                -
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="class">
                                    <div className="topContainer">
                                        <div className="tabs">
                                            <input
                                                type="radio"
                                                id="radio-10"
                                                name="Class"
                                                defaultChecked
                                                onChange={() =>
                                                    setData({ ...data, Class: 'Economy' })
                                                }
                                            />
                                            <label className="tab2" htmlFor="radio-10">
                                                Economy
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-20"
                                                name="Class"
                                                onChange={() =>
                                                    setData({ ...data, Class: 'Business' })
                                                }
                                            />
                                            <label className="tab2" htmlFor="radio-20">
                                                Business
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-30"
                                                name="Class"
                                                onChange={() =>
                                                    setData({ ...data, Class: 'First class' })
                                                }
                                            />
                                            <label className="tab2" htmlFor="radio-30">
                                                First Class
                                            </label>
                                            <span className="glider2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom flex-col">
                                    <div id="nonStop">
                                        <div
                                            style={{
                                                marginLeft: '10px',
                                                marginTop: '2px',
                                                color: 'var(--primary-color)',
                                            }}
                                        >
                                            <FontAwesomeIcon size="1x" icon={faEnvelope} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            name="Email"
                                            id="email"
                                            placeholder="Your Email*"
                                            onChange={(e) =>
                                                setData({ ...data, Email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        className="g-recaptcha"
                                        data-sitekey="6LfwuHUbAAAAAG-G073rAwjs3yiqXwW7kuWgv3NZ

                                        "
                                        data-callback={(e) => dataSubmitted(e)}
                                    />
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div
                className="g-recaptcha"
                data-sitekey="6LcptnUbAAAAAK8X0dVcNKF2DAIhMjzuslL1YSwN
                "
                data-callback="onSubmit"
                data-size="invisible"
            />
        </div>
    );
}

export default App;
