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

    const[isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        reason: "",
        terms: ""
    });

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a req. field"),
        email: yup.string().email("Must be a valid email address").required(),
        terms: yup.boolean().oneOf([true], "Please agree to Terms & Conditions"),
        password: yup.string().required("password required"),
        reason: yup.string().required("Fill out squad expectations")
    });

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: ""  })
            })
            .catch(err => {
                console.log("error: ", err)
                setErrors({ ...errors, [e.target.name]: err.errors[0]})
            })
    };

    console.log("error state: ", errors);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid)
            setIsButtonDisabled(!valid)
        })
    }, [formState])

    const formSubmit = e => {
        e.preventDefault();
        console.log("submit successful")
    };

    const valueChange = e => {
        console.log("input changed!", e.target.value)
        e.persist()
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e)
        setFormState(newFormData)
    };

    return (
        <form>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={valueChange}
                    value={formState.name}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>

            <label htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                    onChange={valueChange}
                    value={formState.email}
                />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            </label>

            <label htmlFor="password">
                Password
                <input 
                    type="text"
                    name="password"
                    id="password"
                    onChange={valueChange}
                    value={formState.password}
                />
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>

            <label htmlFor="reason">
                What are you loking for in a squad?
                <textarea 
                    name="reason"
                    onChange={valueChange}
                    value={formState.reason}
                />
            </label>

            <label htmlFor="terms">
                <input 
                    type="checkbox"
                    name="terms"
                    checked={formState.checked}
                    onChange={valueChange}
                />
                Terms & Conditions
            </label>

            <button type="submit" disabled={isButtonDisabled}>Submit</button>
        </form>
    );
}