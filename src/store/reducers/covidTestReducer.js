import {
  GET_TESTINGS,
  GET_TESTINGS_SUCCESS,
  GET_TESTINGS_FAILED,
  GET_TEST_CENTRES,
  GET_TEST_CENTRES_SUCCESS,
  GET_TEST_CENTRES_FAILED,
  GET_SCHEDULED_TEST_CENTRES,
  GET_SCHEDULED_TEST_CENTRES_SUCCESS,
  GET_SCHEDULED_TEST_CENTRES_FAILED,
  GET_TESTS_APPOINTMENTS,
  GET_TESTS_APPOINTMENTS_SUCCESS,
  GET_TESTS_APPOINTMENTS_FAILED,
  GET_PANDEMIC_TEST_RESULTS,
  GET_PANDEMIC_TEST_RESULTS_SUCCESS,
  GET_PANDEMIC_TEST_RESULTS_FAILED,
  GET_TESTING_BY_ID,
  GET_TESTING_BY_ID_SUCCESS,
  GET_TESTING_BY_ID_FAILED,
  GET_TEST_CENTRE_BY_ID,
  GET_TEST_CENTRE_BY_ID_SUCCESS,
  GET_TEST_CENTRE_BY_ID_FAILED,
  GET_SCHEDULED_TEST_CENTRE_BY_ID,
  GET_SCHEDULED_TEST_CENTRE_BY_ID_SUCCESS,
  GET_SCHEDULED_TEST_CENTRE_BY_ID_FAILED,
  GET_TESTS_APPOINTMENT_BY_ID,
  GET_TESTS_APPOINTMENT_BY_ID_SUCCESS,
  GET_TESTS_APPOINTMENT_BY_ID_FAILED,
  GET_PANDEMIC_TEST_RESULT_BY_ID,
  GET_PANDEMIC_TEST_RESULT_BY_ID_SUCCESS,
  GET_PANDEMIC_TEST_RESULT_BY_ID_FAILED,
  POST_TESTING,
  POST_TESTING_SUCCESS,
  POST_TESTING_FAILED,
  POST_TEST_CENTRE,
  POST_TEST_CENTRE_SUCCESS,
  POST_TEST_CENTRE_FAILED,
  POST_SCHEDULED_TEST_CENTRE,
  POST_SCHEDULED_TEST_CENTRE_SUCCESS,
  POST_SCHEDULED_TEST_CENTRE_FAILED,
  POST_TESTS_APPOINTMENT,
  POST_TESTS_APPOINTMENT_SUCCESS,
  POST_TESTS_APPOINTMENT_FAILED,
  POST_PANDEMIC_TEST_RESULT,
  POST_PANDEMIC_TEST_RESULT_SUCCESS,
  POST_PANDEMIC_TEST_RESULT_FAILED,
  PUT_TESTING,
  PUT_TESTING_SUCCESS,
  PUT_TESTING_FAILED,
  PUT_TEST_CENTRE,
  PUT_TEST_CENTRE_SUCCESS,
  PUT_TEST_CENTRE_FAILED,
  PUT_SCHEDULED_TEST_CENTRE,
  PUT_SCHEDULED_TEST_CENTRE_SUCCESS,
  PUT_SCHEDULED_TEST_CENTRE_FAILED,
  PUT_TESTS_APPOINTMENT,
  PUT_TESTS_APPOINTMENT_SUCCESS,
  PUT_TESTS_APPOINTMENT_FAILED,
  PUT_PANDEMIC_TEST_RESULT,
  PUT_PANDEMIC_TEST_RESULT_SUCCESS,
  PUT_PANDEMIC_TEST_RESULT_FAILED,
  GET_SCHEDULED_TEST_CENTRES_BY_INFO,
  GET_SCHEDULED_TEST_CENTRES_BY_INFO_SUCCESS,
  GET_SCHEDULED_TEST_CENTRES_BY_INFO_FAILED,
} from "../actions";

export const initialState = {
  isGettingTestings: false,
  isErrorGettingTestings: false,
  covidTestings: [],
  isGettingTestCentres: false,
  isErrorGettingTestCentres: false,
  testCentres: [],
  isGettingScheduledTestCentres: false,
  isErrorGettingScheduledTestCentres: false,
  scheduledTestCentres: [],
  isGettingTestsAppointments: false,
  isErrorGettingTestsAppointments: false,
  testsAppointments: [],
  isGettingPandemicTestResults: false,
  isErrorGettingPandemicTestResults: false,
  pandemicTestResults: [],
  isGettingTestingById: false,
  isErrorGettingTestingById: false,
  covidTestingById: {},
  isGettingTestCentreById: false,
  isErrorGettingTestCentreById: false,
  testCentreById: {},
  isGettingScheduledTestCentreById: false,
  isErrorGettingScheduledTestCentreById: false,
  scheduledTestCentreById: {},
  isGettingTestsAppointmentById: false,
  isErrorGettingTestsAppointmentById: false,
  testsAppointmentById: {},
  isGettingPandemicTestResultById: false,
  isErrorGettingPandemicTestResultById: false,
  pandemicTestResultsById: {},
  isCreatingTesting: false,
  isErrorCreatingTesting: false,
  isUpdatingTesting: false,
  isErrorUpdatingTesting: false,
  isCreatingTestCentre: false,
  isErrorCreatingTestCentre: false,
  isUpdatingTestCentre: false,
  isErrorUpdatingTestCentre: false,
  isCreatingScheduledTestCentre: false,
  isErrorCreatingScheduledTestCentre: false,
  isUpdatingScheduledTestCentre: false,
  isErrorUpdatingScheduledTestCentre: false,
  isCreatingTestsAppointment: false,
  isErrorCreatingTestsAppointment: false,
  isUpdatingTestsAppointment: false,
  isErrorUpdatingTestsAppointment: false,
  isCreatingPandemicTestResult: false,
  isErrorCreatingPandemicTestResult: false,
  isUpdatingPandemicTestResult: false,
  isErrorUpdatingPandemicTestResult: false,
  isGettingScheduledTestCentresByInfo: false,
  isErrorGettingScheduledTestCentresByInfo: false,
  scheduledTestCentresByInfo: [],
};

const covidTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TESTINGS:
      return {
        ...state,
        isGettingTestings: true,
        isErrorGettingTestings: false,
      };

    case GET_TESTINGS_SUCCESS:
      const { response } = action;
      return {
        ...state,
        isGettingTestings: false,
        covidTestings: response,
      };

    case GET_TESTINGS_FAILED:
      return {
        ...state,
        isGettingTestings: false,
        isErrorGettingTestings: true,
      };

    case GET_TEST_CENTRES:
      return {
        ...state,
        isGettingTestCentres: true,
        isErrorGettingTestCentres: false,
      };

    case GET_TEST_CENTRES_SUCCESS:
      const { resTestCentres } = action;
      return {
        ...state,
        isGettingTestCentres: false,
        testCentres: resTestCentres,
      };

    case GET_TEST_CENTRES_FAILED:
      return {
        ...state,
        isGettingTestCentres: false,
        isErrorGettingTestCentres: true,
      };

    case GET_SCHEDULED_TEST_CENTRES:
      return {
        ...state,
        isGettingScheduledTestCentres: true,
        isErrorGettingScheduledTestCentres: false,
      };

    case GET_SCHEDULED_TEST_CENTRES_SUCCESS:
      const { resScheduledTestCentres } = action;
      return {
        ...state,
        isGettingScheduledTestCentres: false,
        scheduledTestCentres: resScheduledTestCentres,
      };

    case GET_SCHEDULED_TEST_CENTRES_FAILED:
      return {
        ...state,
        isGettingScheduledTestCentres: false,
        isErrorGettingScheduledTestCentres: true,
      };

    case GET_TESTS_APPOINTMENTS:
      return {
        ...state,
        isGettingTestsAppointments: true,
        isErrorGettingTestsAppointments: false,
      };

    case GET_TESTS_APPOINTMENTS_SUCCESS:
      const { resTestsAppointments } = action;
      return {
        ...state,
        isGettingTestsAppointments: false,
        testsAppointments: resTestsAppointments,
      };

    case GET_TESTS_APPOINTMENTS_FAILED:
      return {
        ...state,
        isGettingTestsAppointments: false,
        isErrorGettingTestsAppointments: true,
      };

    case GET_PANDEMIC_TEST_RESULTS:
      return {
        ...state,
        isGettingPandemicTestResults: true,
        isErrorGettingPandemicTestResults: false,
      };

    case GET_PANDEMIC_TEST_RESULTS_SUCCESS:
      const { resPandemicTestResults } = action;
      return {
        ...state,
        isGettingPandemicTestResults: false,
        pandemicTestResults: resPandemicTestResults,
      };

    case GET_PANDEMIC_TEST_RESULTS_FAILED:
      return {
        ...state,
        isGettingPandemicTestResults: false,
        isErrorGettingPandemicTestResults: true,
      };

    case GET_TESTING_BY_ID:
      return {
        ...state,
        isGettingTestingById: true,
        isErrorGettingTestingById: false,
      };

    case GET_TESTING_BY_ID_SUCCESS:
      const { resCovidTestingById } = action;
      return {
        ...state,
        isGettingTestingById: false,
        covidTestingById: resCovidTestingById,
      };

    case GET_TESTING_BY_ID_FAILED:
      return {
        ...state,
        isGettingTestingById: false,
        isErrorGettingTestingById: true,
      };

    case GET_TEST_CENTRE_BY_ID:
      return {
        ...state,
        isGettingTestCentreById: true,
        isErrorGettingTestCentreById: false,
      };

    case GET_TEST_CENTRE_BY_ID_SUCCESS:
      const { resTestCentreById } = action;
      return {
        ...state,
        isGettingTestCentreById: false,
        testCentreById: resTestCentreById,
      };

    case GET_TEST_CENTRE_BY_ID_FAILED:
      return {
        ...state,
        isGettingTestCentreById: false,
        isErrorGettingTestCentreById: true,
      };

    case GET_SCHEDULED_TEST_CENTRE_BY_ID:
      return {
        ...state,
        isGettingScheduledTestCentreById: true,
        isErrorGettingScheduledTestCentreById: false,
      };

    case GET_SCHEDULED_TEST_CENTRE_BY_ID_SUCCESS:
      const { resScheduledTestCentreById } = action;
      return {
        ...state,
        isGettingScheduledTestCentreById: false,
        scheduledTestCentreById: resScheduledTestCentreById,
      };

    case GET_SCHEDULED_TEST_CENTRE_BY_ID_FAILED:
      return {
        ...state,
        isGettingScheduledTestCentreById: false,
        isErrorGettingScheduledTestCentreById: true,
      };

    case GET_TESTS_APPOINTMENT_BY_ID:
      return {
        ...state,
        isGettingTestsAppointmentById: true,
        isErrorGettingTestsAppointmentById: false,
      };

    case GET_TESTS_APPOINTMENT_BY_ID_SUCCESS:
      const { resTestsAppointmentById } = action;
      return {
        ...state,
        isGettingTestsAppointmentById: false,
        testsAppointmentById: resTestsAppointmentById,
      };

    case GET_TESTS_APPOINTMENT_BY_ID_FAILED:
      return {
        ...state,
        isGettingTestsAppointmentById: false,
        isErrorGettingTestsAppointmentById: true,
      };

    case GET_PANDEMIC_TEST_RESULT_BY_ID:
      return {
        ...state,
        isGettingPandemicTestResultById: true,
        isErrorGettingPandemicTestResultById: false,
      };

    case GET_PANDEMIC_TEST_RESULT_BY_ID_SUCCESS:
      const { resPandemicTestResultById } = action;
      return {
        ...state,
        isGettingPandemicTestResultById: false,
        pandemicTestResultsById: resPandemicTestResultById,
      };

    case GET_PANDEMIC_TEST_RESULT_BY_ID_FAILED:
      return {
        ...state,
        isGettingPandemicTestResultById: false,
        isErrorGettingPandemicTestResultById: true,
      };

    case POST_TESTING:
      return {
        ...state,
        isCreatingTesting: true,
        isErrorCreatingTesting: false,
      };

    case POST_TESTING_SUCCESS:
      return {
        ...state,
        isCreatingTesting: false,
      };

    case POST_TESTING_FAILED:
      return {
        ...state,
        isCreatingTesting: false,
        isErrorCreatingTesting: true,
      };

    case PUT_TESTING:
      return {
        ...state,
        isUpdatingTesting: true,
        isErrorUpdatingTesting: false,
      };

    case PUT_TESTING_SUCCESS:
      return {
        ...state,
        isUpdatingTesting: false,
      };

    case PUT_TESTING_FAILED:
      return {
        ...state,
        isUpdatingTesting: false,
        isErrorUpdatingTesting: true,
      };

    case POST_TEST_CENTRE:
      return {
        ...state,
        isCreatingTestCentre: true,
        isErrorCreatingTestCentre: false,
      };

    case POST_TEST_CENTRE_SUCCESS:
      return {
        ...state,
        isCreatingTestCentre: false,
      };

    case POST_TEST_CENTRE_FAILED:
      return {
        ...state,
        isCreatingTestCentre: false,
        isErrorCreatingTestCentre: true,
      };

    case PUT_TEST_CENTRE:
      return {
        ...state,
        isUpdatingTestCentre: true,
        isErrorUpdatingTestCentre: false,
      };

    case PUT_TEST_CENTRE_SUCCESS:
      return {
        ...state,
        isUpdatingTestCentre: false,
      };

    case PUT_TEST_CENTRE_FAILED:
      return {
        ...state,
        isUpdatingTestCentre: false,
        isErrorUpdatingTestCentre: true,
      };

    case POST_SCHEDULED_TEST_CENTRE:
      return {
        ...state,
        isCreatingScheduledTestCentre: true,
        isErrorCreatingScheduledTestCentre: false,
      };

    case POST_SCHEDULED_TEST_CENTRE_SUCCESS:
      return {
        ...state,
        isCreatingScheduledTestCentre: false,
      };

    case POST_SCHEDULED_TEST_CENTRE_FAILED:
      return {
        ...state,
        isCreatingScheduledTestCentre: false,
        isErrorCreatingScheduledTestCentre: true,
      };

    case PUT_SCHEDULED_TEST_CENTRE:
      return {
        ...state,
        isUpdatingScheduledTestCentre: true,
        isErrorUpdatingScheduledTestCentre: false,
      };

    case PUT_SCHEDULED_TEST_CENTRE_SUCCESS:
      return {
        ...state,
        isUpdatingScheduledTestCentre: false,
      };

    case PUT_SCHEDULED_TEST_CENTRE_FAILED:
      return {
        ...state,
        isUpdatingScheduledTestCentre: false,
        isErrorUpdatingScheduledTestCentre: true,
      };

    case POST_TESTS_APPOINTMENT:
      return {
        ...state,
        isCreatingTestsAppointment: true,
        isErrorCreatingTestsAppointment: false,
      };

    case POST_TESTS_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isCreatingTestsAppointment: false,
      };

    case POST_TESTS_APPOINTMENT_FAILED:
      return {
        ...state,
        isCreatingTestsAppointment: false,
        isErrorCreatingTestsAppointment: true,
      };

    case PUT_TESTS_APPOINTMENT:
      return {
        ...state,
        isUpdatingTestsAppointment: true,
        isErrorUpdatingTestsAppointment: false,
      };

    case PUT_TESTS_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isUpdatingTestsAppointment: false,
      };

    case PUT_TESTS_APPOINTMENT_FAILED:
      return {
        ...state,
        isUpdatingTestsAppointment: false,
        isErrorUpdatingTestsAppointment: true,
      };

    case POST_PANDEMIC_TEST_RESULT:
      return {
        ...state,
        isCreatingPandemicTestResult: true,
        isErrorCreatingPandemicTestResult: false,
      };

    case POST_PANDEMIC_TEST_RESULT_SUCCESS:
      return {
        ...state,
        isCreatingPandemicTestResult: false,
      };

    case POST_PANDEMIC_TEST_RESULT_FAILED:
      return {
        ...state,
        isCreatingPandemicTestResult: false,
        isErrorCreatingPandemicTestResult: true,
      };

    case PUT_PANDEMIC_TEST_RESULT:
      return {
        ...state,
        isUpdatingPandemicTestResult: true,
        isErrorUpdatingPandemicTestResult: false,
      };

    case PUT_PANDEMIC_TEST_RESULT_SUCCESS:
      return {
        ...state,
        isUpdatingPandemicTestResult: false,
      };

    case PUT_PANDEMIC_TEST_RESULT_FAILED:
      return {
        ...state,
        isUpdatingPandemicTestResult: false,
        isErrorUpdatingPandemicTestResult: true,
      };

    case GET_SCHEDULED_TEST_CENTRES_BY_INFO:
      return {
        ...state,
        isGettingScheduledTestCentresByInfo: true,
        isErrorGettingScheduledTestCentresByInfo: false,
      };

    case GET_SCHEDULED_TEST_CENTRES_BY_INFO_SUCCESS:
      const { resScheduledTestCentresByInfo } = action;
      return {
        ...state,
        isGettingScheduledTestCentresByInfo: false,
        scheduledTestCentresByInfo: resScheduledTestCentresByInfo,
      };

    case GET_SCHEDULED_TEST_CENTRES_BY_INFO_FAILED:
      return {
        ...state,
        isGettingScheduledTestCentresByInfo: false,
        isErrorGettingScheduledTestCentresByInfo: true,
      };

    default:
      return state;
  }
};

export default covidTestReducer;
