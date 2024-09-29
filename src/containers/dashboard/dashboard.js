import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Divider } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

import { Assets } from "../../assets/images";

import Loading from "../../components/loading";
import CarouselList from "../../components/carouselList";
import CustomCard from "../../components/customCard";
import Account from "./collections/account";

import {
  getPatientsOverallStats,
  getPatientsMonthlyConfirmedStats,
} from "../../store/actions";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientsOverallStats());
    dispatch(getPatientsMonthlyConfirmedStats());
  }, [dispatch]);

  const {
    isGettingPatientsOverallStats,
    isErrorGettingPatientsOverallStats,
    covidPatientsOverallStats,
    isGettingPatientsMonthlyConfirmedStats,
    isErrorGettingPatientsMonthlyConfirmedStats,
    covidPatientsMonthlyConfirmedStats,
  } = useSelector((state) => state.covidPatient);

  const chartSetting = {
    yAxis: [
      {
        label: "Total cases",
      },
    ],
    width: 600,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  const dataset = [
    {
      count: 0,
      month: "Jan",
    },
    {
      count: 0,
      month: "Feb",
    },
    {
      count: 0,
      month: "Mar",
    },
    {
      count: 0,
      month: "Apr",
    },
    {
      count: 0,
      month: "May",
    },
    {
      count: 0,
      month: "June",
    },
    {
      count: 0,
      month: "July",
    },
    {
      count: 0,
      month: "Aug",
    },
    {
      count: 0,
      month: "Sept",
    },
    {
      count: 0,
      month: "Oct",
    },
    {
      count: 0,
      month: "Nov",
    },
    {
      count: 0,
      month: "Dec",
    },
  ];

  const valueFormatter = (value) => `${value}`;

  return (
    <>
      <CarouselList
        list={[
          { name: "Banner 1", url: Assets.dashboard.banner1 },
          { name: "Banner 2", url: Assets.dashboard.banner2 },
          { name: "Banner 3", url: Assets.dashboard.banner3 },
        ]}
        interval={5000}
        loading={false}
        // list={banners}
        // interval={parseInt(bannerTime)}
        // loading={isGettingBannerData}
        navButtonsAlwaysVisible={true}
        style={{ opacity: "0.2" }}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "200px",
          minWidth: "850px",
          marginTop: "16px",
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#60707B",
          }}
        >
          COVID-19 TRACKER | SRI LANKA
        </Typography>
        <Typography
          sx={{
            fontSize: "32px",
            color: "#333333",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Overall Statistics
        </Typography>
        {isGettingPatientsOverallStats ? (
          <Loading />
        ) : isErrorGettingPatientsOverallStats ? (
          <Typography
            variant="string"
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              color: "#8D8D8D",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {"No Data Available"}
          </Typography>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {covidPatientsOverallStats.map((item) => (
              <Account key={item.type} item={item} />
            ))}
          </div>
        )}
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "18px",
          minWidth: "850px",
          minHeight: "370px",
        }}
      >
        <CustomCard style={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Month Wise Reported Cases (Year 2024)
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          {isGettingPatientsMonthlyConfirmedStats ? (
            <Loading />
          ) : isErrorGettingPatientsMonthlyConfirmedStats ? (
            <Typography
              variant="string"
              style={{
                fontSize: "16px",
                fontStyle: "italic",
                color: "#8D8D8D",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {"No Data Available"}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BarChart
                dataset={covidPatientsMonthlyConfirmedStats || dataset}
                xAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={[
                  {
                    dataKey: "count",
                    label: "Confirmed COVID Cases",
                    valueFormatter,
                    color: "#3364c5",
                  },
                ]}
                {...chartSetting}
              />
            </Box>
          )}
        </CustomCard>
        <CustomCard
          style={{
            width: "500px",
            marginLeft: "18px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            COVID-19 TRACKER | GLOBAL
          </Typography>
          <Divider sx={{ mt: 1 }} />
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: 22121550,
                    label: "Active",
                    color: "#108d08",
                  },
                  {
                    id: 1,
                    value: 7006139,
                    label: "Deaths",
                    color: "#af1b49",
                  },
                  {
                    id: 2,
                    value: 675108072,
                    label: "Recovered",
                    color: "#2169b4",
                  },
                ],
              },
            ]}
            width={400}
            height={200}
          />
          <Divider sx={{ mb: 1 }} />
          <Typography
            sx={{
              fontSize: "14px",
              color: "#60707B",
              textAlign: "center",
            }}
          >
            Stay Home, Stay Safe!
          </Typography>
        </CustomCard>
      </div>
    </>
  );
};

export default Dashboard;
