import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../URLData";

const UpdateTournaments = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [tournamentDetails, setTournamentDetails] = useState({
        name: "",
        startDate: "",
        endDate: "",
        email: "",
        contactNumber: "",
        status: ""
    });

    useEffect(()=>{
        const id = params.id;
        axios.get(`${BASE_URL}/tournament/${id}`).then((response)=>{
            setTournamentDetails(response.data);
            console.log("Response:", response.data);
        }).catch(error =>{
            console.log("Error:", error);
        })
    },[params.id]);


    const handleChange = (value) => {
        return setTournamentDetails((tournament) => {
            return {...tournament, ...value}
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Tournament Details:", tournamentDetails);
        try{
            const id = params.id;
            const response = await axios.put(`${BASE_URL}/tournament/edit/${id}`, tournamentDetails);
            if(response) {
                setTournamentDetails({
                    name: "",
                    startDate: "",
                    endDate: "",
                    email: "",
                    contactNumber: "",
                    status: ""
                });
                navigate("/atournament");
            };
        }catch (error) {
            console.log("Error while updating a tournament:", error);
        };
    };


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="fs-2">Tournament</Navbar.Brand>
                    <Nav className="me-auto">
                    </Nav>
                </Container>
            </Navbar>
            <div className="center my-3">
                <h2>Update Tournament Records</h2>
            </div>

            <Form onSubmit={handleSubmit} className="container form my-2">
                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" id="name" placeholder="Enter Your Name" required 
                        value={tournamentDetails.name}
                        onChange={event => handleChange({name: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="text" id="Sdate" placeholder="Eg:DD/MM/YYYY" required 
                        value={tournamentDetails.startDate}
                        onChange={event => handleChange({startDate: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="text" id="Edate" placeholder="Eg:DD/MM/YYYY" required 
                        value={tournamentDetails.endDate}
                        onChange={event => handleChange({endDate: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter Your Email" required 
                        value={tournamentDetails.email}
                        onChange={event => handleChange({email: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="num" id="contact" placeholder="Enter Contact Number" required 
                        value={tournamentDetails.contactNumber}
                        onChange={event => handleChange({contactNumber: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" id="status" placeholder="Enter Current Status" required 
                        value={tournamentDetails.status}
                        onChange={event => handleChange({status: event.target.value})} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-3 col-md-2 my-2">Update Tournament</Button>
            </Form>
        </>
    );
};

export default UpdateTournaments;