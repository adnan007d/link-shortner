type ILink = {
  to: string;
  short: string;
};

type linkChecker = (link: string) => boolean;

type IGetLink = (shortId: string) => Promise<ILink | null>;

type ICommands = {
  create: (link: string) => Promise<void>;
  help: () => void;
  clear: () => void;
};
