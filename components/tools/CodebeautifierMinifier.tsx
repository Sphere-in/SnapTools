"use client";

import { useState } from "react";
import beautify from "js-beautify";
import { Button } from "../ui/button";

export default function Codebeautifierminifier() {
    const [code, setCode] = useState("// write your code here");
    const [output, setOutput] = useState("");

    const beautifyCode = () => {
        setOutput(beautify.js(code));
    };

    const minifyCode = () => {
        setOutput(code.replace(/\s+/g, " ").trim());
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                className="w-full h-40 p-2 border rounded bg-gray-100 dark:bg-gray-800 text-sm"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex gap-2">
                <Button onClick={beautifyCode} className="btn btn-primary w-full">Beautify</Button>
                <Button onClick={minifyCode} className="btn btn-secondary w-full">Minify</Button>
            </div>
            <textarea
                className="w-full h-40 p-2 border rounded bg-gray-100 dark:bg-gray-800 text-sm"
                value={output}
                readOnly
            />
        </div>
    );
}
