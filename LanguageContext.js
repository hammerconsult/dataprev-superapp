import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from './translation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega o idioma salvo ao iniciar o app
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage) {
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Erro ao carregar idioma:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedLanguage();
  }, []);

  const changeLanguage = async (langCode) => {
    try {
      await AsyncStorage.setItem('userLanguage', langCode);
      setCurrentLanguage(langCode);
      return true;
    } catch (error) {
      console.error('Erro ao salvar idioma:', error);
      return false;
    }
  };

  // Mapeia códigos de idioma para os valores exibidos na interface
  const getDisplayLanguage = (code) => {
    switch (code) {
      case 'en': return 'Inglês';
      case 'es': return 'Español';
      case 'pt': default: return 'Português (Padrão)';
    }
  };

  // Mapeia valores exibidos na interface para códigos de idioma
  const getLanguageCode = (display) => {
    switch (display) {
      case 'Inglês': return 'en';
      case 'Español': return 'es';
      case 'Português (Padrão)': default: return 'pt';
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      isLoading, 
      t,
      getDisplayLanguage,
      getLanguageCode
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
