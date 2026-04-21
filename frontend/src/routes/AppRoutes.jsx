import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ServicePageLayout from '../layouts/ServicePageLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/About/AboutUs';
import Services from '../pages/Services/Services';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Authentication/Login';
import ScrollToTop from '../components/ScrollToTop';

// Import Dashboard
import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';

// Import Driver Management dropdown pages
import DriverApproval from '../pages/Admin/DriverManagement/DriverApproval';
import DocumentVerification from '../pages/Admin/DriverManagement/DocumentVerification';
import VehicleApproval from '../pages/Admin/DriverManagement/VehicleApproval';
import DriverSuspension from '../pages/Admin/DriverManagement/DriverSuspension';
import DriverProfile from '../pages/Admin/DriverManagement/DriverProfile';
import DriverRating from '../pages/Admin/DriverManagement/DriverRating';
import DriverEarnings from '../pages/Admin/DriverManagement/DriverEarnings';
import CustomerAccount from '../pages/Admin/DriverManagement/CustomerAccount';
import BanCustomer from '../pages/Admin/DriverManagement/BanCustomer';

// Import User Management dropdown pages
import UserRoleManagement from '../pages/Admin/UserManagement/UserRoleManagement';
import SystemConfiguration from '../pages/Admin/UserManagement/SystemConfiguration';
import LiveMap from '../pages/Admin/UserManagement/LiveMap';

// Import Ride Monitoring dropdown pages
import RideDetailView from '../pages/Admin/RideMonitoring/RideDetailView';
import RideEventLog from '../pages/Admin/RideMonitoring/RideEventLog';
import ManualRideAssignment from '../pages/Admin/RideMonitoring/ManualRideAssignment';
import RideCancellation from '../pages/Admin/RideMonitoring/RideCancellation';
import RideHistory from '../pages/Admin/RideMonitoring/RideHistory';
import DriverAssignmentLog from '../pages/Admin/RideMonitoring/DriverAssignmentLog';

// Import Pricing Management dropdown pages
import PricingRules from '../pages/Admin/PricingManagement/PricingRules';
import SurgePricing from '../pages/Admin/PricingManagement/SurgePricing';
import VehicleClassification from '../pages/Admin/PricingManagement/VehicleClassification';

// Import Payments & Finance dropdown pages
import PaymentLogs from '../pages/Admin/PaymentsFinance/PaymentLogs';
import WalletManagement from '../pages/Admin/PaymentsFinance/WalletManagement';
import LedgerView from '../pages/Admin/PaymentsFinance/LedgerView';
import PlatformCommission from '../pages/Admin/PaymentsFinance/PlatformCommission';
import RefundProcessing from '../pages/Admin/PaymentsFinance/RefundProcessing';
import ProfitLossReports from '../pages/Admin/PaymentsFinance/ProfitLossReports';

// Import Media & Verification dropdown pages
import DriverDocumentView from '../pages/Admin/MediaVerification/DriverDocumentView';
import VehicleImageView from '../pages/Admin/MediaVerification/VehicleImageView';
import VerificationFileManagement from '../pages/Admin/MediaVerification/VerificationFileManagement';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<ServicePageLayout />}>
          <Route index element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact-us' element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path='/auth'>
          <Route path='login' element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          {/* Dashboard Route - NEW */}
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          
          {/* Driver Management Dropdown Routes */}
          <Route path='drivers/approval' element={<DriverApproval />} />
          <Route path='drivers/document-verification' element={<DocumentVerification />} />
          <Route path='drivers/vehicle-approval' element={<VehicleApproval />} />
          <Route path='drivers/suspension' element={<DriverSuspension />} />
          <Route path='drivers/profile' element={<DriverProfile />} />
          <Route path='drivers/rating' element={<DriverRating />} />
          <Route path='drivers/earnings' element={<DriverEarnings />} />
          <Route path='drivers/customer-account' element={<CustomerAccount />} />
          <Route path='drivers/ban-customer' element={<BanCustomer />} />

          {/* User Management Dropdown Routes */}
          <Route path='users/role-management' element={<UserRoleManagement />} />
          <Route path='users/system-config' element={<SystemConfiguration />} />
          <Route path='users/live-map' element={<LiveMap />} />

          {/* Ride Monitoring Dropdown Routes */}
          <Route path='rides/detail-view' element={<RideDetailView />} />
          <Route path='rides/event-log' element={<RideEventLog />} />
          <Route path='rides/manual-assignment' element={<ManualRideAssignment />} />
          <Route path='rides/cancellation' element={<RideCancellation />} />
          <Route path='rides/history' element={<RideHistory />} />
          <Route path='rides/assignment-log' element={<DriverAssignmentLog />} />

          {/* Pricing Management Dropdown Routes */}
          <Route path='pricing/rules' element={<PricingRules />} />
          <Route path='pricing/surge' element={<SurgePricing />} />
          <Route path='pricing/vehicle-classification' element={<VehicleClassification />} />

          {/* Payments & Finance Dropdown Routes */}
          <Route path='payments/logs' element={<PaymentLogs />} />
          <Route path='payments/wallet' element={<WalletManagement />} />
          <Route path='payments/ledger' element={<LedgerView />} />
          <Route path='payments/commission' element={<PlatformCommission />} />
          <Route path='payments/refund' element={<RefundProcessing />} />
          <Route path='payments/profit-loss' element={<ProfitLossReports />} />

          {/* Media & Verification Dropdown Routes */}
          <Route path='media/driver-documents' element={<DriverDocumentView />} />
          <Route path='media/vehicle-images' element={<VehicleImageView />} />
          <Route path='media/verification-files' element={<VerificationFileManagement />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;