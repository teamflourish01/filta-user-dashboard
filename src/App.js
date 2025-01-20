import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Sidebar/Sidebar";
import MyCard from "./pages/MyCard";
import NFCCard from "./pages/NFCCard";
// import DigitalReviewCard from "./pages/DigitalReviewCard";
import EmailSignature from "./pages/EmailSignature";
import VirtualBackground from "./pages/VirtualBackground";
import Contacts from "./pages/Contacts";
import MyLeads from "./pages/MyLeads";
import Settings from "./pages/Settings";
import StandardPlan from "./Component/StandardPlan/StandardPlan";
import PremiumPlan from "./Component/PremiumPlan/PremiumPlan";
import MyCardmain from "./Component/MyCard/MyCardmain";
// import Digitalcard from "./Component/digitalcard/Digitalcard";
import Signup from "./Component/signup/Signup";
import Login from "./Component/login/Login";
import Forgpassword from "./Component/Forgatepassword/Forgpassword";

import Requestfeature from "./Component/Requestfeature/Requestfeature";
import Subscription from "./Component/subscription/Subscription";
import Support from "./Component/support/Support";
import { Rateus } from "./Component/rateusandfeedback/Rateus";

import SignupFlow from "./Component/Auth/SignupFlow";
import LeftAlign from "./ViewCard/LeftAlign/LeftAlign";
import CenterAlign from "./ViewCard/CenterAlign/CenterAlign";
import Portrait from "./ViewCard/Portrait/Portrait";
// import ParentComponent from "./Component/MyCard/parent/ParentComponent";

// Layout for Authentication Pages
const AuthLayout = ({ children }) => {
  return <div className="auth-layout">{children}</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <SignupFlow />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/forgatepass"
          element={
            <AuthLayout>
              <Forgpassword />
            </AuthLayout>
          }
        />

        {/* View Card Routes*/}
        <Route path="/card/:username" element={<LeftAlign />} />
        <Route path="/center-align" element={<CenterAlign />} />
        <Route path="/portrait" element={<Portrait />} />

        {/* Main Application Layout */}
        <Route
          path="*"
          element={
            <div className="App">
              <div className="navbar-container">
                <Navbar />
              </div>
              <div className="sidebar-container">
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    {/* <Route path="/parent" element={<ParentComponent/>}/> */}
                    <Route path="/my-card" element={<MyCardmain />} />
                    <Route path="my-card/edit" element={<MyCard />} />
                    <Route path="/nfc-card" element={<NFCCard />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/rate-us" element={<Rateus />} />
                    {/* <Route
                      path="/digital-review-card"
                      element={<DigitalReviewCard />}
                    /> */}
                    <Route
                      path="/email-signature"
                      element={<EmailSignature />}
                    />
                    <Route
                      path="/virtual-background"
                      element={<VirtualBackground />}
                    />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/my-leads" element={<MyLeads />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                      path="/nfc-card/standardplan"
                      element={<StandardPlan />}
                    />
                    <Route
                      path="/request-feature"
                      element={<Requestfeature />}
                    />
                    <Route
                      path="/nfc-card/premium-plan"
                      element={<PremiumPlan />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
