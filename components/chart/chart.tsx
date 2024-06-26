"use client";

import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

let options: ApexOptions = {
  chart: {
    id: "area-datetime",
    type: "area",
    height: 350,
    zoom: {
      autoScaleYaxis: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    //style: "hollow",
  },
  xaxis: {
    type: "datetime",
    tickAmount: 6,
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};

export default function CustomChart({
  data,
  height = 350,
  toolbar = true,
}: {
  data: any;
  height: number | undefined;
  toolbar: boolean | undefined;
}) {
  const [selection, setSelection] = useState("one_year");
  const [chartData, setChartData] = useState([
    {
      name: "Price",
      data: [],
    },
  ]);

  useEffect(() => {
    if (data !== null) {
      setChartData([
        {
          name: "Price",
          data: data.prices,
        },
      ]);
    }
  }, [data]);

  function updateData(timeline: string) {
    setSelection(timeline);

    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          dayjs().subtract(1, "month").valueOf(),
          dayjs().valueOf()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          dayjs().subtract(6, "month").valueOf(),
          dayjs().valueOf()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          dayjs().subtract(1, "year").valueOf(),
          dayjs().valueOf()
        );
        break;
      default:
    }
  }
  return (
    <div>
      <div id="chart">
        {toolbar ? (
          <div className="toolbar">
            <button
              id="one_month"
              onClick={() => updateData("one_month")}
              className={selection === "one_month" ? "active" : ""}
            >
              1M
            </button>

            <button
              id="six_months"
              onClick={() => updateData("six_months")}
              className={selection === "six_months" ? "active" : ""}
            >
              6M
            </button>

            <button
              id="one_year"
              onClick={() => updateData("one_year")}
              className={selection === "one_year" ? "active" : ""}
            >
              1Y
            </button>
          </div>
        ) : null}

        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={chartData}
            type="area"
            height={height}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
