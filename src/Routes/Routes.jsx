import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Main from "../Layout/Main";
import Login from "../Components/Registration/Login";
import Registration from "../Components/Registration/Registration";
import OtpVerify from "../Components/Registration/OtpVerify";
import Test from "../Components/Test";
import Quiz from "../Components/Quiz/Quiz";
import Result from "../Components/Quiz/Result";
import Dashboard from "../Components/Admin/Dashboard";
import SetQuestion from "../Components/Admin/SetQuestion";
import UserList from "../Components/Admin/UserList";
import QuestionList from "../Components/Admin/QuestionList";
import QuestionView from "../Components/Admin/QuestionView";
import CreateModule from "../Components/Admin/CreateModule";
import DashPanel from "../Components/Admin/DashPanel";
import SetModuleMaterials from "../Components/Admin/SetModuleMaterials";
import ControlCategory from "../Components/Admin/ControlCategory";
import ManageAdmin from "../Components/Admin/ManageAdmin";
import CreateAdmin from "../Components/Admin/CreateAdmin";
import UserProfile from "../Components/UserProfile/UserProfile";
import CoreModule from "../Components/CoreModule/CoreModule";
import ErrorPage from "../Components/Error/ErrorPage";
import ModuleRequest from "../Components/Admin/ModuleRequest";
import UserPerformance from "../Components/Admin/UserPerformance";
import PrivateRoute from "./PrivateRoute";
import QuizSetting from "../Components/Admin/QuizSetting";
import ReviewQuiz from "../Components/Quiz/ReviewQuiz";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "otp",
        element: <OtpVerify />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "result",
        element: <Result />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "core-module/:moduleId",
        element: <CoreModule />,
      },
      {
        path: "/review-quiz",
        element: <ReviewQuiz />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/set-question",
        element: <SetQuestion />,
      },
      {
        path: "/dashboard/user-list",
        element: <UserList />,
      },
      {
        path: "/dashboard/question-list",
        element: <QuestionList />,
      },
      {
        path: "/dashboard/question-view",
        element: <QuestionView />,
      },
      {
        path: "/dashboard/create-module",
        element: <CreateModule />,
      },
      {
        path: "/dashboard",
        element: <DashPanel />,
      },
      {
        path: "/dashboard/set-module-materials",
        element: <SetModuleMaterials />,
      },
      {
        path: "/dashboard/control-category",
        element: <ControlCategory />,
      },
      {
        path: "/dashboard/manage-admin",
        element: <ManageAdmin />,
      },
      {
        path: "/dashboard/add-admin",
        element: <CreateAdmin />,
      },
      {
        path: "/dashboard/module-request",
        element: <ModuleRequest />,
      },
      {
        path: "/dashboard/user-performance",
        element: <UserPerformance />,
      },
      {
        path: "/dashboard/quiz-setting",
        element: <QuizSetting />,
      },
    ],
  },
]);
