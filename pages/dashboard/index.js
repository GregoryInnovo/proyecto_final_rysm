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
import faker from "faker";

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
      display: true,
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
import axios from "axios";

const Dashboard = () => {
  // create a chart to show the data of the history of a ubidots device
  const [medicineHistory, setMedicineHistory] = useState(dataMedicine);
  const [labels, setLabels] = useState(dataLabels);

  useEffect(() => {
    getHistoryMedicine();
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

  const getHistoryMedicine = () => {
    axios
      .get(
        "http://industrial.api.ubidots.com/api/v1.6/devices/nodo2/tookmedicine/values?token=BBFF-RofFxL9UJKAx5ZQdTnMHEt8SSf1D8J"
      )
      .then((res) => {
        let dataArray = res.data.results.map((item) => item.value);
        let dataLabels = res.data.results.map((item) => {
          let date = new Date(item.created_at);
          return date.toLocaleString();
        });
        console.log(dataLabels);
        setLabels(dataLabels);
        setMedicineHistory(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Line options={options} data={data} />
    </>
  );
};

export default Dashboard;
