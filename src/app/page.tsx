"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import useGetEpisodeRick from "@/service/http/useGetEpisodeRick";

export default function Home() {
  const { called, data, error, loading, getEpisode } = useGetEpisodeRick();

  useEffect(() => {
    getEpisode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar os dados.</p>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.episodes}>
        {data?.results.map((data) => (
          <li key={data.id} className={styles.list}>
            <h1 className={styles.title}>{data.name}</h1>
            <span className={styles.info}>ID: {data.id}</span>
            <span className={styles.info}>Episódio: {data.episode}</span>
            <span className={styles.info}>
              Data de lançamento: {data.air_date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
