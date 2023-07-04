import { useState } from 'react';
const useSignUpForm = (callback) => {
    const [input, setInput] = useState({});
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }
    const handleInputChange = (event) => {
        event.persist();
        setInput(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }
    return {
        input, handleSubmit, handleInputChange
    };
}

export default useSignUpForm