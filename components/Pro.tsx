import { AxiosError } from "axios";
import React, { FormEventHandler, useEffect, useState } from "react";
import { checkLink, createShortLink } from "../util/util";
import PlusIcon from "../assets/plus.svg";
import MinusIcon from "../assets/minus.svg";
import CancelIcon from "../assets/cancel.svg";
import TerminalIcon from "../assets/terminal.svg";

const Pro = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "help: for help",
  ]);

  const [command, setCommand] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingContent, setLoadingContent] = useState<string>(".");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    if (!loading) return;

    const intervalId = setInterval(() => {
      setLoadingContent(loadingContent + ".");
      setI(i + 1);
      if (i == 2) {
        setLoadingContent(".");
        setI(0);
      }
    }, 500);
    return () => clearInterval(intervalId);
  }, [loading, i]);

  const help = () => {
    setCommandHistory([
      ...commandHistory,
      `cat@vampire:${command}`,
      "HELP MENU",
      "help: help menu",
      "create [link]: creating a short link for the provided link",
      "clear: clears the console",
    ]);
  };

  const clear = () => {
    setCommandHistory([]);
  };

  const create = async (link: string) => {
    if (!checkLink(link))
      return setCommandHistory([
        ...commandHistory,
        `cat@vampire:${command}`,
        "Invalid Url",
      ]);
    try {
      const response = await createShortLink(link);
      setCommandHistory([
        ...commandHistory,
        `cat@vampire:${command}`,
        `new short link ${response.data.newLink.short || ""}`,
      ]);
    } catch (error: AxiosError | any) {
      setCommandHistory([
        ...commandHistory,
        `cat@vampire:${command}`,
        "something went wrong",
      ]);
      console.error(error.response);
    }
  };

  const commands: ICommands = {
    create: create,
    help: help,
    clear: clear,
  };

  const handleCommands: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const splittedCommand = command.split(" ");
    if (splittedCommand.length == 0) return;
    const _command = splittedCommand[0];
    const func = commands[_command as keyof ICommands];
    if (!func)
      return setCommandHistory([
        ...commandHistory,
        `cat@vampire:${command}`,
        "Invalid Command",
      ]);
    if (_command === "create" && splittedCommand.length > 1) {
      setLoading(true);
      await func(splittedCommand[1]);
      setLoading(false);
    } else await func("");
    setCommand("");
  };

  return (
    <div className="console">
      <div className="flex justify-between items-center mb-2 border-b border-white py-1">
        <div>
          <TerminalIcon className="pro-bar-icon" />
        </div>
        <div className="flex items-center space-x-1">
          <PlusIcon className="pro-bar-icon" />
          <MinusIcon className="pro-bar-icon" />
          <CancelIcon className="pro-bar-icon" />
        </div>
      </div>
      <div className="flex flex-col">
        {commandHistory.map((command, i) => (
          <span key={i}>{command}</span>
        ))}
      </div>
      <form onSubmit={handleCommands}>
        <div className="flex">
          <span>cat@vampire$:</span>
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </div>
        {loading && <span>{loadingContent}</span>}
      </form>
    </div>
  );
};

export default Pro;
