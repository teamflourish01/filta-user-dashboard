import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import MyCard from './pages/MyCard';
import NFCCard from './pages/NFCCard';
import DigitalReviewCard from './pages/DigitalReviewCard';
import EmailSignature from './pages/EmailSignature';
import VirtualBackground from './pages/VirtualBackground';
import Contacts from './pages/Contacts';
import MyLeads from './pages/MyLeads';
import Settings from './pages/Settings';
import StandardPlan from './Component/StandardPlan/StandardPlan';
import PremiumPlan from './Component/PremiumPlan/PremiumPlan';
import MyCardmain from './Component/MyCard/MyCardmain';
import Digitalcard from './Component/digitalcard/Digitalcard';
import Signup from './Component/signup/Signup';
import Login from './Component/login/Login';
import Forgpassword from './Component/Forgatepassword/Forgpassword';


// import Subscription from './Pages/Subscription';
// import Support from './Pages/Support';
// import RateUs from './Pages/RateUs';
// import Feedback from './Pages/Feedback';

function App() {
    return (
        <Router>
        
            <div className="App">
            <Routes>
                 <Route path="/digitalcard" element={<Digitalcard/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/forgatepass" element={<Forgpassword/>}/>
            </Routes>
                <div className="navbar-container">
                    {/* <Navbar /> */}
                </div>
                <div className="sidebar-container">
                    {/* <Sidebar /> */}
                    <div className="main-content">
                        <Routes>
                           
                          
                           
                           
                           
                            <Route path="/" element={<MyCardmain/>} />
                            <Route path="/edit/mycard" element={<MyCard/>} />                            
                            <Route path="/nfc-card" element={<NFCCard />} />
                            <Route path="/digital-review-card" element={<DigitalReviewCard />} />
                            <Route path="/email-signature" element={<EmailSignature />} />
                            <Route path="/virtual-background" element={<VirtualBackground />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/my-leads" element={<MyLeads />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path='/nfc-card/standardplan' element={<StandardPlan/>}/>
                            <Route path='/nfc-card/premium-plan' element={<PremiumPlan/>}/>
                            {/* <Route path='/digitalcard' element={} */}
                            {/* <Route path="/subscription" element={<Subscription />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/rate-us" element={<RateUs />} />
                            <Route path="/feedback" element={<Feedback />} /> */}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
