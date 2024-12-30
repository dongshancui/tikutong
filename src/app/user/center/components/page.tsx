"use client";
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { getUserSignInRecordUsingGet } from "@/api/userController";

/**
 * 用户刷题记录页面
 * @constructor
 */
export default function () {
  // 签到日期表([1,200],表示第1天和第200天签到)
  const [dataList, setDataList] = useState<number[]>([]);

  // 计算图表需要的数据
  const year = new Date().getFullYear();
  // 调用接口获取数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordUsingGet({ year });
      setDataList(res?.data || []);
    } catch (e) {
      console.log("获取后台签到数据失败" + e.message);
    }
  };
  useEffect(() => {
    fetchDataList();
  }, []);

  const optionsData = dataList.map((dayOfYear, index) => {
    // 计算日期字符串
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    console.log(dateStr);
    return [dateStr, 1];
  });
  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // 单元格自动宽度，高度为 16 像素
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className={"calender-chart"} option={options} />;
}
