import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { useState, useEffect, useRef } from "react";
import { stringify } from "querystring";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const IndexPage: React.FC<PageProps> = () => {
  const [doubleKnit, setDoubleKnit] = useState(``);
  const [systems, setSystems] = useState(``);
  const [copyRight, setCopyRight] = useState(``);
  const [helpPrompt, setHelpPrompt] = useState(``);
  const [output, setOutput] = useState([``]);

  const [prompt, setPrompt] = useState(`user-0 (/) $`);
  const [cmdInput, setCmdInput] = useState(``);
  const [wd, setWd] = useState(`/`);
  const [fs, setfs] = useState({
    "/": {
      type: "d",
      children: {
        education: {
          type: "d",
          children: {
            ".": { type: "f", content: "education" },
            "..": { type: "f", content: "/" },
          },
        },
        experience: {
          type: "d",
          children: {
            ".": { type: "f", content: "education" },
            "..": { type: "f", content: "/" },
          },
        },
      },
    },
  });

  const help = () => {
    console.log("help is here");
    let commandList = Object.keys(commands)
    console.log(commandList)
    setOutput((oldOutput) => oldOutput.concat(prompt + " " + cmdInput))
    setOutput((oldOutput) => oldOutput.concat(commandList))
  };

  const commands: { [key: string]: { "-h"?: string; action?: Function } } = {
    pwd: { "-h": "Prints current working directory" },
    ls: { "-h": "Prints contents of current directory" },
    help: { action: help },
  };

  const text = `
  ______                     __       __         ___  ____             _   _     
 |_   _ \`.                  [  |     [  |       |_  ||_  _|           (_) / |_   
   | | \`. \\  .--.   __   _   | |.--.  | | .---.   | |_/ /    _ .--.   __ \`| |-'  
   | |  | |/ .'\`\\ \\[  | | |  | '/'\`\\ \\| |/ /__\\\\  |  __'.   [ \`.-. | [  | | |    
  _| |_.' /| \\__. | | \\_/ |, |  \\__/ || || \\__., _| |  \\ \\_  | | | |  | | | |,   
 |______.'  '.__.'  '.__.'_/[__;.__.'[___]'.__.'|____||____|[___||__][___]\\__/                                       
`;

  const text1 = `
    ______                   _                                                    
  .' ____ \\                 / |_                                                  
  | (___ \\_|  _   __  .--. \`| |-'.---.  _ .--..--.   .--.                         
   _.____\`.  [ \\ [  ]( (\`\\] | | / /__\\\\[ \`.-. .-. | ( (\`\\]                        
  | \\____) |  \\ '/ /  \`'.'. | |,| \\__., | | | | | |  \`'.'.                        
   \\______.'[\\_:  /  [\\__) )\\__/ '.__.'[___||__||__][\\__) )
             \\__.'
`;

  const copyRightText = `1965 Andrew Niemack`;
  const helpText = `Enter 'help' to view the list of valid commands.`;

  let i = 0;
  const writer = async (
    text: string,
    foo: { (value: React.SetStateAction<string>): void; (arg0: string): void }
  ) => {
    for (const char of text) {
      foo((old: string) => old + char);
      await delay(1);
    }
  };

  const processor = (args: string[], foo: Function) => {
    foo(args);
  };

  useEffect(() => {
    writer(text, setDoubleKnit);
    if (doubleKnit.length == text.length) {
      writer(text1, setSystems);
    }
  }, []);

  useEffect(() => {
    if (doubleKnit.length == text.length) {
      writer(text1, setSystems);
    }
  }, [doubleKnit]);

  useEffect(() => {
    if (doubleKnit.length == text.length && systems.length == text1.length) {
      writer(copyRightText, setCopyRight);
    }
  }, [doubleKnit, systems]);

  useEffect(() => {
    if (
      doubleKnit.length == text.length &&
      systems.length == text1.length &&
      copyRight.length == copyRightText.length
    ) {
      writer(helpText, setHelpPrompt);
    }
  }, [doubleKnit, systems, copyRight]);

  const cmdController = (value: string) => {
    setCmdInput(value);
  };

  const processCmd = () => {
    console.log("hello");
    console.log(cmdInput);
    if (cmdInput in commands) {
      console.log("valid");
      processor([""], commands[cmdInput].action!);
    } else {
      console.log("invalid");
    }
    setCmdInput(``);
  };

  return (
    <main className="h-[100vh] w-[100vw] bg-stone-900 font-mono overflow-auto crt">
      <pre className="text-white p-0 m-0">
        <code>{doubleKnit}</code>
      </pre>
      <pre className="text-white p-0 m-0">
        <code>{systems}</code>
      </pre>
      <div
        className={
          doubleKnit.length == text.length && systems.length == text1.length
            ? "text-white m-4"
            : "hidden"
        }
      >
        &copy;{copyRight}
      </div>
      <div
        className={
          doubleKnit.length == text.length &&
          systems.length == text1.length &&
          copyRight.length == copyRightText.length
            ? "text-white m-4"
            : "hidden"
        }
      >
        {helpPrompt}
      </div>
      <div
        className={
          doubleKnit.length == text.length &&
          systems.length == text1.length &&
          copyRight.length == copyRightText.length &&
          helpPrompt.length == helpText.length &&
          output.length > 1
            ? "text-gray-400"
            : "hidden"
        }
      >
        {output.map((line) => (
          <div
            key={output.indexOf(line)}
            className="flex flex-row m-5 space-x-2 mt-0 mb-0"
          >
            {line}
          </div>
        ))}
      </div>
      <div
        className={
          doubleKnit.length == text.length &&
          systems.length == text1.length &&
          copyRight.length == copyRightText.length &&
          helpPrompt.length == helpText.length
            ? "flex flex-row m-5 space-x-2"
            : "hidden"
        }
      >
        <div className="text-white whitespace-nowrap">{prompt}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            processCmd();
          }}
          className="w-full"
        >
          <input
            className="w-full bg-stone-900 text-white focus:outline-none"
            type="text"
            name="cmdline"
            value={cmdInput}
            onChange={(e) => cmdController(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
