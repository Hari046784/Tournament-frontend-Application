import React from 'react';
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TournamentsRecords from './Components/TournamentsRecords/TournamentsRecords';
import UpdateTournaments from './Components/TournamentsRecords/UpdateTournamentRecords.js';
import InsertTournament from './Components/TournamentsRecords/InsertTournamentsRecord';
import ParticipantRecords from './Components/ParticipantsRecords.js/ParticipantRecords';
import UpdateParticipant from './Components/ParticipantsRecords.js/UpdateParticipantRecords';
import InsertParticipant from './Components/ParticipantsRecords.js/InsertParticipantRecords';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/Home/HomePage';


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/atournament" element={<TournamentsRecords />} />
          <Route path='/tournament/create' element = {<InsertTournament />} />
          <Route path='/tournament/edit/:id' element = {<UpdateTournaments/>} />

          <Route path="/aparticipant" element={<ParticipantRecords />} />
          <Route path='/participant/create' element = {<InsertParticipant />} />
          <Route path='/participant/edit/:id' element = {<UpdateParticipant/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
