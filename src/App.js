/* eslint-disable jsx-a11y/label-has-associated-control */
import DateFnsUtils from '@date-io/date-fns';
import { faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';

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

    const viewData = () => {
        console.log(data);
    };

    const dataSubmitted = (e) => {
        e.preventDefault();
        setData({
            ...data,
            Adults: adultsCount,
            Child: childCount,
            Date: selectedDate,
            Return: returnDate,
        });
        document.getElementById('form').reset();
        setAdultsCount(0);
        setChildCount(0);
        viewData();
    };

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
                            <form id="form">
                                <div className="top">
                                    <div className="topContainer">
                                        <div className="tabs">
                                            <input
                                                required
                                                type="radio"
                                                id="radio-1"
                                                name="tabs"
                                                defaultChecked
                                                onChange={() =>
                                                    setData({ ...data, 'Quote type': 'One way' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-1">
                                                One Way
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-2"
                                                name="tabs"
                                                onChange={() =>
                                                    setData({ ...data, 'Quote type': 'Round trip' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-2">
                                                Round Trip
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-3"
                                                name="tabs"
                                                onChange={() =>
                                                    setData({ ...data, 'Quote type': 'Multi City' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-3">
                                                Multicity
                                            </label>
                                            <span className="glider" />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="leftIcon">
                                        <FontAwesomeIcon size="2x" icon={faPlaneDeparture} />
                                    </div>
                                    <div className="rightInp">
                                        <input
                                            required
                                            type="text"
                                            name="from"
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
                                        <FontAwesomeIcon size="2x" icon={faPlaneArrival} />
                                    </div>
                                    <div className="rightInp">
                                        <input
                                            required
                                            type="text"
                                            name="to"
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
                                            />
                                        </div>

                                        <div className="date">
                                            <DatePicker
                                                disableToolbar
                                                label="Return"
                                                value={returnDate}
                                                onChange={setReturnDate}
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
                                                name="tabs2"
                                                defaultChecked
                                                onChange={() =>
                                                    setData({ ...data, Class: 'Economy' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-10">
                                                Economy
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-20"
                                                name="tabs2"
                                                onChange={() =>
                                                    setData({ ...data, Class: 'Business' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-20">
                                                Business
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-30"
                                                name="tabs2"
                                                onChange={() =>
                                                    setData({ ...data, Class: 'First class' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-30">
                                                First Class
                                            </label>
                                            <span className="glider" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom flex-col">
                                    <div id="nonStop">
                                        <input
                                            type="checkbox"
                                            name="non-stop"
                                            id="non-stop"
                                            onChange={() =>
                                                setData({ ...data, 'Non stop flights': true })
                                            }
                                        />
                                        <label
                                            style={{
                                                marginBottom: '2px',
                                                marginLeft: '10px',
                                            }}
                                            htmlFor="non-stop"
                                        >
                                            Non stop flights only
                                        </label>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Submit"
                                        onClick={(e) => dataSubmitted(e)}
                                    />
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
