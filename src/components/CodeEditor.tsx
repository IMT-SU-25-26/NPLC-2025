import React from 'react'

interface CodeEditorProps {
    code:string;
    setCode: (code: string) => void;
}

function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <div className='h-full rounded-lg bg-gray-800 border border-gray-700 p-4 overflow-hidden'>
      <textarea value={code} 
      onChange={(e) => setCode(e.target.value)} 
       className='w-full h-full bg-transparent text-white resize-none focus:outline-none text-gray-10 font-mono text-sm'
       placeholder='Write your code here...'
       spellCheck="false"
       />
    </div>
  )
}

export default CodeEditor