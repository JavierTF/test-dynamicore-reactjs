import { useEffect, useState } from 'react';
import './App.css';
import UserList from './features/List/UserList';
import UserForm from './features/Form/UserForm';
import LanguageSelector from './features/Language/LanguageSelector';
import { langs } from './mocks/common';
import { saveLanguageToCache, getLanguageFromCache } from './utils/functions';
import { TLanguage } from './types/common.type';
import useLanguage from './hooks/useLanguage';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState<TLanguage>(getLanguageFromCache());
  const { text, setLanguage } = useLanguage(currentLanguage);
  
  const handleLanguageChange = (language: TLanguage): void => {
    setCurrentLanguage(language);
    saveLanguageToCache(language);
    setLanguage(currentLanguage);
  };

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <LanguageSelector 
          currentLanguage={currentLanguage} 
          onLanguageChange={handleLanguageChange} 
          availableLanguages={langs}
          text={text}
        />
        <UserForm text={text} />
        <UserList text={text} />
      </div>
    </div>
  );
};

export default App;