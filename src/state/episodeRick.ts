import { atom } from "jotai";

interface episodeProps {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface apiResponse {
  results: episodeProps[];
}

interface episodeAtom {
  data?: apiResponse;
  called: boolean;
  loading: boolean;
  error?: string;
}

export const episodeRick = atom<episodeAtom>({
  data: undefined,
  called: false,
  loading: false,
  error: "",
});
