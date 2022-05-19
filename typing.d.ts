type ILink = {
  to: string;
  short: string;
};

type linkChecker = (link: string) => boolean;

type IGetLink = (shortId: string) => Promise<ILink | null>;
