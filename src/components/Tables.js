import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { userContext } from "../Contexts/AuthContext";

import "react-datepicker/dist/react-datepicker.css";

import { Container, Col, Row, Dropdown, Button } from "react-bootstrap";
const moment = require("moment");

export default function Tables() {
  const { activeUser } = useContext(userContext);

  // STATES --------------------------------
  const [startDate, setStartDate] = useState(new Date());

  //Date Time and Table state
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedTable, setSelectedTable] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("YYYYMMDD")
  );

  const [bookedTables, setBookedTables] = useState([]);
  //----------------------------------------

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.SERVER_ADDRESS || "http://localhost:3001"}/schedules/${
          selectedDate + selectedTime
        }`
      );
      const result = await res.json();
      setBookedTables(result);
    };

    fetcher();
  }, [selectedDate, selectedTime]);

  // SETTING UP TABLES
  let tableJSX = [];

  for (let i = 1; i <= 9; i++) {
    tableJSX.push(
      <Col key={i} className="dinnerTable" onClick={() => setSelectedTable(i)}>
        <img
          src="/table.png"
          className={`${
            Object.values(bookedTables).includes(i) ? "booked" : ""
          }`}
          alt="table"
        />
      </Col>
    );
  }
  //----------------------------------------

  // EVENT HANDLERS
  const handleDateChange = (e) => {
    const selectedDate = moment(e).format("YYYYMMDD");
    setSelectedDate(selectedDate);

    setStartDate(e);
  };

  const booking = async () => {
    if (!selectedDate || !selectedTime || !selectedTable) {
      console.log("Please, select DATE, TIME and TABLE");
      return;
    }

    const payLoad = {
      DATE: selectedDate,
      TIME: selectedTime,
      TABLE: selectedTable,
      UID: activeUser.uid,
    };
    const res = await fetch(
      `${process.env.SERVER_ADDRESS || "http://localhost:3001"}/schedules`,
      {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const result = await res.json();
  };
  //----------------------------------------

  return (
    <Container className="g-4">
      <div className="d-md-flex justify-content-end align-items-center">
        <div className="border rounded d-flex flex-column justify-content-center align-items-center">
          <span>Pick a Date: </span>
          <DatePicker
            className="d-inline-flex w-100 text-center"
            selected={startDate}
            onChange={handleDateChange}
            minDate={moment().toDate()}
            placeholderText="Select a day"
          />
        </div>
        <div className="border d-flex justify-content-center">
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              className="py-3"
              variant="outline-dark"
              id="dropdown-autoclose-true"
            >
              Pick Time:{" "}
              {selectedTime && selectedTime > 12
                ? `${+selectedTime - 12} PM`
                : +selectedTime === 0
                ? ""
                : `${selectedTime} PM`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => setSelectedTime(12)}>
                12 : 00 PM
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setSelectedTime(13)}>
                01 : 00 PM
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setSelectedTime(14)}>
                02 : 00 PM
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" onClick={() => setSelectedTime(20)}>
                08 : 00 PM
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setSelectedTime(21)}>
                09 : 00 PM
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setSelectedTime(22)}>
                10 : 00 PM
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Button onClick={booking}>Book !</Button>
        </div>
      </div>
      <Row lg={3} className="g-5 mt-4">
        {tableJSX}
      </Row>
    </Container>
  );
}