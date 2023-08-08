import { episodeRick } from "@/state/episodeRick";
import { useAtom } from "jotai";

export function useEpisodeAtom() {
  const [episodeAtom, setEpisodeAtom] = useAtom(episodeRick);
  return {
    episodeAtom,
    setEpisodeAtom,
  };
}
