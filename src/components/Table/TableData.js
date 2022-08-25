import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import AddModal from "./AddTaskModal";
import "../../components/style.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Task = () => {
  const [err, seterr] = useState("");
  const [loading, setloading] = useState(true);

  const [date, setDate] = useState({ startDate: "", endDate: "" });

  //rerender flag
  const [value, setValue] = useState(0);

  //for Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //on Submitting(Adding Via Modal) task
  const handleSubmit = (e, task, startDate, endDate, statusRef, checkbox) => {
    e.preventDefault();

    task = task.trim();
    let taskDataFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    let tasks = [];
    if (taskDataFromLocalStorage) {
      tasks = [...taskDataFromLocalStorage];
    }
    tasks.push({
      completed: checkbox,
      title: task,
      date: startDate,
      edate: endDate,
      status: statusRef,
      id: Math.floor(Math.random() * 200 + 10),
    });

    //set tasks in local storage

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("startDate", JSON.stringify(startDate));
    localStorage.setItem("endDate", JSON.stringify(endDate));
    localStorage.setItem("status", JSON.stringify(statusRef));
    handleClose();

    //set rerender
    setValue((value) => value + 1);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure?")) {
      let taskDataFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
      //filter out
      taskDataFromLocalStorage = taskDataFromLocalStorage.filter(
        (tdata) => tdata.id !== id
      );
      //set tasks in local storage
      localStorage.setItem("tasks", JSON.stringify(taskDataFromLocalStorage));
      alert("Task Deleted!");

      //set rerender
      setValue((value) => value + 1);
    }
  };

  useEffect(() => {
    //if local storage has no data then
    if (
      !JSON.parse(localStorage.getItem("tasks")) ||
      !JSON.parse(localStorage.getItem("tasks")).length
    ) {
      axios
        .get("http://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          localStorage.setItem("tasks", JSON.stringify(res.data.slice(0, 6)));
          setloading(false);
        })
        .catch((err) => {
          err.response && err.response.data.message
            ? seterr(err.response.data.message)
            : seterr(err.message);

          setloading(false);
        });
    }
    setloading(false);
  }, [value]);

  const handleDate = (date, val) => {
    const newDate = moment(date).format("YYYY-MM-DD");
    if (val == "start") {
      setDate((prev) => ({ ...prev, startDate: newDate.toString() }));
    } else {
      setDate((prev) => ({ ...prev, endDate: newDate.toString() }));
    }
  };

  const submitClear = async () => {
    console.log("Caled");
    await axios
      .get("http://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        localStorage.setItem("tasks", JSON.stringify(res.data.slice(0, 6)));
        setloading(false);
      })
      .catch((err) => {
        err.response && err.response.data.message
          ? seterr(err.response.data.message)
          : seterr(err.message);

        setloading(false);
      });
    setValue((value) => value + 1);
  };

  const filterSubmit = () => {
    var newarr = JSON.parse(localStorage.getItem("tasks"));
    console.log("first", newarr);
    const newnewarr = newarr.filter((element) => {
      if (element.date < date.startDate && element.edate > date.endDate) {
        return element;
      }
    });
    var postarr = localStorage.setItem("tasks", JSON.stringify(newnewarr));
    window.location.reload();
  };

  return (
    <>
      <header className="header">
        <Row>
          <Col className="filter">
            To:
            <input
              type="date"
              onChange={(e) => handleDate(e.target.value, "start")}
              placeholderText="Enter Start Date"
              dateFormat={"YYYY-MM-DD"}
            />{" "}
            From:
            <input
              type="date"
              onChange={(e) => handleDate(e.target.value, "newDate")}
              dateFormat={"YYYY-MM-DD"}
              placeholderText="Enter End Date"
            />{" "}
          </Col>

          <Col className="func">
            <Button onClick={filterSubmit} variant="danger" gap={2}>
              Filter
            </Button>

            <Button onClick={submitClear} variant="danger" className="sub-func">
              Clear
            </Button>
          </Col>
        </Row>
      </header>
      <div
        className="w-100"
        style={{
          maxWidth: "1000px",
          margin: " 60px 220px ",
          border: "1px solid black",
        }}
      >
        {loading && <Loader />}
        {err && <Alert variant="danger">{err}</Alert>}
        <Table hover>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Details</th>
            <th>Status</th>
          </tr>
          <tbody>
            {JSON.parse(localStorage.getItem("tasks")) &&
            JSON.parse(localStorage.getItem("tasks")).length ? (
              JSON.parse(localStorage.getItem("tasks")).map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo?.date ? todo.date : "NA"}</td>
                  <td>{todo?.edate ? todo.edate : "NA"}</td>
                  <td>{todo?.status ? todo.status : "NA"}</td>
                  <td>{todo.completed.toString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteTask(todo.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr colSpan={4}>
                <td>No Data Found!</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="btn">
          <Button onClick={handleShow} variant="success">
            Add Task
          </Button>
          <AddModal
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Task;
