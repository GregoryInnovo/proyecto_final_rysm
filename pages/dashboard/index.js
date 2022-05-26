import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let dataMedicine = [122, 326, -500, 300, 90, 988, 500];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const dataLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
const dataLabels2 = ["January", "February", "March"];
import axios from "axios";
let viewScreen = "false";
let aux;

const Dashboard = () => {
  // create a chart to show the data of the history of a ubidots device
  const [medicineHistory, setMedicineHistory] = useState(dataMedicine);
  const [RitHistory, setRitHistory] = useState(dataMedicine);
  const [OxHistory, setOxHistory] = useState(dataMedicine);
  const [labels, setLabels] = useState(dataLabels);
  const [labels2, setLabels2] = useState(dataLabels2);
  useEffect(() => {
    viewScreen = localStorage.getItem("admin");
    aux = viewScreen === "true";

    getHistoryMedicine(
      "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
    );
    getHistoryOxRit(
      "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/heartrate/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
    );
    getHistoryOx(
      "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/conoxg/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
    );
  }, []);

  let data = {
    labels,
    datasets: [
      {
        label: "Histórico de cuando tomo la pastilla",
        data: medicineHistory,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  let data2 = {
    labels,
    datasets: [
      {
        label: "Histórico de ritmo cardíaco",
        data: RitHistory,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Histórico de ritmo concentración de oxígeno",
        data: OxHistory,
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "rgba(0, 0, 255)",
      },
    ],
  };

  const getHistoryMedicine = (url) => {
    axios
      .get(url)
      .then((res) => {
        let dataArray = res.data.results.map((item) => item.value);
        let dataLabels = res.data.results.map((item) => {
          let date = new Date(item.created_at);
          return date.toLocaleString();
        });
        // console.log(dataLabels);
        setLabels(dataLabels);
        setMedicineHistory(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHistoryOxRit = (url) => {
    axios
      .get(url)
      .then((res) => {
        let dataArray = res.data.results.map((item) => item.value);
        let dataLabels2 = res.data.results.map((item) => {
          let date = new Date(item.created_at);
          return date.toLocaleString();
        });
        console.log(dataLabels2);
        // console.log(dataLabels2);

        setLabels2(dataLabels2);
        console.log(labels2);
        setOxHistory(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getHistoryOx = (url) => {
    axios
      .get(url)
      .then((res) => {
        let dataArray = res.data.results.map((item) => item.value);
        let dataLabels2 = res.data.results.map((item) => {
          let date = new Date(item.created_at);
          return date.toLocaleString();
        });
        // console.log(dataArray);
        // console.log(dataLabels2);
        // setLabels2(dataLabels2);
        setLabels2(dataLabels2);
        setRitHistory(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerClick = (val) => {
    console.log(val);
    if (val === 1) {
      getHistoryMedicine(
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
      getHistoryOxRit(
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/heartrate/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
      getHistoryOx(
        "http://industrial.api.ubidots.com/api/v1.6/devices/yun/conoxg/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
    } else if (val === 2) {
      getHistoryMedicine(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
      getHistoryOxRit(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/heartrate/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
      getHistoryOx(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/conoxg/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
    } else if (val === 3) {
      getHistoryMedicine(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
      getHistoryOxRit(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/heartrate/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
      getHistoryOx(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo1/conoxg/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      );
    }
  };

  return (
    <>
      {aux ? (
        <>
          <h1>Dashboard</h1>
          <button onClick={() => handlerClick(1)}>
            Obtener datos usuario 1
          </button>
          <button onClick={() => handlerClick(2)}>
            Obtener datos usuario 2
          </button>
          <button onClick={() => handlerClick(3)}>
            Obtener datos usuario 3
          </button>
          <Line options={options} data={data} />
          <Line options={options} data={data2} />
        </>
      ) : (
        <h1>No tienes permisos para ver esta página</h1>
      )}
    </>
  );
};

export default Dashboard;
