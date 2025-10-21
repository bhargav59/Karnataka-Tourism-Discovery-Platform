import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("kn"); // Default to Kannada

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") || "kn";
    setLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "kn" ? "en" : "kn";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, switchLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
