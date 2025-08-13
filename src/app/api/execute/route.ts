import { NextResponse } from "next/server";

const LANGUAGE_IDS = {
    javascript: 63, // Node js
    python: 71, // Python 3
    cpp: 54, // C++
    java: 62, // Java
};

const JUDGE0_API = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;

async function submitCode(sourceCode: string, languageId: number){
    const response = await fetch(`${JUDGE0_API}/submissions`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": RAPID_API_KEY!,
            "X-RapidAPI-Host": RAPID_API_HOST!
        },
        body: JSON.stringify({
            source_code: sourceCode,
            language_id: languageId,
            stdin: "",
        })
    });
    if (!response.ok) {
        const text = await response.text();
        console.error("Judge0 submit error:", response.status, text);
        throw new Error(`Judge0 submit error: ${response.status} - ${text}`);
    }
    const data = await response.json();
    return data.token;
}

async function getResult(token: string){
    const response = await fetch(`${JUDGE0_API}/submissions/${token}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": RAPID_API_KEY!,
            "X-RapidAPI-Host": RAPID_API_HOST!
        }
    });
    if (!response.ok) {
        const text = await response.text();
        console.error("Judge0 getResult error:", response.status, text);
        throw new Error(`Judge0 getResult error: ${response.status} - ${text}`);
    }
    const data = await response.json();
    return data;
}

export async function POST(request: Request) {
    try{
        const { code, language } = await request.json();

        const languageId = LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS];
        if(!languageId){
            return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
        }

        let sourceCode = code;

        // submit the code for execution
        const token = await submitCode(sourceCode, languageId);

        // wait for result with timeout
        let result;
        for(let i = 0; i < 10; i++){
            await new Promise((resolve) => setTimeout(resolve, 1000));
            result = await getResult(token);
            // Defensive: check result and result.status
            if(result && result.status && typeof result.status.id === "number" && result.status.id !== 1 && result.status.id !== 2) {
                break;
            }
        }

        // Defensive: check result and result.status
        if (!result || !result.status) {
            console.error("Judge0 result missing status:", result);
            return NextResponse.json({
                output: null,
                error: "Failed to get status from Judge0. Please try again.",
            }, { status: 500 });
        }

        // handle diff status codes
        if(result.status.id === 3){
            // accepted
            return NextResponse.json({
                output: result.stdout || "Code executed successfully with no output.",
                error: null,
            });
        }else if(result.status.id === 6){
            // compilation error
            return NextResponse.json({
                output: null,
                error: result.compile_output,
            });
        }else if(result.stderr){
            return NextResponse.json({
                output: null,
                error: result.stderr,
            });
        }else {
            return NextResponse.json({
                output: null,
                error: result.status.description || "Unknown error",
            });
        }

    } catch (error) {
        console.error("API /api/execute error:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}