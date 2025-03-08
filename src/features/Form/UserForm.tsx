import React, { useState, FormEvent } from 'react';
import FormComponent from './FormComponent';
import { FormErrors, SubmittedData } from '../../types/form.type';

interface UserFormProps {
    text: any;
}

const UserForm = ({ text }: UserFormProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const textForm = text?.form;
    const textValidation = textForm?.validation;

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const newErrors: FormErrors = {};

        if (!name) {
            newErrors.name = textValidation?.nameRequired;
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name)) {
            newErrors.name = textValidation?.nameLettersOnly;
        }

        if (!email) {
            newErrors.email = textValidation?.emailRequired;
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            newErrors.email = textValidation?.emailInvalid;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmittedData({ name, email });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setErrors({});
        setEmail(e.target.value);
    };

    return (
        <FormComponent
            name={name}
            email={email}
            errors={errors}
            submittedData={submittedData}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handleSubmit={handleSubmit}
            text={text}
        />
    );
};

export default UserForm;