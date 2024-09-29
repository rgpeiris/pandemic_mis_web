export const MIN_SEARCH_FIELD_LENGTH = 3;
export const MAX_SEARCH_FIELD_LENGTH = 20;
export const PAGE_SIZE = 20;

export const GENERATE_QR_CODE_URL = "http://localhost:3000/check-in-out/";

export const STATUS_LIST = [
  { key: "Active", description: "Active" },
  { key: "Inactive", description: "Inactive" },
];

export const APPOINTMENTS_STATUS_LIST = [
  { key: "SCHEDULED", description: "Scheduled" },
  { key: "COMPLETED", description: "Completed" },
];

export const TESTING_RESULT_STATUS_LIST = [
  { key: "Positive", description: "Positive" },
  { key: "Negative", description: "Negative" },
];

export const TESTING_STATUS_LIST = [
  { key: "Isolation", description: "Isolation" },
  { key: "Quarantine", description: "Quarantine" },
];

export const SALUTATION_LIST = [
  { key: "Mr.", description: "Mr." },
  { key: "Ms.", description: "Ms." },
  { key: "Miss", description: "Miss" },
];

export const GENDER_LIST = [
  { key: "Male", description: "Male" },
  { key: "Female", description: "Female" },
];

export const USER_ROLE_LIST = [
  { key: "ADMIN", description: "ADMIN" },
  { key: "POLICYMAKER", description: "POLICYMAKER" },
  { key: "HEALTHCARE_PROFESSIONAL", description: "HEALTHCARE_PROFESSIONAL" },
  {
    key: "CHIEF_HEALTHCARE_PROFESSIONAL",
    description: "CHIEF_HEALTHCARE_PROFESSIONAL",
  },
];

export const DISTRICT_LIST = [
  { key: "Ampara", description: "Ampara" },
  { key: "Anuradhapura", description: "Anuradhapura" },
  { key: "Badulla", description: "Badulla" },
  { key: "Batticaloa", description: "Batticaloa" },
  { key: "Colombo", description: "Colombo" },
  { key: "Galle", description: "Galle" },
  { key: "Gampaha", description: "Gampaha" },
  { key: "Hambantota", description: "Hambantota" },
  { key: "Jaffna", description: "Jaffna" },
  { key: "Kalutara", description: "Kalutara" },
  { key: "Kandy", description: "Kandy" },
  { key: "Kegalle", description: "Kegalle" },
  { key: "Kilinochchi", description: "Kilinochchi" },
  { key: "Kurunegala", description: "Kurunegala" },
  { key: "Mannar", description: "Mannar" },
  { key: "Matale", description: "Matale" },
  { key: "Matara", description: "Matara" },
  { key: "Monaragala", description: "Monaragala" },
  { key: "Mullaitivu", description: "Mullaitivu" },
  { key: "Nuwara Eliya", description: "Nuwara Eliya" },
  { key: "Polonnaruwa", description: "Polonnaruwa" },
  { key: "Puttalam", description: "Puttalam" },
  { key: "Ratnapura", description: "Ratnapura" },
  { key: "Trincomalee", description: "Trincomalee" },
  { key: "Vavuniya", description: "Vavuniya" },
];

export const DS_DIVISION_LIST = [
  { key: "Ampara", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  {
    key: "Anuradhapura",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  { key: "Badulla", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  {
    key: "Batticaloa",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  {
    key: "Colombo",
    dsDivisions: [
      { key: "Colombo", description: "Colombo" },
      { key: "Piliyandala", description: "Piliyandala" },
    ],
  },
  { key: "Galle", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Gampaha", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  {
    key: "Hambantota",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  { key: "Jaffna", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Kalutara", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Kandy", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Kegalle", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  {
    key: "Kilinochchi",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  {
    key: "Kurunegala",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  { key: "Mannar", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Matale", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Matara", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  {
    key: "Monaragala",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  {
    key: "Mullaitivu",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  {
    key: "Nuwara Eliya",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  {
    key: "Polonnaruwa",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  { key: "Puttalam", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  { key: "Ratnapura", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
  {
    key: "Trincomalee",
    dsDivisions: [{ key: "Ampara", description: "Ampara" }],
  },
  { key: "Vavuniya", dsDivisions: [{ key: "Ampara", description: "Ampara" }] },
];

export const MOH_LIST = [
  {
    key: "Ampara",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Anuradhapura",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Badulla",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Batticaloa",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Colombo",
    mohList: [
      {
        key: "MOH Office, Piliyandala",
        description: "MOH Office, Piliyandala",
      },
    ],
  },
  {
    key: "Galle",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Gampaha",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Hambantota",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Jaffna",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Kalutara",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Kandy",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Kegalle",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Kilinochchi",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Kurunegala",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Mannar",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Matale",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Matara",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Monaragala",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Mullaitivu",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Nuwara Eliya",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Polonnaruwa",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Puttalam",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Ratnapura",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Trincomalee",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
  {
    key: "Vavuniya",
    mohList: [{ key: "MOH Office, Ampara", description: "MOH Office, Ampara" }],
  },
];

export const GRAMA_NILADHARI_DIVISION_LIST = [
  {
    key: "Ampara",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Anuradhapura",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Badulla",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Batticaloa",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Colombo",
    gndList: [
      {
        key: "Grama Niladhari Division, Piliyandala",
        description: "Grama Niladhari Division, Piliyandala",
      },
    ],
  },
  {
    key: "Galle",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Gampaha",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Hambantota",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Jaffna",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Kalutara",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Kandy",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Kegalle",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Kilinochchi",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Kurunegala",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Mannar",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Matale",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Matara",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Monaragala",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Mullaitivu",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Nuwara Eliya",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Polonnaruwa",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Puttalam",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Ratnapura",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Trincomalee",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
  {
    key: "Vavuniya",
    gndList: [
      {
        key: "Grama Niladhari Division, Ampara",
        description: "Grama Niladhari Division, Ampara",
      },
    ],
  },
];

export const ORGANIZATION_TYPES_LIST = [
  { key: "Restaurant", description: "Restaurant" },
  { key: "Supermarket", description: "Supermarket" },
  { key: "Hospital", description: "Hospital" },
  { key: "Auto Repair Shop", description: "Auto Repair Shop" },
];

export const DOSE_LIST = [
  { key: "1st Dose", description: "1st Dose" },
  { key: "2nd Dose", description: "2nd Dose" },
  { key: "3rd Dose", description: "3rd Dose" },
  { key: "4th Dose", description: "4th Dose" },
  { key: "5th Dose", description: "5th Dose" },
];

export const NEXT_DOSE_LIST = [
  { key: "2", description: "2" },
  { key: "3", description: "3" },
  { key: "4", description: "4" },
  { key: "5", description: "5" },
  { key: "0", description: "0" },
];

export const TREATMENT_TYPES_LIST = [
  {
    key: "Medical Institution/Temporary Treatment Center",
    description: "Medical Institution/Temporary Treatment Center",
  },
  { key: "Home Quarentine", description: "Home Quarentine" },
];

export const SEVERITY_LIST = [
  {
    key: "None",
    description: "None",
  },
  {
    key: "Mild",
    description: "Mild",
  },
  {
    key: "Moderate",
    description: "Moderate",
  },
  {
    key: "Severe",
    description: "Severe",
  },
  {
    key: "Very Severe",
    description: "Very Severe",
  },
];

export const PATIENT_STATUS_LIST = [
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
  {
    key: "Approval Pending",
    description: "Approval Pending",
  },
  {
    key: "Released",
    description: "Released",
  },
  {
    key: "Deceased",
    description: "Deceased",
  },
  {
    key: "Deceased After Realease",
    description: "Deceased After Realease",
  },
];

export const VACCINATION_REPORT_LIST = [
  {
    key: "COVID Vaccination Centers",
    description: "COVID Vaccination Centers",
  },
  {
    key: "COVID Vaccination Appointments",
    description: "COVID Vaccination Appointments",
  },
  { key: "COVID Vaccination", description: "COVID Vaccination" },
];

export const TESTING_REPORT_LIST = [
  {
    key: "COVID Testing Centers",
    description: "COVID Testing Centers",
  },
  {
    key: "COVID Testing Appointments",
    description: "COVID Testing Appointments",
  },
  { key: "COVID Testing Results", description: "COVID Testing Results" },
];

export const PATIENT_REPORT_LIST = [
  {
    key: "COVID Patients",
    description: "COVID Patients",
  },
  {
    key: "Overall Statistics",
    description: "Overall Statistics",
  },
  {
    key: "Month Wise Reported Cases",
    description: "Month Wise Reported Cases",
  },
];
