import React, { useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";

import { Assets } from "../../assets/images";

import { BasicTable } from "../../components/dataTable";
import { SpaceBetween } from "../../components/wrapper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfTest = () => {
  const pdfRef = useRef();

  const [currentPage, setCurrentPage] = useState(0);

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  const columns = [
    {
      field: "name",
      columnName: "Full Name",
      width: "12%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "12%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "20%",
    },
    {
      field: "centreName",
      columnName: "Vaccination Center Name",
      width: "15%",
    },
    {
      field: "vaccineName",
      columnName: "Vaccine Name",
      width: "10%",
    },
    {
      field: "vaccineDose",
      columnName: "Vaccine Dose",
      width: "10%",
    },
    {
      field: "dateOfVaccination",
      columnName: "Date Of Vaccination",
      width: "10%",
    },
    {
      field: "nextAppointmentDate",
      columnName: "Next Appointment Date",
      width: "10%",
    },
  ];

  const dataList = [
    {
      pandemicVaccinationId: 1,
      name: "Imesha Fernando",
      nicNumber: "917283783V",
      age: 32,
      gender: "Female",
      address: "538/7 Aluthmawatha Road, Piliyandala",
      phoneNumber: "772523191",
      district: "Colombo",
      mohArea: "MOH Office Piliyandala",
      gramaNiladhariArea: "Grama Niladhari Area Piliyandala",
      serialNumber: 1,
      vaccineName: "Sinopharm",
      vaccineDose: "1st Dose",
      vaccinationCentreId: 1,
      centreName: "MOH Office, Kesbewa",
      dateOfVaccination: "2024-02-15T19:11:23.083296",
      nextAppointmentDate: "15-May-2024",
    },
    {
      pandemicVaccinationId: 1,
      name: "Sarah Fernando",
      nicNumber: "897283783V",
      age: 32,
      gender: "Female",
      address: "221/B Bandaragama Road, Kesbewa",
      phoneNumber: "772523191",
      district: "Colombo",
      mohArea: "MOH Office Piliyandala",
      gramaNiladhariArea: "Grama Niladhari Area Piliyandala",
      serialNumber: 1,
      vaccineName: "Pfizer",
      vaccineDose: "1st Dose",
      vaccinationCentreId: 1,
      centreName: "MOH Office, Kesbewa",
      dateOfVaccination: "2024-02-11T19:11:23.083296",
      nextAppointmentDate: "11-May-2024",
    },
    {
      pandemicVaccinationId: 1,
      name: "Uthpala Jayasinghe",
      nicNumber: "904003783V",
      age: 32,
      gender: "Female",
      address: "301/A, Miriswatte Road, Kesbewa",
      phoneNumber: "772523191",
      district: "Colombo",
      mohArea: "MOH Office Piliyandala",
      gramaNiladhariArea: "Grama Niladhari Area Piliyandala",
      serialNumber: 1,
      vaccineName: "Pfizer",
      vaccineDose: "1st Dose",
      vaccinationCentreId: 1,
      centreName: "MOH Office, Kesbewa",
      dateOfVaccination: "2024-02-03T19:11:23.083296",
      nextAppointmentDate: "22-May-2024",
    },
    {
      pandemicVaccinationId: 1,
      name: "Shashika Gamage",
      nicNumber: "937283783V",
      age: 32,
      gender: "Female",
      address: "2A, Gadabuwana Road, Piliyandala",
      phoneNumber: "772523191",
      district: "Colombo",
      mohArea: "MOH Office Kesbewa",
      gramaNiladhariArea: "Grama Niladhari Area Piliyandala",
      serialNumber: 1,
      vaccineName: "Pfizer",
      vaccineDose: "1st Dose",
      vaccinationCentreId: 1,
      centreName: "MOH Office, Piliyandala",
      dateOfVaccination: "2024-01-22T19:11:23.083296",
      nextAppointmentDate: "22-Apr-2024",
    },
    {
      pandemicVaccinationId: 1,
      name: "Kasun Senevithne",
      nicNumber: "907283783V",
      age: 32,
      gender: "Female",
      address: "438/A Gonamadiththa Road, Kesbewa",
      phoneNumber: "772523191",
      district: "Colombo",
      mohArea: "MOH Office Piliyandala",
      gramaNiladhariArea: "Grama Niladhari Area Piliyandala",
      serialNumber: 1,
      vaccineName: "Sinopharm",
      vaccineDose: "1st Dose",
      vaccinationCentreId: 1,
      centreName: "MOH Office, Kesbewa",
      dateOfVaccination: "2024-12-15T19:11:23.083296",
      nextAppointmentDate: "15-Mar-2024",
    },
  ];

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("report.pdf");
    });
  };

  return (
    <>
      <Box
        ref={pdfRef}
        sx={{
          padding: 5,
          margin: 10,
          border: "1px solid #d9dadf",
          borderRadius: "5px",
          backgroundColor: "#f0f8ff",
        }}
      >
        <SpaceBetween>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize="37px" color="#0f679c" fontWeight="bold">
              COVID Vaccination Report
            </Typography>
            <Typography>Period: 01-Dec-2023 to 20-Feb-2024</Typography>
            <Typography>Generated on: 20-Feb-2024</Typography>
          </Box>
          <img
            src={Assets.auth.reportLogo}
            alt="logo"
            style={{ width: "120px", height: "120px" }}
          />
        </SpaceBetween>
        <BasicTable
          currentPage={currentPage}
          columns={columns}
          rows={dataList}
          recordsPerPage={10}
          handleChangeCurrentPage={(data) => changeCurrentPage(data)}
          handleEdit={null}
        />
      </Box>
      <Button
        sx={{
          border: "1px solid #D32F2F",
          borderRadius: "20px",
          height: "40px",
        }}
        onClick={downloadPdf}
      >
        Download
      </Button>
    </>
  );
};

export default PdfTest;
