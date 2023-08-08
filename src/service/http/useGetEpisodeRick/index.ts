import { useEpisodeAtom } from "@/hooks/useEpisodeRick";
import { useCallback } from "react";
import { RemoteService } from "../RemoteService";
import { ResultProps } from "./types";
import { formatDate } from "@/utils/dateFormat";

const useGetEpisodeRick = () => {
  const { episodeAtom, setEpisodeAtom } = useEpisodeAtom();
  const getEpisode = useCallback(async () => {
    try {
      setEpisodeAtom({
        called: false,
        loading: true,
      });
      const response = await RemoteService.request<ResultProps>({
        method: "GET",
        resource: "api/episode",
      });

      const resultData = response.data.results?.map((data) => {
        const formattedDate = formatDate(new Date(data.air_date));

        return {
          id: data.id,
          name: data.name,
          air_date: formattedDate,
          episode: data.episode,
          characters: data.characters,
          url: data.url,
          created: data.created,
        };
      });

      setEpisodeAtom({
        data: {
          results: resultData || [],
        },
        called: true,
        loading: false,
      });
    } catch (err) {
      const error = err as any;
      setEpisodeAtom({
        called: true,
        loading: false,
        error: error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, called, loading, error } = episodeAtom;

  return {
    getEpisode,
    data,
    called,
    loading,
    error,
  };
};

export default useGetEpisodeRick;
