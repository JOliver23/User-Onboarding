import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form() {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        reason: "",
        terms: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        reason: "",
        terms: ""
    });

    const formSchema = yup.object().shape({
        name: yup.string().required("Nameis a req. field"),
        email: yup.string().email("Must be a valid email address").required(),
        terms: yup.boolean().oneOf([true], "Please agree to Terms & Conditions"),
        password: yup.string().required(),
        reason: yup.string().required("Fill out squad expectations")
    });

    const formSubmit = e => {
        e.preventDefault();
        console.log("submit successful")
    };

    const valueChange = e => {
        console.log("input changed!1", e.target.value)
        setFormState({[e.target.name]:  e.target.value})
    };

    return (
        <form>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    id="name"
                    name="name"
                />
            </label>

            <label htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                />
            </label>

            <label htmlFor="password">
                Password
                <input 
                    type="text"
                    name="password"
                    id="password"
                />
            </label>

            <label htmlFor="reason">
                What are you loking for in a squad?
                <textarea 
                    name="reason"
                />
            </label>

            <label htmlFor="terms">
                <input 
                    type="checkbox"
                    name="terms"
                    checked={true}
                />
                Terms & Conditions
            </label>

            <button type="submit">Submit</button>
        </form>
    );
}