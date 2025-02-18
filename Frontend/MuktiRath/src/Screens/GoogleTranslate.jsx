import React, { useEffect, useState } from 'react';
import language from '../Screens/languages.png';

const GoogleTranslate = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ur', name: 'Urdu' },
  ];

  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
  }, []);

  const handleTranslate = (lang) => {
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = lang;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="fixed z-50 bottom-5 right-5 flex flex-col items-center">
      <div id="google_translate_element" className="hidden"></div>

      
      {showDropdown && (
        <div className="absolute bottom-14 right-0 w-48 z-50 bg-white border rounded-md shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                handleTranslate(lang.code); 
                setShowDropdown(false); 
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-4 bg-white h-20 w-20 text-white rounded-lg hover:bg-gray-100 transition"
      >
        <img src={language} alt="Translate" className='h-full w-full scale-125' />
      </button>
    </div>
  );
};

export default GoogleTranslate;
