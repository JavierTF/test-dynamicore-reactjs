import React, { ChangeEvent } from 'react';
import { TLanguage, TLanguages } from '../../types/common.type';

interface LanguageSelectorProps {
    currentLanguage: TLanguage;
    onLanguageChange: (language: TLanguage) => void;
    availableLanguages: TLanguages[];
    text: any;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    currentLanguage,
    onLanguageChange,
    availableLanguages,
    text
}) => {
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onLanguageChange(e.target.value as TLanguage);
    };

    return (
        <div className="language-selector">
            <label htmlFor="language-select" style={{ marginRight: '10px' }}>{text?.common?.idiomSelect}</label>
            <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                aria-label="Select language"
            >
                {availableLanguages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;