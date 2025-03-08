import React, { FormEvent, ChangeEvent } from 'react';
import { FormErrors, SubmittedData } from '../../types/form.type';
import useLanguage from '../../hooks/useLanguage';
import { getLanguageFromCache } from '../../utils/functions';

interface FormComponentProps {
    name: string;
    email: string;
    errors: FormErrors;
    submittedData: SubmittedData | null;
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    text: any;
}

const FormComponent = ({
    name,
    email,
    errors,
    submittedData,
    handleNameChange,
    handleEmailChange,
    handleSubmit,
    text
}: FormComponentProps) => {
    const textForm = text?.form;
    const textLabels = textForm?.labels;
    const textSubmittedData = textForm?.submitteddata;

    const styles: { [key: string]: React.CSSProperties } = {
        formContainer: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            textAlign: 'left'
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
        },
        inputError: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ff0000',
            borderRadius: '4px',
            boxSizing: 'border-box'
        },
        errorMessage: {
            color: '#ff0000',
            fontSize: '14px',
            marginTop: '5px',
            display: 'block'
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
        },
        submittedData: {
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            borderLeft: '4px solid #4CAF50'
        },
        heading: {
            color: '#333'
        },
        mandatoryField: {
            color: '#ff0000',
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.heading}>{textForm?.title}</h2>

            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        {textLabels?.name} <span style={styles.mandatoryField}>*</span>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            style={errors.name ? styles.inputError : styles.input}
                        />
                    </label>
                    {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
                </div>

                <br />

                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        {textLabels?.email} <span style={styles.mandatoryField}>*</span>
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            style={errors.email ? styles.inputError : styles.input}
                        />
                    </label>
                    {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
                </div>

                <br />

                <button style={styles.button} type="submit">{textForm?.buttons?.submit}</button>
            </form>

            {submittedData && (
                <div style={styles.submittedData}>
                    <h3 style={styles.heading}>{textSubmittedData?.title}</h3>
                    <p>{textSubmittedData?.title} {submittedData.name}</p>
                    <p>{textSubmittedData?.title} {submittedData.email}</p>
                </div>
            )}
        </div>
    );
};

export default FormComponent;