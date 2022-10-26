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
      <section className="flex flex-row space-x-9 mb-8">
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
      <section className="mb-8">
        過去の暑さ指数と比較
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
          <div className="bg-red-50 border border-red-200 rounded-md p-4" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-8 w-4 text-red-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-3xl text-red-800 font-semibold">
                  暑さ上昇警報
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="flex flex-row space-x-9">
          <div>
            過去の暑さ指数の推移
            <div className="h-80 w-80">
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
            </div>
          </div>
          <div className="">
            警報履歴
            <ul className="ist-disc list-inside text-gray-900 dark:text-gray-200">
              <li key="1">
                2022/06/27 13:36 レベル ほぼ安全
              </li>
              <li key="2">
                2022/06/27 12:36 レベル 危険
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
