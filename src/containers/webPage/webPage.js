import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import { AccountCircle, HorizontalRule } from "@mui/icons-material";

import { Assets } from "../../assets/images";

import Loading from "../../components/loading";

import CarouselListWeb from "../../components/carouselListWeb";
import MultiCarouselList from "../../components/multiCarouselList";
import Account from "./collections/account";

import { getPatientsOverallStats } from "../../store/actions";

const WebPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isGettingPatientsOverallStats,
    isErrorGettingPatientsOverallStats,
    covidPatientsOverallStats,
  } = useSelector((state) => state.covidPatient);

  useEffect(() => {
    dispatch(getPatientsOverallStats());
  }, [dispatch]);

  const imageList = [
    { key: 2, descrption: "Banner 2", imageUrl: Assets.dashboard.media2 },
    { key: 3, descrption: "Banner 3", imageUrl: Assets.dashboard.media3 },
    { key: 4, descrption: "Banner 4", imageUrl: Assets.dashboard.media4 },
    { key: 5, descrption: "Banner 5", imageUrl: Assets.dashboard.media5 },
    { key: 6, descrption: "Banner 6", imageUrl: Assets.dashboard.media6 },
    { key: 7, descrption: "Banner 7", imageUrl: Assets.dashboard.media7 },
    { key: 8, descrption: "Banner 8", imageUrl: Assets.dashboard.media8 },
    { key: 9, descrption: "Banner 9", imageUrl: Assets.dashboard.media9 },
    { key: 1, descrption: "Banner 1", imageUrl: Assets.dashboard.media1 },
    { key: 10, descrption: "Banner 10", imageUrl: Assets.dashboard.media10 },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `100%`,
          height: `120px`,
          background: `url(${Assets.auth.group_681}) center no-repeat`,
          backgroundSize: "cover",
          boxShadow: "0 4px 2px -2px gray",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ width: `100%` }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              width: `25%`,
            }}
          >
            <img
              src={Assets.auth.mask_group1}
              style={{ width: "80px", height: "80px" }}
            />
            <Typography
              sx={{
                color: "white",
                fontSize: "35px",
                fontWeight: "bold",
                ml: "8px",
              }}
            >
              {"Aarogya"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              width: `60%`,
            }}
          >
            <a
              style={{ color: "white", margin: 20, textDecoration: "none" }}
              href="#section-1"
            >
              HOW AAROGYA WORKS
            </a>
            <a
              style={{ color: "white", margin: 20, textDecoration: "none" }}
              href="#section-2"
            >
              COVID UPDATES
            </a>
            <a
              style={{ color: "white", margin: 20, textDecoration: "none" }}
              href="#section-3"
            >
              WHY AAROGYA
            </a>
            <a
              style={{ color: "white", margin: 20, textDecoration: "none" }}
              href="#section-4"
            >
              MEDIA GALLERY
            </a>
            <a
              style={{
                color: "white",
                margin: 20,
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/stay-safe`)}
            >
              STAY SAFE
            </a>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
              width: `15%`,
            }}
          >
            <IconButton component={Link} to="/login">
              <Tooltip title="Login to Aarogya">
                <AccountCircle sx={{ color: "white", fontSize: "40px" }} />
              </Tooltip>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: `125px`, backgroundColor: "#e0eef9" }}>
        <Box
          id="main"
          sx={{ p: 2, height: "440px", backgroundColor: "#e0eef9" }}
        >
          <CarouselListWeb
            list={[
              { name: "Banner 1", url: Assets.dashboard.webBanner1 },
              { name: "Banner 2", url: Assets.dashboard.webBanner2 },
              { name: "Banner 3", url: Assets.dashboard.webBanner3 },
            ]}
            interval={5000}
            loading={false}
            // list={banners}
            // interval={parseInt(bannerTime)}
            // loading={isGettingBannerData}
            navButtonsAlwaysVisible={true}
            style={{ opacity: "0.2" }}
          />
        </Box>
        <Divider light />
        <Box id="section-1" sx={{ p: 2, height: "490px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: `100%`,
                height: `460px`,
                background: `url(${Assets.dashboard.howSethuWorks}) center no-repeat`,
                backgroundSize: "cover",
              }}
            />
          </Box>
        </Box>
        <Divider light />
        <Box id="section-2" sx={{ p: 2, height: "400px" }}>
          <Typography
            sx={{
              color: "#292b76",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
              mt: 2,
            }}
          >
            <HorizontalRule
              sx={{
                fontSize: "30px",
                color: "#f97918",
              }}
            />{" "}
            COVID Updates
          </Typography>
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
                marginLeft: "60px",
              }}
            >
              COVID-19 TRACKER | SRI LANKA
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                color: "#333333",
                fontWeight: "bold",
                marginLeft: "60px",
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
                  marginTop: "25px",
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
                  marginTop: "30px",
                  marginLeft: "60px",
                  marginRight: "60px",
                }}
              >
                {covidPatientsOverallStats.map((item) => (
                  <Account key={item.type} item={item} />
                ))}
              </div>
            )}
          </Box>
        </Box>
        <Divider light />
        <Box id="section-3" sx={{ p: 3, height: "450px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: `90%`,
                height: `400px`,
                background: `url(${Assets.dashboard.whySethu}) center no-repeat`,
                backgroundSize: "cover",
              }}
            />
          </Box>
        </Box>
        <Divider light />
        <Box id="section-4" sx={{ p: 2, height: "800px" }}>
          <Typography
            sx={{
              color: "#292b76",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            <HorizontalRule sx={{ fontSize: "30px", color: "#f97918" }} /> Media
            Gallery
          </Typography>
          <MultiCarouselList imageList={imageList} />
        </Box>
      </Box>
    </>
  );
};

export default WebPage;
