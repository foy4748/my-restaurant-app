import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { userContext } from "../Contexts/AuthContext";
import Loader from "./Loader";

import "react-datepicker/dist/react-datepicker.css";

const SERVER = import.meta.env.VITE_SERVER_ADDRESS || "http://localhost:3001";

import { Container, Col, Row, Dropdown, Button } from "react-bootstrap";
import moment from "moment";

export default function Tables() {
  const { activeUser } = useContext(userContext);

  // STATES --------------------------------
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

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
      try {
        const res = await fetch(
          `${SERVER}/schedules/${selectedDate + selectedTime}`
        );
        const result = await res.json();
        console.log(result);
        setBookedTables(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    setLoading(true);
    fetcher();
  }, [selectedDate, selectedTime]);

  // SETTING UP TABLES
  let tableJSX = [];

  for (let i = 1; i <= 9; i++) {
    tableJSX.push(
      <Col key={i} className="dinnerTable">
        <img
          onClick={(e) => handleTableClick(e, i)}
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

  const handleTableClick = (e, i) => {
    if (e.target.classList.contains("booked")) {
      return;
    }

    setSelectedTable(i);

    const tables = window.document.body.getElementsByClassName("dinnerTable");

    Object.values(tables).forEach((item) => {
      const table = item.firstElementChild;
      if (table.classList.contains("bookedNow")) {
        table.classList.remove("bookedNow");
      }
    });
    e.target.classList.add("bookedNow");
  };

  const booking = async () => {
    if (!selectedDate || !selectedTime || !selectedTable) {
      console.log("Please, select DATE, TIME and TABLE");
      return;
    }

    // Never do spread operations inside dispatch functions
    let newTables = [];
    if (bookedTables && bookedTables.length >= 1)
      newTables = [...bookedTables, selectedTable];
    else newTables.push(selectedTable);
    setBookedTables(newTables);

    try {
      const payLoad = {
        DATE: selectedDate,
        TIME: selectedTime,
        TABLE: selectedTable,
        UID: activeUser.uid,
      };
      console.log(selectedTable);
      const res = await fetch(`${SERVER}/schedules`, {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  //----------------------------------------

  return (
    <Container className="g-4 fixMarginTop">
      <div className="d-md-flex justify-content-center align-items-center flex-column p-4 sticky  fix">
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
          <div className="d-flex align-items-center justify-content-center">
            <Button onClick={booking} className="py-3">
              Book !
            </Button>
          </div>
        </div>
      </div>
      <Row sm={1} md={2} lg={3} className="g-5 mt-4 fixOverflow">
        {loading ? <Loader /> : tableJSX}
      </Row>
    </Container>
  );
}
