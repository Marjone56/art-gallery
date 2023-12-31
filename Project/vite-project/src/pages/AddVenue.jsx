import React, { useEffect, useState, useContext } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from './components/Header';
import moment from 'moment';
import 'moment-timezone';

export default function AddVenue() {

  const PopupMessage = () => {
    return (
      <div className="popup_ben">
        <p> Oops!! FILL OUT ALL FIELDS</p>
      </div>
    );
  };

  const navigate = useNavigate();
  //const [user, setUser] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));


  const [selectedType, setSelectedType] = useState('');
  //const { user, updateUser } = useContext(UserContext);
  const [venueName, setVenueName] = useState('');
  const [venueDesc, setVenueDesc] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [venueCity, setVenueCity] = useState(''); // Added city state
  const [venueState, setVenueState] = useState(''); // Added city state
  const [sports, setSports] = useState([]);
  const [venueImage, setVenueImage] = useState('');
  const [timeslots, setTimeslots] = useState([]);
  const selectTimeslots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];
  const formattedTimeslots = selectTimeslots.map((timeslot) =>
    moment(timeslot, 'hh:mm A').format('hh:mm A')
  );

  const onSubmit = (e) => {
    console.log(timeslots);
    console.log(user._id);
    e.preventDefault();
    // Check if all required fields are filled
    if (!venueName || !venueAddress || !venueDesc || !maxCapacity || !selectedType || !venueCity || !venueState || timeslots.length === 0 || !venueImage) {
      togglePopup();
      return;
    }

    axios
      .post("http://localhost:5001/add-venue", {
        ownerId: user._id,
        name: venueName,
        info: venueDesc,
        address: venueAddress,
        maxCapacity: maxCapacity,
        venueType: selectedType,
        venueCity: venueCity, 
        venueState: venueState, 
        venueImage: venueImage, 
        venueTimeslots: timeslots, 
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log("Sucess (added venue)");
          navigate('/venuedashboard');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <Header />
      <div className="add-venue-page">
        <div className="flex flex-col items-center justify-center h-screen bg-white p-3 rounded">
          <form style={{ width: '80%' }} className="bg-white shadow-md rounded-lg p-8 w-4/5 mb-6 text-center">
            <h4 className="m-1 items-center">
              <b>Add a Venue!</b>
            </h4>
            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Venue Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                label="VenueName"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                required
                placeholder="Enter Venue Name"
              />
            </div>
            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Venue Address</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                label="VenueAddress"
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                required
                placeholder="Enter Street Address"
              />
            </div>
            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Venue Description</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                label="VenueDesc"
                value={venueDesc}
                onChange={(e) => setVenueDesc(e.target.value)}
                required
                placeholder="Enter Venue Description"
              />
            </div>
            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Venue City</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                label="VenueCity"
                value={venueCity}
                onChange={(e) => setVenueCity(e.target.value)}
                placeholder="Enter Venue City"
              />
            </div>
            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Venue State</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                label="VenueState"
                value={venueState}
                onChange={(e) => setVenueState(e.target.value)}
                placeholder="Enter Venue State Acronym"
              />
            </div>

            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Maximum Capacity</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                label="MaxCapacity"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                required
                placeholder="Enter Maximum Capacity"
              />
            </div>
            <Accordion>
              <AccordionSummary className="m-0" expandIcon={<ExpandMoreIcon />}>
                <b>Venue Type</b>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {['Art Gallery', 'Museum', 'Theater', 'Cultural Center', 'Auction'].map((value) => (
                    <ListItem key={value} className="p-0">
                      <Checkbox
                        color="primary"
                        checked={selectedType === value}
                        onChange={() => handleTypeChange(value)}
                      />
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary className="m-0" expandIcon={<ExpandMoreIcon />}>
                <b>Time Slots</b>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {formattedTimeslots.map((value) => {
                    return (
                      <ListItem key={value} className="p-0">
                        <Checkbox
                          color="primary"
                          onClick={(e) => {
                            if (e.target.checked) {
                              setTimeslots([...timeslots, value]);
                            } else {
                              setTimeslots(timeslots.filter((i) => i !== value));
                            }
                          }}
                        />
                        <ListItemText primary={value} />
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
            <div className="centered-input mb-6">
              <label className="block text-gray-700 font-bold mb-2">Venue Image</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                label="VenueImage"
                value={venueImage}
                onChange={(e) => setVenueImage(e.target.value)}
                required
                placeholder="Enter Venue Image URL"
              />
            </div>
            <div className="button-center" type="submit">
              <button className="button main-btn" type="submit" onClick={onSubmit}>
                ADD
              </button>

              {showPopup && <PopupMessage />}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}