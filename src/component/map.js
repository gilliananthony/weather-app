import React , {useState,useEffect}from "react";
import "./map.css";

import { Line } from "react-chartjs-2";
import { data } from "./database";

export default function Map() {
    const [graphData, setGraphData] = useState();

    useEffect(() => {
      let label = [];
      let dataset1 = [],
        dataset2 = [],
        weatherDesc = [];
      data.list.map((item) => {
        label.push(item.dt);
        dataset1.push(Math.round(item.temp.max));
        dataset2.push(Math.round(item.temp.min));
        weatherDesc.push(item.weather[0].description);
      });
      setGraphData({
        labels: label,
        weatherDesc,
        datasets: [
          {
            label: "Max temp",
            data: dataset1,
            borderColor: "#d5ae36",
          },
          {
            label: "Min temp",
            data: dataset2,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      });
    }, []);
    const tooltipManuplation = (tooltipItems) => {
      return "Weather descp: " + graphData.weatherDesc[tooltipItems[0].dataIndex];
    };
    return (
      <div className="map">
        {graphData?.labels && (
          <Line
            data={graphData}
            options={{
              interaction: {
                intersect: false,
                mode: "index",
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    footer: tooltipManuplation,
                  },
                },
              },
            }}
          />
        )}
      </div>
    );
        }
  
  




