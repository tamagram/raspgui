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
import {Line} from "react-chartjs-2";
import StreamingPlugin from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";
import {useEffect, useState} from "react";
import {getData} from "../utils/sensor";
import {Sensor} from "../interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  StreamingPlugin
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

const DashboardPage = () => {
  const [json, setJson] = useState<Sensor>({
    time: Date.now(),
    temperature: 0,
    humidity: 0,
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      (async () => {
        const data: Sensor = await getData();
        setJson(data);
      })();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Layout title="Dashboard">
      <section className="flex flex-row space-x-9">
        <div>
          <div className="flex flex-col">
            現在の暑さ指数
            <div className="flex flex-row items-end">
              <div className="text-9xl">
                {Math.round(json.temperature)}
              </div>
              <div className="text-3xl">
                °C
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-9">
          <div className="flex flex-col">
            温度
            <div className="flex flex-row items-end">
              <div className="text-5xl">
                {Math.round(json.temperature)}
              </div>
              <div className="text-3xl">
                °C
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            湿度
            <div className="flex flex-row items-end">
              <div className="text-5xl">
                {Math.round(json.humidity)}
              </div>
              <div className="text-3xl">
                °C
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        過去の厚さ指数と比較
        <div className="flex flex-row space-x-9">
          <div className="flex flex-col">
            10分前より
            <div className="flex flex-row items-end">
              <div className="text-5xl">
                {Math.round(json.temperature)}
              </div>
              <div className="text-3xl">
                °C
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            20分前より
            <div className="flex flex-row items-end">
              <div className="text-5xl">
                {Math.round(json.humidity)}
              </div>
              <div className="text-3xl">
                °C
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        過去の厚さ指数の推移
      </section>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
        <Line
          data={data}
          width={100}
          height={50}
          options={{
            plugins: {
              streaming: {
                duration: 20000,
              },
            },
            scales: {
              x: {
                type: "realtime",
                realtime: {
                  duration: 20000,
                  onRefresh: (chart) => {
                    chart.data.datasets.forEach((dataset) => {
                      dataset.data.push({
                        x: json.time,
                        y: json.temperature,
                      });
                    });
                  },
                },
              },
            },
          }}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;
