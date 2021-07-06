/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import DateFnsUtils from '@date-io/date-fns';
import { faEnvelope, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import emailjs from 'emailjs-com';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import useState from 'react-usestateref';
import './App.css';

const axios = require('axios');

function App() {
    const [selectedDate, handleDateChange, datesRef] = useState(new Date());
    const [returnDate, setReturnDate, returnRef] = useState(new Date());
    const [adultsCount, setAdultsCount, adultsRef] = useState(0);
    const [childCount, setChildCount, childRef] = useState(0);
    const [data, setData, dataRef] = useState({});
    const [json, setJson] = useState([]);

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
    const templateParams = dataRef.current;
    function handleClick(e) {
        e.preventDefault();
        console.log(data);
        handleDateChange(selectedDate.toDateString().split(' ').join(' '));
        setReturnDate(returnDate.toDateString().split(' ').join(' '));
        setData({
            ...data,
            departure: datesRef.current,
            return: returnRef.current,
            adult: adultsRef.current,
            children: childRef.current,
        });

        emailjs
            .send(
                'service_3xjmjao',
                'template_kyu8ez9',
                templateParams,
                'user_0H2rO4Hyu0QmmGlvgC3JY'
            )
            .then(
                (response) => {
                    toast.success('Successfully submitted!');
                    console.log(response);
                    console.log(dataRef.current);
                    setData({});
                    setAdultsCount(0);
                    setChildCount(0);
                    if (document.getElementById('form') && document.getElementById('form'))
                        document.getElementById('form').reset();
                },
                (err) => {
                    toast.error('Please Try again!');
                    console.log(data);
                }
            );
    }

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get(
                'https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json'
            );
            console.log(response.data);
            setJson(response.data);
            response.data;
        };
        loadUsers();
    }, []);

    // const onChangeHandler = (e) => {
    //     e.preventDefault();
    //     const x = json.filter((d) => d.city.includes(e.target.value));
    //     setFilData(x);
    // };

    return (
        <div className="App">
            <Toaster />
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
                                                name="type"
                                                defaultChecked
                                                onChange={() =>
                                                    setData({ ...data, type: 'One way' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-1">
                                                One Way
                                            </label>
                                            <input
                                                required
                                                type="radio"
                                                id="radio-2"
                                                name="type"
                                                onChange={() =>
                                                    setData({ ...data, type: 'Round trip' })
                                                }
                                            />
                                            <label className="tab" htmlFor="radio-2">
                                                Round Trip
                                            </label>

                                            <span className="glider" />
                                        </div>
                                    </div>
                                </div>
                                <div className="destination">
                                    <div>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={json}
                                            getOptionLabel={(option) =>
                                                option.iata_code + option.name
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    name="from"
                                                    required
                                                    {...params}
                                                    label="From"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        setData({ ...data, origin: e.target.value })
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Autocomplete
                                            required
                                            id="combo-box-demo"
                                            options={json}
                                            getOptionLabel={(option) =>
                                                option.iata_code + option.name
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    name="to"
                                                    {...params}
                                                    label="To"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        setData({
                                                            ...data,
                                                            destination: e.target.value,
                                                        })
                                                    }
                                                />
                                            )}
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
                                                name="departure"
                                            />
                                        </div>

                                        <div className="date">
                                            {data.type === 'Round trip' ? (
                                                <DatePicker
                                                    required
                                                    id="disableInput"
                                                    disableToolbar
                                                    label="Return"
                                                    value={returnDate}
                                                    onChange={setReturnDate}
                                                    name="departure"
                                                />
                                            ) : (
                                                <DatePicker
                                                    id="disableInput"
                                                    disableToolbar
                                                    label="Return"
                                                    value={returnDate}
                                                    onChange={setReturnDate}
                                                    name="return"
                                                    disabled
                                                />
                                            )}
                                        </div>
                                    </div>
                                </MuiPickersUtilsProvider>
                                <div className="flex-row">
                                    <div className="pass">
                                        <div className="arrange">
                                            <strong>Adults</strong>
                                            <strong name="adultCount" className="counter">
                                                {adultsCount}
                                            </strong>
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
                                            <strong name="childCount" className="counter">
                                                {childCount}
                                            </strong>
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
                                <div className="class" style={{ marginTop: '5px' }}>
                                    <div className="topContainer">
                                        <div className="tabs">
                                            <input
                                                type="radio"
                                                id="radio-10"
                                                name="class"
                                                defaultChecked
                                                onChange={() =>
                                                    setData({ ...data, class: 'Economy' })
                                                }
                                            />
                                            <label className="tab2" htmlFor="radio-10">
                                                Economy
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-20"
                                                name="class"
                                                onChange={() =>
                                                    setData({ ...data, class: 'Business' })
                                                }
                                            />
                                            <label className="tab2" htmlFor="radio-20">
                                                Business
                                            </label>
                                            <input
                                                type="radio"
                                                id="radio-30"
                                                name="class"
                                                onChange={() =>
                                                    setData({ ...data, class: 'First class' })
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
                                    <div id="nonStop" style={{ marginTop: '10px' }}>
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
                                            name="email"
                                            id="email"
                                            placeholder="Your Email*"
                                            onChange={(e) =>
                                                setData({ ...data, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="date2">
                                        <div
                                            style={{
                                                marginLeft: '2px',
                                                marginTop: '2px',
                                                marginRight: '5px',
                                                color: 'var(--primary-color)',
                                            }}
                                        >
                                            <FontAwesomeIcon size="1x" icon={faMoneyCheckAlt} />
                                        </div>
                                        <select
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                border: 'none',
                                                outline: 'none',
                                                color: 'grey',
                                            }}
                                            name="payment"
                                            id="payment"
                                            onBlur={(e) =>
                                                setData({ ...data, method: e.target.value })
                                            }
                                        >
                                            <option defaultValue>Payment Method</option>
                                            <option value="Card">Card</option>
                                            <option value="Crypto">Crypto</option>
                                        </select>
                                    </div>
                                    <input
                                        style={{ marginTop: '15px' }}
                                        type="submit"
                                        className="g-recaptcha"
                                        data-sitekey="6LfwuHUbAAAAAG-G073rAwjs3yiqXwW7kuWgv3NZ

                                        "
                                        onClick={(e) => handleClick(e)}
                                    />
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div
                style={{ visibility: 'invisible !important' }}
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
