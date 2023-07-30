import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { useState, useEffect, useRef } from "react";
import { FileType, system } from "../content/system";
import {
  text,
  text1,
  copyRightText,
  helpText,
  cowText,
  effectText,
} from "../content/baseText";

/* Wait some amount of time in ms */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const IndexPage: React.FC<PageProps> = () => {
  const [nightHawk, setNightHawk] = useState(``);
  const [systems, setSystems] = useState(``);
  const [copyRight, setCopyRight] = useState(``);
  const [helpPrompt, setHelpPrompt] = useState(``);
  const [output, setOutput] = useState([[``]]);
  const [prompt, setPrompt] = useState(`user-0 (/) $`);
  const [cmdInput, setCmdInput] = useState(``);
  const [wd, setWd] = useState(system.root);

  // Used to keep paged scrolled to bottom.
  const scrollRef = useRef<null | HTMLFormElement>(null);
  const focusRef = useRef<null | HTMLInputElement>(null);

  const scrollToBottom = () => {
    scrollRef.current!.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  // Focus the input when it appears
  const focus = () => {
    focusRef.current!.focus();
  };

  useEffect(() => {
    console.log("here");
    focus();
  }, [helpPrompt]);

  // Creates typewriter effect.
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
    writer(text, setNightHawk);
    if (nightHawk.length == text.length) {
      writer(text1, setSystems);
    }
  }, []);

  useEffect(() => {
    if (nightHawk.length == text.length) {
      writer(text1, setSystems);
    }
  }, [nightHawk]);

  useEffect(() => {
    if (nightHawk.length == text.length && systems.length == text1.length) {
      writer(copyRightText, setCopyRight);
    }
  }, [nightHawk, systems]);

  useEffect(() => {
    if (
      nightHawk.length == text.length &&
      systems.length == text1.length &&
      copyRight.length == copyRightText.length
    ) {
      writer(helpText, setHelpPrompt);
    }
  }, [nightHawk, systems, copyRight]);

  // Handling commands.
  const processor = (args: string[], foo: Function) => {
    foo(args);
  };

  const cmdController = (value: string) => {
    setCmdInput(value);
  };

  const processCmd = () => {
    const input = cmdInput.split(" ");
    const cmd = input[0];
    const args = input.slice(1);
    if (cmd in commands) {
      processor(args, commands[cmd].action!);
    } else {
      const newOutput = [
        `${prompt} ${cmdInput}`,
        `${cmd} is not a known command.`,
      ];
      setOutput([...output, newOutput]);
    }
    setCmdInput(``);
  };

  const help = (args: string[]) => {
    let newOutput: string[];
    if (args.length > 1) {
      newOutput = [
        `${prompt} ${cmdInput}`,
        `Invalid arguments.`,
        `'help' takes no additional arguments.`,
        `Did you mean 'help' or 'help -h'?`,
      ];
      setOutput([...output, newOutput]);
    } else {
      switch (args[0]) {
        case "-h":
          newOutput = [`${prompt} ${cmdInput}`, `${commands.help["-h"]}`];
          setOutput([...output, newOutput]);
          break;
        case undefined:
          newOutput = [`${prompt} ${cmdInput}`].concat(
            Object.entries(commands).map(([k, v]) => `${k} - ${v["-h"]}`)
          );
          setOutput([...output, newOutput]);
          break;
        default:
          newOutput = [
            `${prompt} ${cmdInput}`,
            `Invalid arguments.`,
            `'help' takes no additional arguments.`,
            `Did you mean 'help' or 'help -h'?`,
          ];
          setOutput([...output, newOutput]);
      }
    }
  };

  const pwd = (args: string[]) => {
    let newOutput: string[];
    if (args.length > 1) {
      newOutput = [
        `${prompt} ${cmdInput}`,
        `Invalid arguments.`,
        `'pwd' takes no additional arguments.`,
        `Did you mean 'pwd' or 'pwd -h'?`,
      ];
      setOutput([...output, newOutput]);
    } else {
      switch (args[0]) {
        case "-h":
          newOutput = [`${prompt} ${cmdInput}`, `${commands.pwd["-h"]}`];
          setOutput([...output, newOutput]);
          break;
        case undefined:
          newOutput = [`${prompt} ${cmdInput}`, `${wd.display}`];
          setOutput([...output, newOutput]);
          break;
        default:
          newOutput = [
            `${prompt} ${cmdInput}`,
            `Invalid arguments.`,
            `'pwd' takes no additional arguments.`,
            `Did you mean 'pwd' or 'pwd -h'?`,
          ];
          setOutput([...output, newOutput]);
      }
    }
  };

  const ls = (args: string[]) => {
    let newOutput: string[];
    if (args.length > 1) {
      newOutput = [
        `${prompt} ${cmdInput}`,
        `Too many arguments.`,
        `'ls' expected 1 but got ${args.length}.`,
      ];
      setOutput([...output, newOutput]);
    } else {
      if (wd.children?.map((child) => child.display).includes(args[0])) {
        if (args[0] == ".") {
          newOutput = [`${prompt} ${cmdInput}`].concat(
            wd.children.map((child) => child.display)
          );
          setOutput([...output, newOutput]);
        } else {
          newOutput = [`${prompt} ${cmdInput}`].concat(
            wd
              .children!.filter((child) => child.display == args[0])[0]
              .children!.map((nested) => nested.display)
          );
          setOutput([...output, newOutput]);
        }
      } else {
        switch (args[0]) {
          case "-h":
            newOutput = [`${prompt} ${cmdInput}`, `${commands.ls["-h"]}`];
            setOutput([...output, newOutput]);
            break;
          case undefined:
            newOutput = [`${prompt} ${cmdInput}`].concat(
              wd.children!.map((child) => child.display)
            );
            setOutput([...output, newOutput]);
            break;
          default:
            newOutput = [
              `${prompt} ${cmdInput}`,
              `Invalid arguments.`,
              `${args[0]} not found`,
            ];
            setOutput([...output, newOutput]);
        }
      }
    }
  };

  const cd = (args: string[]) => {
    let newOutput: string[];
    if (args.length > 1) {
      newOutput = [
        `${prompt} ${cmdInput}`,
        `Too many arguments.`,
        `'cd' expected 1 but got ${args.length}.`,
      ];
      setOutput([...output, newOutput]);
    } else {
      if (wd.children?.map((child) => child.display).includes(args[0])) {
        if (args[0] == ".") {
          newOutput = [`${prompt} ${cmdInput}`];
          setOutput([...output, newOutput]);
        } else if (args[0] == "..") {
          newOutput = [`${prompt} ${cmdInput}`];
          setOutput([...output, newOutput]);
          setWd(wd.parent!);
          setPrompt(`user-0 (${wd.parent?.display}) $`);
        } else if (
          wd.children.filter((child) => child.display == args[0])[0].type ==
          FileType.f
        ) {
          newOutput = [
            `${prompt} ${cmdInput}`,
            `${args[0]} is not a directory.`,
          ];
          setOutput([...output, newOutput]);
        } else {
          newOutput = [`${prompt} ${cmdInput}`];
          setOutput([...output, newOutput]);
          setWd(system[args[0]]);
          setPrompt(`user-0 (${args[0]}) $`);
        }
      } else {
        switch (args[0]) {
          case "-h":
            newOutput = [`${prompt} ${cmdInput}`, `${commands.cd["-h"]}`];
            setOutput([...output, newOutput]);
            break;
          default:
            newOutput = [
              `${prompt} ${cmdInput}`,
              `Invalid arguments.`,
              `${args[0]} not found`,
            ];
            setOutput([...output, newOutput]);
        }
      }
    }
  };

  const clear = () => {
    setOutput([[``]]);
  };

  const cat = (args: string[]) => {
    let newOutput: string[];
    if (args.length > 1) {
      newOutput = [
        `${prompt} ${cmdInput}`,
        `Too many arguments.`,
        `'cat' expected 1 but got ${args.length}.`,
      ];
      setOutput([...output, newOutput]);
    } else {
      if (wd.children?.map((child) => child.display).includes(args[0])) {
        if (
          wd.children.filter((child) => child.display == args[0])[0].type !=
          FileType.f
        ) {
          newOutput = [
            `${prompt} ${cmdInput}`,
            `${args[0]} is a directory not a file.`,
          ];
          setOutput([...output, newOutput]);
        } else {
          newOutput = [`${prompt} ${cmdInput}`].concat(
            wd.children!.filter((child) => child.display == args[0])[0].content!
          );
          setOutput([...output, newOutput]);
        }
      } else {
        switch (args[0]) {
          case "-h":
            newOutput = [`${prompt} ${cmdInput}`, `${commands.cat["-h"]}`];
            setOutput([...output, newOutput]);
            break;
          default:
            newOutput = [
              `${prompt} ${cmdInput}`,
              `Invalid arguments.`,
              `${args[0]} not found`,
            ];
            setOutput([...output, newOutput]);
        }
      }
    }
  };

  const cowsay = (args: string[]) => {
    let newOutput: string[];
    switch (args[0]) {
      case "-h":
        newOutput = [`${prompt} ${cmdInput}`, `${commands.cowsay["-h"]}`];
        setOutput([...output, newOutput]);
        break;
      case undefined:
        newOutput = newOutput = [`${prompt} ${cmdInput}`]
          .concat([`< Hello there. >`])
          .concat(cowText);
        setOutput([...output, newOutput]);
        break;
      default:
        newOutput = newOutput = [`${prompt} ${cmdInput}`]
          .concat([`< ${args.join(" ")} >`])
          .concat(cowText);
        setOutput([...output, newOutput]);
    }
  };

  const commands: {
    [key: string]: { "-h"?: string; action?: Function };
  } = {
    pwd: { "-h": "Prints current working directory.", action: pwd },
    cd: { "-h": "Changes the working directory.", action: cd },
    ls: { "-h": "Prints contents of current directory.", action: ls },
    help: { "-h": "Prints the list of valid commands.", action: help },
    clear: { "-h": "Clears all output.", action: clear },
    cat: { "-h": "Print file contents.", action: cat },
    cowsay: { "-h": "Prints entered text.", action: cowsay },
  };

  return (
    <main className="h-[100vh] w-[100vw] bg-stone-900 font-mono overflow-auto crt select-none snap-mandatory">
      <pre className="text-white p-0 m-0">
        <code>{nightHawk}</code>
      </pre>
      <pre className="text-white p-0 m-0">
        <code>{systems}</code>
      </pre>
      <div
        className={
          nightHawk.length == text.length && systems.length == text1.length
            ? "text-white m-4"
            : "hidden"
        }
      >
        &copy;{copyRight}
      </div>
      <div
        className={
          nightHawk.length == text.length && systems.length == text1.length
            ? "text-white m-4"
            : "hidden"
        }
      >
        {effectText}
      </div>
      <div
        className={
          nightHawk.length == text.length &&
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
          nightHawk.length == text.length &&
          systems.length == text1.length &&
          copyRight.length == copyRightText.length &&
          helpPrompt.length == helpText.length &&
          output.length > 1
            ? "text-gray-400 whitespace-pre"
            : "hidden"
        }
      >
        {output.map((block) => (
          <div key={output.indexOf(block)} className="flex flex-col mt-3">
            {block.map((line) => (
              <div
                key={`${output.indexOf(block)}-${block.indexOf(line)}`}
                className="flex flex-row m-5 space-x-2 mt-0 mb-0"
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className={
          nightHawk.length == text.length &&
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
          className="w-full snap-center"
          ref={scrollRef}
        >
          <input
            className="w-full bg-stone-900 text-white focus:outline-none"
            type="text"
            name="cmdline"
            value={cmdInput}
            onChange={(e) => cmdController(e.target.value)}
            ref={focusRef}
          />
        </form>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>NightHawk Systems</title>;
