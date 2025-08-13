import React from 'react'

interface LanguageSelectorProps {
    language: string;
    setLanguage: (language: string) => void;
}

function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
    const languages = [
        {id: "javascript", name: "Javascript (Node.js 12.14.0)"},
        {id: "python", name: "Python (3.8.5)"},
        {id: "cpp", name: "C++ (GCC 9.3.0)"},
        {id: "java", name: "Java (OpenJDK 11.0.8)"},
    ]
    return (
      <select value={language} onChange={(e) => setLanguage(e.target.value)}
      className='bg-gray-900 border text-white border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-500'>
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
  )
}

export default LanguageSelector