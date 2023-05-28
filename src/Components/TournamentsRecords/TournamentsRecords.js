import axios from "axios";
import { BASE_URL } from "../../URLData";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Tournaments.css";

const TournamentsRecords = () => {
    const [TournamentsList, setTournamentsList] = useState([]);

    useEffect(()=>{
        getTournaments();
    },[]);

    const getTournaments = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tournament/all`);
            console.log("response:",response);
            if(response) {
                setTournamentsList(response.data);
            }
        } catch (error) {
            console.log("Error", error);
        };
    };

    const handleDelete =async (id) => {
        try {
            let confirmation = window.confirm("Shall we proceed to delete?");
            if(confirmation) {
            const response = await axios.delete(`${BASE_URL}/tournament/delete/${id}`);
            if(response) {
                getTournaments();
            };    
        };
        } catch (error) {
            console.log("Error", error);
        };
    };

    return (
        <>
            <div className="arrange">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand className="fs-2">Tournaments Records </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/tournament/create" className="fs-5" >
                                Insert Tournaments Records
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <div className="center my-3">
                    <h3>View Tournaments Records</h3>
                </div>

                <Table striped bordered hover responsive="sm" className="container">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Status</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {TournamentsList.map((tournament, index)=>(
                        <tr key={index}>
                            <td>{tournament.name}</td>
                            <td>{tournament.startDate}</td>
                            <td>{tournament.endDate}</td>
                            <td>{tournament.email}</td>
                            <td>{tournament.contactNumber}</td>
                            <td>{tournament.status}</td>
                            <td>
                                <Link className=" btn btn-warning" to={`/tournament/edit/${tournament._id}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(tournament._id)}>
                                <i className="fa-solid fa-trash"></i>
                                </Button>
                            </td>
                        </tr>     
                        ))}
                        
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default TournamentsRecords;