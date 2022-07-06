import Layout from "../components/Layout";
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
import ChartStreaming from "chartjs-plugin-streaming";
import 'chartjs-adapter-luxon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartStreaming
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 100),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 100),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const options = {
  plugins: {
    streaming: {
      duration: 20000
    }
  },
  scales: {
    x: {
      type: 'realtime',
      realtime: {
        duration: 20000,
onRefresh: chart => {
            chart.data.datasets.forEach(dataset => {
              dataset.data.push({
                x: Date.now(),
                y: Math.random() * 100
              });
            });
          }
      }
    }
  }
}

const DashboardPage = () => {
  return (
    <Layout title="Dashboard">
      <h1 className="text-5xl underline">This is dashboard</h1>
      <p>text here</p>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
        <Line data={data} width={100} height={50} options={options}/>
      </div>
    </Layout>
  );
};

export default DashboardPage;
