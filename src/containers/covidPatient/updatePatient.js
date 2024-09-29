import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import CustomTabs from "../../components/tabs";
import { AddButton } from "../../components/button";
import { FormActionButton } from "../../components/button";

import PatientInformation from "./patientInformation";
import AllocationInformation from "./allocationInformation";
import MedicalHistory from "./medicalHistory";
import ReleaseInfo from "./releaseInfo";

import {
  getHospitals,
  getPatientById,
  getGovOfficersInCharge,
  getHealthcareProfessionals,
  updateCovidPatient,
  getMedicalHistoryById,
} from "../../store/actions";

const UpdatePatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [tabLists, setTabLists] = useState([]);
  const [statusLists, setStatusLists] = useState([]);

  const [state, setState] = useState({
    severityUponDiagnosis: "",
    recommendTreatmentType: "",
    hospital: "",
    wardNumber: "",
    bedNumber: "",
    hospitalAdmissionNumber: "",
    dateOfHospitalization: "",
    firstNegativeConfirmationDate: "",
    secondNegativeConfirmationDate: "",
    dateOfRecovery: "",
    dateOfDeath: "",
    releaseInfoRemarks: "",
    status: "",
  });

  const [isValidFields, setIsValidFields] = useState({
    isValidSeverityUponDiagnosis: true,
    isValidRecommendTreatmentType: true,
    isValidHospital: true,
    isValidWardNumber: true,
    isValidBedNumber: true,
    isValidHospitalAdmissionNumber: true,
    isValidDateOfHospitalization: true,
    isValidFirstNegativeConfirmationDate: true,
    isValidSecondNegativeConfirmationDate: true,
    isValidDateOfRecovery: true,
    isValidDateOfDeath: true,
    isValidReleaseInfoRemarks: true,
    isValidStatus: true,
  });

  const [isClearFields, setIsClearFields] = useState({
    isClearSeverityUponDiagnosis: false,
    isClearRecommendTreatmentType: false,
    isClearHospital: false,
    isClearStatus: false,
  });

  const { covidPatientById, hospitals, healthcareProfessionals } = useSelector(
    (state) => state.covidPatient
  );

  useEffect(() => {
    dispatch(getHospitals());
    dispatch(getGovOfficersInCharge());
    dispatch(getHealthcareProfessionals());
    dispatch(getPatientById(patientId));
    dispatch(getMedicalHistoryById(patientId));
  }, [dispatch, patientId]);

  useEffect(() => {
    let list = [
      "Patient Information",
      "Allocation Information",
      "Medical History",
      "Release Info",
    ];

    setTabLists(list);
  }, []);

  useEffect(() => {
    if (covidPatientById) {
      if (covidPatientById?.status === "Registration Completed") {
        setStatusLists([
          {
            key: "Registration Completed",
            description: "Registration Completed",
          },
          {
            key: "Home Quarantined",
            description: "Home Quarantined",
          },
          {
            key: "Hospitalized",
            description: "Hospitalized",
          },
        ]);
      }
      if (
        covidPatientById?.status === "Home Quarantined" ||
        covidPatientById?.status === "Hospitalized"
      ) {
        setStatusLists([
          {
            key: "Home Quarantined",
            description: "Home Quarantined",
          },
          {
            key: "Hospitalized",
            description: "Hospitalized",
          },
          {
            key: "Approval Pending",
            description: "Approval Pending",
          },
          {
            key: "Deceased",
            description: "Deceased",
          },
        ]);
      }
      if (covidPatientById?.status === "Approval Pending") {
        setStatusLists([
          {
            key: "Approval Pending",
            description: "Approval Pending",
          },
          {
            key: "Released",
            description: "Released",
          },
        ]);
      }
      if (covidPatientById?.status === "Released") {
        setStatusLists([
          {
            key: "Released",
            description: "Released",
          },
          {
            key: "Deceased After Realease",
            description: "Deceased After Realease",
          },
        ]);
      }
      if (covidPatientById?.status === "Deceased") {
        setStatusLists([
          {
            key: "Deceased",
            description: "Deceased",
          },
        ]);
      }
      if (covidPatientById?.status === "Deceased After Realease") {
        setStatusLists([
          {
            key: "Deceased After Realease",
            description: "Deceased After Realease",
          },
        ]);
      }
    }
  }, [covidPatientById]);

  useEffect(() => {
    if (covidPatientById) {
      const {
        severityUponDiagnosis,
        recommendedTreatmentType,
        hospitalId,
        wardNumber,
        bedNumber,
        hospitalAdmissionNo,
        dateOfHospitalization,
        firstNegativeConfirmationDate,
        secondNegativeConfirmationDate,
        dateOfRecovery,
        dateOfDeath,
        releaseInfoRemarks,
        status,
      } = covidPatientById;

      setState({
        severityUponDiagnosis,
        recommendTreatmentType: recommendedTreatmentType,
        hospital: hospitalId,
        wardNumber,
        bedNumber,
        hospitalAdmissionNumber: hospitalAdmissionNo,
        dateOfHospitalization: dateOfHospitalization
          ? dateOfHospitalization?.split("T")[0]
          : dateOfHospitalization,
        firstNegativeConfirmationDate: firstNegativeConfirmationDate
          ? firstNegativeConfirmationDate?.split("T")[0]
          : firstNegativeConfirmationDate,
        secondNegativeConfirmationDate: secondNegativeConfirmationDate
          ? secondNegativeConfirmationDate?.split("T")[0]
          : secondNegativeConfirmationDate,
        dateOfRecovery: dateOfRecovery
          ? dateOfRecovery?.split("T")[0]
          : dateOfRecovery,
        dateOfDeath: dateOfDeath ? dateOfDeath?.split("T")[0] : dateOfDeath,
        releaseInfoRemarks,
        status,
      });
    }
  }, [covidPatientById]);

  const handleChange = (_e, tabIndex) => {
    setTabIndex(tabIndex);
  };

  const onHandleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (name === "severityUponDiagnosis") {
      setIsValidFields({
        ...isValidFields,
        ["isValidSeverityUponDiagnosis"]: true,
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearSeverityUponDiagnosis"]: true,
      });
    }
    if (name === "recommendTreatmentType") {
      setIsValidFields({
        ...isValidFields,
        ["isValidRecommendTreatmentType"]: true,
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearRecommendTreatmentType"]: true,
      });
    }
    if (name === "hospital") {
      setIsValidFields({
        ...isValidFields,
        ["isValidHospital"]: true,
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearHospital"]: true,
      });
    }
    if (name === "wardNumber") {
      setIsValidFields({
        ...isValidFields,
        ["isValidWardNumber"]: true,
      });
    }
    if (name === "bedNumber") {
      setIsValidFields({
        ...isValidFields,
        ["isValidBedNumber"]: true,
      });
    }
    if (name === "hospitalAdmissionNumber") {
      setIsValidFields({
        ...isValidFields,
        ["isValidHospitalAdmissionNumber"]: true,
      });
    }
    if (name === "dateOfHospitalization") {
      setIsValidFields({
        ...isValidFields,
        ["isValidDateOfHospitalization"]: true,
      });
    }
    if (name === "firstNegativeConfirmationDate") {
      setIsValidFields({
        ...isValidFields,
        ["isValidFirstNegativeConfirmationDate"]: true,
      });
    }
    if (name === "secondNegativeConfirmationDate") {
      setIsValidFields({
        ...isValidFields,
        ["isValidSecondNegativeConfirmationDate"]: true,
      });
    }
    if (name === "dateOfRecovery") {
      setIsValidFields({
        ...isValidFields,
        ["isValidDateOfRecovery"]: true,
      });
    }
    if (name === "dateOfDeath") {
      setIsValidFields({
        ...isValidFields,
        ["isValidDateOfDeath"]: true,
      });
    }
    if (name === "releaseInfoRemarks") {
      setIsValidFields({
        ...isValidFields,
        ["isValidReleaseInfoRemarks"]: true,
      });
    }
    if (name === "status") {
      setIsValidFields({
        ...isValidFields,
        ["isValidStatus"]: true,
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearStatus"]: true,
      });
    }
  };

  const onHandleClearChange = (name, e) => {
    e.preventDefault();

    if (name === "severityUponDiagnosis") {
      setState({
        ...state,
        ["severityUponDiagnosis"]: "",
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearSeverityUponDiagnosis"]: false,
      });
      setIsValidFields({
        ...isValidFields,
        ["isValidSeverityUponDiagnosis"]: true,
      });
    }
    if (name === "recommendTreatmentType") {
      setState({
        ...state,
        ["recommendTreatmentType"]: "",
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearRecommendTreatmentType"]: false,
      });
      setIsValidFields({
        ...isValidFields,
        ["isValidRecommendTreatmentType"]: true,
      });
    }
    if (name === "hospital") {
      setState({
        ...state,
        ["hospital"]: "",
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearHospital"]: false,
      });
      setIsValidFields({
        ...isValidFields,
        ["isValidHospital"]: true,
      });
    }
    if (name === "status") {
      setState({
        ...state,
        ["status"]: "",
      });
      setIsClearFields({
        ...isClearFields,
        ["isClearStatus"]: false,
      });
      setIsValidFields({
        ...isValidFields,
        ["isValidStatus"]: true,
      });
    }
  };

  const onHandleCancel = () => {
    navigate(-1);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!state?.status) {
      setIsValidFields({
        ...isValidFields,
        ["isValidStatus"]: false,
      });
      isErrorValidation = true;
    }
    if (
      state?.status === "Home Quarantined" &&
      !(state?.severityUponDiagnosis && state?.recommendTreatmentType)
    ) {
      setIsValidFields({
        ...isValidFields,
        ["isValidSeverityUponDiagnosis"]: state?.severityUponDiagnosis
          ? true
          : false,
        ["isValidRecommendTreatmentType"]: state?.recommendTreatmentType
          ? true
          : false,
      });
      isErrorValidation = true;
    }
    if (
      state?.status === "Hospitalized" &&
      !(
        state?.severityUponDiagnosis &&
        state?.recommendTreatmentType &&
        state?.hospital &&
        state?.wardNumber &&
        state?.bedNumber &&
        state?.hospitalAdmissionNumber &&
        state?.dateOfHospitalization
      )
    ) {
      setIsValidFields({
        ...isValidFields,
        ["isValidSeverityUponDiagnosis"]: state?.severityUponDiagnosis
          ? true
          : false,
        ["isValidRecommendTreatmentType"]: state?.recommendTreatmentType
          ? true
          : false,
        ["isValidHospital"]: state?.hospital ? true : false,
        ["isValidWardNumber"]: state?.wardNumber ? true : false,
        ["isValidBedNumber"]: state?.bedNumber ? true : false,
        ["isValidHospitalAdmissionNumber"]: state?.hospitalAdmissionNumber
          ? true
          : false,
        ["isValidDateOfHospitalization"]: state?.dateOfHospitalization
          ? true
          : false,
      });
      isErrorValidation = true;
    }
    if (
      state?.status === "Approval Pending" &&
      !(
        state?.firstNegativeConfirmationDate &&
        state?.secondNegativeConfirmationDate &&
        state?.dateOfRecovery
      )
    ) {
      setIsValidFields({
        ...isValidFields,
        ["isValidFirstNegativeConfirmationDate"]:
          state?.firstNegativeConfirmationDate ? true : false,
        ["isValidSecondNegativeConfirmationDate"]:
          state?.secondNegativeConfirmationDate ? true : false,
        ["isValidDateOfRecovery"]: state?.dateOfRecovery ? true : false,
      });
      isErrorValidation = true;
    }
    if (
      state?.status === "Released" &&
      !(
        state?.firstNegativeConfirmationDate &&
        state?.secondNegativeConfirmationDate &&
        state?.dateOfRecovery &&
        state?.releaseInfoRemarks
      )
    ) {
      setIsValidFields({
        ...isValidFields,
        ["isValidFirstNegativeConfirmationDate"]:
          state?.firstNegativeConfirmationDate ? true : false,
        ["isValidSecondNegativeConfirmationDate"]:
          state?.secondNegativeConfirmationDate ? true : false,
        ["isValidDateOfRecovery"]: state?.dateOfRecovery ? true : false,
        ["isValidReleaseInfoRemarks"]: state?.releaseInfoRemarks ? true : false,
      });
      isErrorValidation = true;
    }
    if (
      (state?.status === "Deceased" ||
        state?.status === "Deceased After Realease") &&
      !state?.dateOfDeath
    ) {
      setIsValidFields({
        ...isValidFields,
        ["isValidDateOfDeath"]: state?.dateOfDeath ? true : false,
      });
      isErrorValidation = true;
    }

    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const userData = {
      patientId,
      registrationDate: covidPatientById?.registrationDate,
      confirmedDate: covidPatientById?.confirmedDate,
      nicNumber: covidPatientById?.nicNumber,
      passportNumber: covidPatientById?.passportNumber
        ? covidPatientById?.passportNumber
        : null,
      patientName: covidPatientById?.patientName,
      dateOfBirth: covidPatientById?.dateOfBirth,
      age: covidPatientById?.age,
      gender: covidPatientById?.gender,
      district: covidPatientById?.district,
      dsDivision: covidPatientById?.dsDivision,
      mohArea: covidPatientById?.mohArea,
      gramaNiladhariArea: covidPatientById?.gramaNiladhariArea,
      address: covidPatientById?.address,
      phoneNumber: covidPatientById?.phoneNumber,
      foreignEntrant: covidPatientById?.foreignEntrant,
      criticalMedicalInformation: covidPatientById?.criticalMedicalInformation
        ? covidPatientById?.criticalMedicalInformation
        : null,
      otherMedicalNotes: covidPatientById?.otherMedicalNotes
        ? covidPatientById?.otherMedicalNotes
        : null,
      medicalReportingAgency: covidPatientById?.medicalReportingAgency,
      reportedHealthCenter: covidPatientById?.reportedHealthCenter,
      guardianName: covidPatientById?.guardianName,
      guardianNICNumber: covidPatientById?.guardianNICNumber,
      guardianAddress: covidPatientById?.guardianAddress,
      guardianPhoneNumber: covidPatientById?.guardianPhoneNumber,
      guardianAssignedUsername: covidPatientById?.guardianAssignedUsername,
      guardianRelationship: covidPatientById?.guardianRelationship,
      localGovernmentInCharge: covidPatientById?.localGovernmentInCharge,
      severityUponDiagnosis: state?.severityUponDiagnosis,
      recommendedTreatmentType: state?.recommendTreatmentType,
      hospitalId: state?.hospital,
      wardNumber: state?.wardNumber,
      bedNumber: state?.bedNumber,
      hospitalAdmissionNo: state?.hospitalAdmissionNumber,
      dateOfHospitalization: state?.dateOfHospitalization,
      healthcareProfessionalInCharge:
        covidPatientById?.healthcareProfessionalInCharge,
      firstNegativeConfirmationDate: state?.firstNegativeConfirmationDate,
      secondNegativeConfirmationDate: state?.secondNegativeConfirmationDate,
      dateOfRecovery: state?.dateOfRecovery,
      dateOfDeath: state?.dateOfDeath,
      releaseInfoCertifiedBy: state?.releaseInfoCertifiedBy,
      releaseInfoRemarks: state?.releaseInfoRemarks,
      status: state?.status,
      createdDate: covidPatientById?.createdDate,
      createdBy: covidPatientById?.createdBy,
    };

    dispatch(updateCovidPatient(userData, navigate));
  };

  const onHandleDownload = () => {
    navigate(`/covid-patient-management/medical-certificate`, {
      state: {
        patientName: covidPatientById?.patientName,
        nicNumber: covidPatientById?.nicNumber,
        healthcareProfessionalName: healthcareProfessionals.find(
          (x) =>
            x.assignedUsername ===
            covidPatientById?.healthcareProfessionalInCharge
        )?.healthcareProfessionalName,
        dateOfRecovery: covidPatientById?.dateOfRecovery,
      },
      replace: true,
    });
  };

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="Update Patient" isArrowBack={true} />
        {state?.status === "Released" && (
          <AddButton
            title="Download Certificate"
            onHandleClick={onHandleDownload}
          />
        )}
      </SpaceBetween>

      <CustomTabs
        lists={tabLists}
        tabIndex={tabIndex}
        onChange={handleChange}
      />
      {tabIndex === 0 && (
        <PatientInformation covidPatientById={covidPatientById} />
      )}
      {tabIndex === 1 && (
        <AllocationInformation
          covidPatientById={covidPatientById}
          hospitals={hospitals}
          state={state}
          isValidFields={isValidFields}
          isClearFields={isClearFields}
          onHandleInputChange={onHandleInputChange}
          onHandleClearChange={onHandleClearChange}
        />
      )}
      {tabIndex === 2 && <MedicalHistory patientId={patientId} />}
      {tabIndex === 3 && (
        <ReleaseInfo
          state={state}
          statusLists={statusLists}
          isValidFields={isValidFields}
          isClearFields={isClearFields}
          onHandleInputChange={onHandleInputChange}
          onHandleClearChange={onHandleClearChange}
        />
      )}
      {(covidPatientById?.status === "Registration Completed" ||
        covidPatientById?.status === "Home Quarantined" ||
        covidPatientById?.status === "Hospitalized" ||
        covidPatientById?.status === "Approval Pending" ||
        covidPatientById?.status === "Released" ||
        covidPatientById?.status === "") && (
        <Box sx={{ mb: 2 }}>
          <FormActionButton
            type="button"
            Edit
            onCancelClick={onHandleCancel}
            onSubmitClick={checkValidity}
            loading={false}
          />
        </Box>
      )}
    </CustomCard>
  );
};

export default UpdatePatient;
