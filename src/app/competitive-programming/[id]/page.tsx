'use client'
import React from "react";
import CodeEditor from "@/components/CodeEditor";
import LanguageSelector from "@/components/LanguageSelector";
import OutputPanel from "@/components/OutputPanel";
import PageGuard from "@/components/PageGuard";

const STARTER_CODE = {
    javascript: `Example:\n console.Log("Hello, Yenyen!");`,
    python: `#Example:\n print("Hello, Yenyen!")`,
    cpp: `// Example:\n cout << "Hello, Yenyen!";`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Yenyen!");
    }
}`
}

export default function Page() {
  

  const [code, setCode] = React.useState<string>("");
  const [output, setOutput] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("javascript");
  const [error, setError] = React.useState<string>("");
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  React.useEffect(() => {
   setCode(STARTER_CODE[language as keyof typeof STARTER_CODE]);
  }, [language]);

  const handleRun = async () => {
    setIsRunning(true);
    setError("");
    setOutput("");
    
    try{
      if(code.trim() === ""){
        throw new Error("Please enter some code to run");
      }

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language })
      });

      const data = await response.json();

      if(data.error){
        setError(data.error);
      } else {
        setOutput(data.output);
      }
    } catch (error) {
      setError("An error occurred while running the code: " + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <PageGuard competitionId="1" should_use_is_page_locked={true} shouldRedirectOnClose={true}>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-8 px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white mb-4">Competitive Programming (params.id)</h1>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <button
        onClick={handleRun}
        disabled={isRunning}
        className={`px-6 py-2 rounded-md font-semibold transition-colors ${
          isRunning
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-blue-700 text-white hover:bg-blue-800"
        }`}
        >
        {isRunning ? "Running..." : "Run Code"}
        </button>
      </div>
      <CodeEditor code={code} setCode={setCode} />
      <OutputPanel output={output} error={error} />
      </div>
    </div>
    </PageGuard>
  );
}