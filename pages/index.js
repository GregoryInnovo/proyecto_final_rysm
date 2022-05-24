import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [id, setId] = useState("n/a");
  const [tookMedicine, setTookMedicine] = useState("n/a");

  useEffect(() => {
    getId();
    getMedicine();
  }, []);

  const getId = () => {
    axios
      .get(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/id/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      )
      .then((res) => {
        console.log(res.data);
        setId(res.data.results[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMedicine = () => {
    axios
      .get(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      )
      .then((res) => {
        console.log(res.data);
        setTookMedicine(res.data.results[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Medicicine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a Smart Medicicine</h1>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Id del usuario</h2>
            <p>{id}</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>¿El usuario tomó su pastilla?</h2>
            <p>{tookMedicine == 1 ? "Sí" : "No"}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
