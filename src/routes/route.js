import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HandleOffline from "./handleOffline";
import ProtectedRoutes from "./protectedRoutes";
import PublicRoutes from "./publicRoutes";
import ScrollToTop from "../hooks/scrollToTop";

import Layout from "../components/layout";

import { WebPage } from "../containers/webPage";

import { Login } from "../containers/auth";
import { Dashboard } from "../containers/dashboard";

import { UserManagement } from "../containers/user";

import { UserRoleManagement } from "../containers/userRole";

import {
  CovidVaccineManagement,
  ManageVaccines,
  ManageVaccinationCentres,
  ManageScheduledVaccinationCentres,
  ManageVaccinationAppointments,
  ManageVaccinations,
} from "../containers/covidVaccine";

import {
  CovidTestManagement,
  ManageCovidTestings,
  ManageScheduledTestingCentres,
  ManageTestingAppointments,
  ManageTestingCentres,
  ManageTestingResults,
  MedicalTestingCertificate,
} from "../containers/covidTest";

import {
  CovidPatientManagement,
  UpdatePatient,
  MedicalCertificate,
} from "../containers/covidPatient";

import {
  AdminFunctionManagement,
  ManageHospitals,
  ManageHealthcareProfessionals,
  ManageGovOfficersInCharge,
} from "../containers/adminFunction";

import {
  CovidContactManagement,
  ManageOrganizations,
  ManageContacts,
  CreateOrganizationPublic,
  DownloadQrCode,
  CheckInOut,
  StaySafe,
  TraceOrganizationContacts,
} from "../containers/covidContact";

import { CovidNewsManagement } from "../containers/covidNews";

import { ApprovalManagement } from "../containers/approval";

import {
  ReportManagement,
  ContactsReports,
  PatientsReports,
  TestingReports,
  VaccinationReports,
  CovidContactsReport,
  CovidPatientsReport,
  TestingCentersReport,
  TestingAppointmentsReport,
  TestingResultsReport,
  VaccinationCentersReport,
  VaccinationAppointmentsReport,
  VaccinationsReport,
} from "../containers/report";

import { ContactUs } from "../containers/contactUs";

import { Profile } from "../containers/profile";

import { PdfTest } from "../containers/pdf";

const Navigator = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<HandleOffline />}>
          {/* Routes which are accessible without login */}
          <Route element={<PublicRoutes />}>
            <Route path="/home" element={<WebPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register-organization"
              element={<CreateOrganizationPublic />}
            />
            <Route
              path="/download-qr-code/:organizationId"
              element={<DownloadQrCode />}
            />
            <Route
              path="/check-in-out/:organizationId"
              element={<CheckInOut />}
            />
            <Route path="/stay-safe" element={<StaySafe />} />
            <Route
              path="/trace-organization-contacts/:organizationId"
              element={<TraceOrganizationContacts />}
            />
            <Route path="/pdf-test" element={<PdfTest />} />
          </Route>

          {/* Routes which are accessible after login  */}
          <Route element={<Layout />}>
            <Route element={<ProtectedRoutes />}>
              {/* Dashboard  */}
              <Route path="/" element={<Dashboard />} />

              {/* User Management  */}
              <Route path="user-management">
                <Route index={true} element={<UserManagement />} />
              </Route>

              {/* User Role Management  */}
              <Route path="role-management">
                <Route index={true} element={<UserRoleManagement />} />
              </Route>

              {/* Admin Function Management  */}
              <Route path="admin-function-management">
                <Route index={true} element={<AdminFunctionManagement />} />
                <Route path="manage-hospitals" element={<ManageHospitals />} />
                <Route
                  path="manage-healthcare-professionals"
                  element={<ManageHealthcareProfessionals />}
                />
                <Route
                  path="manage-officers-in-charge"
                  element={<ManageGovOfficersInCharge />}
                />
              </Route>

              {/* COVID Vaccine Management  */}
              <Route path="covid-vaccine-management">
                <Route index={true} element={<CovidVaccineManagement />} />
                <Route path="manage-vaccines" element={<ManageVaccines />} />
                <Route
                  path="manage-vaccination-centres"
                  element={<ManageVaccinationCentres />}
                />
                <Route
                  path="manage-scheduled-vaccination-centres"
                  element={<ManageScheduledVaccinationCentres />}
                />
                <Route
                  path="manage-vaccination-appointments"
                  element={<ManageVaccinationAppointments />}
                />
                <Route
                  path="manage-vaccinations"
                  element={<ManageVaccinations />}
                />
              </Route>

              {/* COVID Test Management  */}
              <Route path="covid-test-management">
                <Route index={true} element={<CovidTestManagement />} />
                <Route
                  path="manage-covid-testings"
                  element={<ManageCovidTestings />}
                />
                <Route
                  path="manage-testing-centres"
                  element={<ManageTestingCentres />}
                />
                <Route
                  path="manage-scheduled-testing-centres"
                  element={<ManageScheduledTestingCentres />}
                />
                <Route
                  path="manage-testing-appointments"
                  element={<ManageTestingAppointments />}
                />
                <Route
                  path="manage-testing-results"
                  element={<ManageTestingResults />}
                />
                <Route
                  path="medical-testing-certificate"
                  element={<MedicalTestingCertificate />}
                />
              </Route>

              {/* COVID Patient Management  */}
              <Route path="covid-patient-management">
                <Route index={true} element={<CovidPatientManagement />} />
                <Route
                  path="update-patient/:patientId"
                  element={<UpdatePatient />}
                />
                <Route
                  path="medical-certificate"
                  element={<MedicalCertificate />}
                />
              </Route>

              {/* COVID Contact Management  */}
              <Route path="covid-contact-management">
                <Route index={true} element={<CovidContactManagement />} />
                <Route
                  path="manage-organizations"
                  element={<ManageOrganizations />}
                />
                <Route path="manage-contacts" element={<ManageContacts />} />
              </Route>

              {/* COVID News Management  */}
              <Route path="covid-news-management">
                <Route index={true} element={<CovidNewsManagement />} />
              </Route>

              {/* Approval Management  */}
              <Route path="approval-management">
                <Route index={true} element={<ApprovalManagement />} />
              </Route>

              {/* Report Management  */}
              <Route path="report-management">
                <Route index={true} element={<ReportManagement />} />
                <Route
                  path="covid-contacts-reports"
                  element={<ContactsReports />}
                />
                <Route
                  path="covid-patients-reports"
                  element={<PatientsReports />}
                />
                <Route
                  path="covid-testing-reports"
                  element={<TestingReports />}
                />
                <Route
                  path="covid-vaccination-reports"
                  element={<VaccinationReports />}
                />
                <Route
                  path="covid-contacts-report"
                  element={<CovidContactsReport />}
                />
                <Route
                  path="covid-patients-report"
                  element={<CovidPatientsReport />}
                />
                <Route
                  path="testing-centers-report"
                  element={<TestingCentersReport />}
                />
                <Route
                  path="testing-appointments-report"
                  element={<TestingAppointmentsReport />}
                />
                <Route
                  path="testing-results-report"
                  element={<TestingResultsReport />}
                />
                <Route
                  path="vaccination-centers-report"
                  element={<VaccinationCentersReport />}
                />
                <Route
                  path="vaccination-appointments-report"
                  element={<VaccinationAppointmentsReport />}
                />
                <Route
                  path="vaccinations-report"
                  element={<VaccinationsReport />}
                />
              </Route>

              {/* Contact Us  */}
              <Route path="/contact-us" element={<ContactUs />} />

              {/* Profile  */}
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
