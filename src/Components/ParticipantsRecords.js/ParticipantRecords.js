import axios from "axios";
import { BASE_URL } from "../../URLData";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Participants.css";

const ParticipantRecords = () => {
    const [ParticipantsList, setParticipantsList] = useState([]);

    useEffect(()=>{
        getParticipants();
    },[]);

    const getParticipants = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/participant/all`);
            console.log("response:",response);
            if(response) {
                setParticipantsList(response.data);
            }
        } catch (error) {
            console.log("Error", error);
        };
    };

    const handleDelete =async (id) => {
        try {
            let confirmation = window.confirm("Shall we proceed to delete?");
            if(confirmation) {
            const response = await axios.delete(`${BASE_URL}/participant/delete/${id}`);
            if(response) {
                getParticipants();
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
                        <Navbar.Brand className="fs-2">Participants Records </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/participant/create" className="fs-5" >
                                Insert Participants Records
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <div className="center my-3">
                    <h3>View Participants Records</h3>
                </div>

                <Table striped bordered hover responsive="sm" className="container">
                    <thead className="text-center">
                        <tr>
                            <th>Tournament Name</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Rally Type</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {ParticipantsList.map((participant, index)=>(
                        <tr key={index}>
                            <td>{participant.tournamentName}</td>
                            <td>{participant.name}</td>
                            <td>{participant.age}</td>
                            <td>{participant.rallyType}</td>
                            <td>{participant.email}</td>
                            <td>{participant.contactNumber}</td>
                            <td>
                                <Link className=" btn btn-warning" to={`/participant/edit/${participant._id}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(participant._id)}>
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

export default ParticipantRecords;