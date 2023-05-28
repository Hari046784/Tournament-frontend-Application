import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tournamentFrom, setTournamentForm] = useState({ name: "", startDate: "", endDate: "", email: "", contactNumber: "", status: ""});
  const [tournaments, setTournaments] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [participantForm, setParticipantForm] = useState({ name: "", age: "", rallyType: "", email: "", contactNumber: "", tournamentId: "" })

  useEffect(() => {
    fetchTournaments();
  }, []);

  const createTournament = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/tournament/create", tournamentFrom);
      // setTournamentForm({ name: "", startDate: "", endDate: "", email: "", contactNumber: "", status: ""});
      setTournamentForm([]);
      fetchTournaments();
    } catch (error) {
      console.log("Error:",error)
    };
  };

  const fetchTournaments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tournament/all");
      setTournaments(response.data);
    } catch (error) {
      console.log("Error:",error);
    };
  };

  const deleteTournament = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tournament/delete/${id}`);
      fetchTournaments();
    } catch (error) {
      console.log("Error:",error);
    };
  };

  const fetchParticipants = async (tournamentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/participantoftournament/${tournamentId}`);
      setParticipants(response.data);
    } catch (error) {
      console.log("Error:",error);
    };
  };

  const createParticipant = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/participant/create", participantForm);
      setParticipantForm({ name: "", age: "", rallyType: "", email: "", contactNumber: "", tournamentId: "" });
      fetchParticipants(participantForm.tournamentId);
    } catch (error) {
      console.log("Error:",error);
    };
  };





  return (
    <div className="container">
      <h2>Tournaments</h2>
      <form className="form-container" onSubmit={createTournament}>
        <input
         type="text"
         className='input-field'
         placeholder="Enter tournament name"
         value={tournamentFrom.name}
         onChange={(e) => setTournamentForm({...tournamentFrom, name: e.target.value})}
         required
        />

        <input
         type="date"
         className='input-field'
         placeholder="Enter Start Date"
         value={tournamentFrom.startDate}
         onChange={(e) => setTournamentForm({...tournamentFrom, startDate: e.target.value})}
         required
        />

        <input
         type="date"
         className='input-field'
         placeholder="Enter End Date"
         value={tournamentFrom.endDate}
         onChange={(e) => setTournamentForm({...tournamentFrom, endDate: e.target.value})}
         required
        />

        <input
         type='email'
         className='input-field'
         placeholder="Enter your Email"
         value={tournamentFrom.email}
         onChange={(e) => setTournamentForm({...tournamentFrom, email: e.target.value})}
         required
        />

        <input
         type='num'
         className='input-field'
         placeholder="Enter your contact No"
         value={tournamentFrom.contactNumber}
         onChange={(e) => setTournamentForm({...tournamentFrom, contactNumber: e.target.value})}
         required
        />

        <input
         type="text"
         className='input-field'
         placeholder="Enter Status"
         value={tournamentFrom.status}
         onChange={(e) => setTournamentForm({...tournamentFrom, status: e.target.value})}
         required
        />

        <button type='submit' className='button'>Create Tournament</button>
      </form>

      <ul className="list">
        {tournaments.map((tournament) => (
          <li key={tournament._id} className="list-item">
            <span>{tournament.name}</span>
            <button onClick={() => deleteTournament(tournament._id)} className="button">Delete</button>
            <button onClick={() => fetchParticipants(tournament._id)} className="button">View Participants</button>
          </li>
        ))}
      </ul>


      <h2 className='heading'>Participants</h2>
      <form className='form-container' onSubmit={createParticipant}>
          <select
            className='input-field'
            value={participantForm.tournamentId}
            onChange={(e) => setParticipantForm({...participantForm, tournamentId: e.target.value }) }
            required
          >
            <option>Select Tournament</option>
            {tournaments.map((tournament) => (
              <option key={tournament._id} value={tournament._id}>{tournament.name}</option>
            ))};
          </select>

          <input
            type="text"
            className='input-field'
            placeholder="Enter Participant Name"
            value={participantForm.name}
            onChange={(e) => setParticipantForm({...participantForm, name: e.target.value})}
            required
          />

          <input
            type="number"
            className='input-field'
            placeholder="Enter Participant age"
            value={participantForm.age}
            onChange={(e) => setParticipantForm({...participantForm, age: e.target.value})}
            required
          />

          <input
            type="text"
            className='input-field'
            placeholder="Enter Rally Type"
            value={participantForm.rallyType}
            onChange={(e) => setParticipantForm({...participantForm, rallyType: e.target.value})}
            required
          />

        <input
         type='email'
         className='input-field'
         placeholder="Enter your Email"
         value={participantForm.email}
         onChange={(e) => setParticipantForm({...participantForm, email: e.target.value})}
         required
        />

        <input
         type='num'
         className='input-field'
         placeholder="Enter your contact No"
         value={participantForm.contactNumber}
         onChange={(e) => setParticipantForm({...participantForm, contactNumber: e.target.value})}
         required
        />

        <button type='submit' className='button'>Add Participant</button>

      </form>

      <ul className='list'>
        {participants.map((participant) => (
          // console.log(participant._id)
          <li key={participant._id} className='list-item'><span>{participant.name}</span></li>
        ))}
      </ul>

    </div>
  );
}

export default App;
