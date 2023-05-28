import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../URLData";

const UpdateParticipant = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [participantDetails, setParticipantDetails] = useState({
        tournamentName: "",
        name: "",
        age: "",
        rallyType: "",
        email: "",
        contactNumber: ""
    });

    useEffect(()=>{
        const id = params.id;
        axios.get(`${BASE_URL}/participant/${id}`).then((response)=>{
            setParticipantDetails(response.data);
            console.log("Response:", response.data);
        }).catch(error =>{
            console.log("Error:", error);
        })
    },[params.id]);


    const handleChange = (value) => {
        return setParticipantDetails((participant) => {
            return {...participant, ...value}
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Participant Details:", participantDetails);
        try{
            const id = params.id;
            const response = await axios.put(`${BASE_URL}/participant/edit/${id}`, participantDetails);
            if(response) {
                setParticipantDetails({
                    tournamentName: "",
                    name: "",
                    age: "",
                    rallyType: "",
                    email: "",
                    contactNumber: ""
                });
                navigate("/aparticipant");
            };
        }catch (error) {
            console.log("Error while updating a participant:", error);
        };
    };


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="fs-2">Participant</Navbar.Brand>
                    <Nav className="me-auto">
                    </Nav>
                </Container>
            </Navbar>
            <div className="center my-3">
                <h2>Update Participant Records</h2>
            </div>

            <Form onSubmit={handleSubmit} className="container form my-2">
                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Tournament Name</Form.Label>
                    <Form.Control type="text" id="Tname" placeholder="Enter Tournament Name" required 
                        value={participantDetails.tournamentName}
                        onChange={event => handleChange({tournamentName: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" id="name" placeholder="Enter Your Name" required 
                        value={participantDetails.name}
                        onChange={event => handleChange({name: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" id="age" placeholder="Eg:20" required 
                        value={participantDetails.age}
                        onChange={event => handleChange({age: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Rally Type</Form.Label>
                    <Form.Control type="text" id="RType" placeholder="Eg:Single or Double" required 
                        value={participantDetails.rallyType}
                        onChange={event => handleChange({rallyType: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter Your Email" required 
                        value={participantDetails.email}
                        onChange={event => handleChange({email: event.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3 col-md-4">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="num" id="contact" placeholder="Enter Contact Number" required 
                        value={participantDetails.contactNumber}
                        onChange={event => handleChange({contactNumber: event.target.value})} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-3 col-md-2 my-2">Update Participant</Button>
            </Form>
        </>
    );
};

export default UpdateParticipant;