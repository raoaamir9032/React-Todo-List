import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./modal.css";
import useFetch from "../../../Hooks/useFetch";
import EditIcon from "@mui/icons-material/Edit";
import { SINGLE_EVENT, tokenHeader } from "../../../Constants/Events/constants";
import { options } from "../../../utils/Events/HelperFunctions/eventModals";
import { timeFormatHandler } from "../../../utils/Events/HelperFunctions/calendarFunctions";

export default function Edit({ editId }) {

  // Modal handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // New event handler
  const [event, setEvent] = React.useState({
    name: "",
    description: "",
    allDay: Boolean,
    start: "",
    end: "",
  });
  const [once, setOnce] = React.useState(true);
  const [errors, setErrors] = React.useState("");

  // Get data to edit
  const { data, error } = useFetch(SINGLE_EVENT(editId));

  const editEvent = () => {
    axios
      .put(SINGLE_EVENT(editId), {
        start: event.start,
        end: event.end,
        name: event.name,
        description: event.description,
        allDay: event.allDay,
      }, {
        headers: tokenHeader
      }
      )
      .then((res) => {
        if (res.error) {
          setErrors("Could not save data. Make sure all fields are full");
        }
      });
  };

  React.useEffect(() => {
    if (data && once) {
      setOnce(false);
      setEvent({
        name: data.name,
        description: data.description,
        allDay: data.allDay,
        start: data.start,
        end: data.end
      });
    }
  }, [data]);

  return (
    <div>
      <button title="Edit this event" onClick={handleOpen} className="edit-btn">
        <EditIcon />
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          {data && (
            <form className="modal-form">
              <h1 className="all">Edit Event</h1>
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                defaultValue={data.name}
                onChange={(e) => setEvent({
                  ...data,
                  name: e.target.value
                })}
                required
              />
              <label>Description</label>
              <input
                type="text"
                name="name"
                defaultValue={data.description}
                onChange={(e) => setEvent({
                  ...data,
                  description: e.target.value
                })}
                required
              />
              <label>Event Type:</label>
              <div className="radio">
                <input
                  className="radio-btn"
                  type="radio"
                  id="allDay"
                  name="event_type"
                  onChange={(e) => setEvent({
                    ...data,
                    allDay: true
                  })}
                />
                All Day
                <input
                  className="radio-btn"
                  type="radio"
                  id="timely"
                  name="event_type"
                  onChange={(e) => setEvent({
                    ...data,
                    allDay: false
                  })}
                />
                Timely
              </div>

              <div className="time-fields">
                <label>Start Time</label>
                <select
                  defaultValue={data.start}
                  required
                  onChange={(e) => setEvent({
                    ...data,
                    start: e.target.value
                  })}
                >
                  {options &&
                    options.map(
                      (
                        opt // Renders a list of times in dropdown
                      ) => (
                        <option
                          className="start"
                          id={opt}
                          key={options.indexOf(opt)}
                          value={opt}
                        >
                          {timeFormatHandler(opt)}
                        </option>
                      )
                    )}
                </select>
                <label>End Time</label>
                <select
                  required
                  defaultValue={data.end}
                  onChange={(e) => setEvent({
                    ...data,
                    end: e.target.value
                  })}
                >
                  {options &&
                    options.map(
                      (
                        opt // Renders a list of times in dropdown
                      ) => (
                        <option
                          className="end"
                          id={opt}
                          key={options.indexOf(opt)}
                          value={opt}
                        >
                          {timeFormatHandler(opt)}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="error">{errors}</div>
              <div className="btns">
                <button className="cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button onClick={editEvent}>Save</button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}
