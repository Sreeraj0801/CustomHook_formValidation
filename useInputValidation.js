import { useState } from 'react';
import { ClipboardEvent } from "react"

const useInputValidation = () => {
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    pword: '',
    confirmPword: '',
  });

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    pword: '',
    confirmPword: '',
  });

  const handleInputChange = async (e) => {
    const alphaRegex = /^[a-zA-Z\s]+$/;
    let { name, value } = e.target;
    if(name==='fname') value= value.trim();
    let error = '';
    if (!value.trim()) {
      error = `${name} is required`;
    } else if (name === 'fname') {
      if (!/^[a-zA-Z]{3,}$/.test(value)) error = 'minimum 3 characters';
      if (!/^[a-zA-Z]+$/ .test(value)) error = 'Only alphabets required';
    } else if (name === 'lname' && !alphaRegex.test(value)) {
      error = 'No special characters allowed';
    } else if (
      name === 'email' &&
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      error = 'Invalid email address';
    } else if (name === 'mobile' && !/^[6-9]\d{9}$/.test(value)) {
      error = 'Invalid mobile Number';
    } else if (
      (name === 'pword' || name === 'confirmPword') &&
      value.length < 6
    ) {
       ClipboardEvent
      error = 'Password must be at least 6 characters';
    } else if (name === 'confirmPword' && value !== formData.pword) {
      error = 'Passwords do not match';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; 

  const [isValid,setIsValid] = useState(false) ; 
  
  const checkSubmit = async(e) => {
    e.preventDefault();
    let isFormValid = true;
     for (const key in formData) {
      if(!formData[key].trim()) {
        isFormValid = false;
        break;
      }
    }
    setIsValid(isFormValid);
  };

  return { handleInputChange, checkSubmit, formData, errors ,isValid };
};

export default useInputValidation;
