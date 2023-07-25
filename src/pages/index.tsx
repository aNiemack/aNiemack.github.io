import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { useState, useEffect, useRef } from "react";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const IndexPage: React.FC<PageProps> = () => {
  const [doubleKnit, setDoubleKnit] = useState(``);
  const [systems, setSystems] = useState(``);
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

  return (
    <main className="h-[100vh] w-[100vw] bg-stone-900 font-mono">
      <pre className="text-white p-0 m-0">
        <code>{doubleKnit}</code>
      </pre>
      <pre className="text-white p-0 m-0">
        <code>{systems}</code>
      </pre>
      <div
        className={
          doubleKnit.length == text.length && systems.length == text1.length
            ? "flex flex-row m-5 space-x-2"
            : "hidden"
        }
      >
        <div className="text-white whitespace-nowrap">user-0 $</div>
        <input
          className="w-full bg-stone-900 text-white focus:outline-none"
          type="text"
          name="cmdline"
          autoFocus
        />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
