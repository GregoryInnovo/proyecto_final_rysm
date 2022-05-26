import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

let userId = "";
let url = "";
const User = () => {
  const [id, setId] = useState("n/a");
  const [tookMedicine, setTookMedicine] = useState("n/a");
  const [lastValue, setLastValue] = useState("n/a");
  const [nextTimeStamp, setNextTimeStamp] = useState("n/a");

  useEffect(() => {
    userId = localStorage.getItem("user");
    getId();
    getMedicine();
    getLastTimeStamp();
    showNextTimeStamp();
  }, []);

  const getId = () => {
    if (userId === "1") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/id/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "2") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/id/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "3") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/id/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setId(res.data.results[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMedicine = () => {
    if (userId === "1") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "2") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "3") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setTookMedicine(res.data.results[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLastTimeStamp = () => {
    if (userId === "1") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "2") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "3") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    axios.get(url).then((res) => {
      let date = new Date(res.data.results[0].timestamp);
      setLastValue(date.toLocaleString());
    });
  };

  const showNextTimeStamp = () => {
    if (userId === "1") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "2") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    if (userId === "3") {
      url =
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J";
    }
    axios.get(url).then((res) => {
      let date2 = new Date(res.data.results[0].timestamp + 3600 * 1000 * 24);
      setNextTimeStamp(date2.toLocaleString());
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Medicine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Bienvenido a Smart Medicine</h2>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Tu ID es:</h2>
            <p>{id}</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>¿El usuario tomó su pastilla?</h2>
            <p>{tookMedicine == 1 ? "Sí" : "No"}</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Su última medicina fue tomada el:</h2>
            <p>{lastValue}</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>La próxima medicina debe ser tomada el:</h2>
            <p>{nextTimeStamp}</p>
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
};

export default User;