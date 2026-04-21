import {
    FaUsers,
    FaUserTie,
    FaMapMarkedAlt,
    FaMoneyBillWave,
    FaCreditCard,
    FaTag,
    FaShieldAlt,
    FaChartLine,
    FaTruck,
    FaLock,
    FaIdCard,
    FaCheckCircle,
    FaFileAlt,
    FaCar,
    FaUserSlash,
    FaUserCheck,
    FaStar,
    FaDollarSign,
    FaUserMinus,
    FaUserCog,
    FaSlidersH,
    FaMapMarkerAlt,
    FaEye,
    FaHistory,
    FaUserPlus,
    FaTrashAlt,
    FaWallet,
    FaBook,
    FaHandshake,
    FaRedoAlt,
    FaChartPie,
    FaImage,
    FaFileUpload,
    FaTachometerAlt,
    FaChartBar,
    FaPercentage
} from 'react-icons/fa';

import { 
    FaTicketAlt, 
    FaBell, 
    FaExclamationTriangle, 
    FaCamera 
} from 'react-icons/fa';

export const NavigationsData = [
    {
        text: "Home",
        url: "/"
    },
    {
        text: "About us",
        url: "/about-us"
    },
    {
        text: "Services",
        url: "/services"
    },
    {
        text: "Contact us",
        url: "/contact-us"
    },
];

export const sidebarLinks = [
    { 
        id: 0,
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: FaTachometerAlt,
        hasDropdown: false,
        dropdownItems: []
    },
    { 
        id: 1, 
        title: "Driver Management", 
        url: "/admin/drivers", 
        icon: FaUserTie,
        hasDropdown: true,
        dropdownItems: [
            { id: 101, title: "Driver Approval / Rejection", url: "/admin/drivers/approval", icon: FaCheckCircle },
            { id: 102, title: "Document Verification Review", url: "/admin/drivers/document-verification", icon: FaFileAlt },
            { id: 103, title: "Vehicle Approval / Rejection", url: "/admin/drivers/vehicle-approval", icon: FaCar },
            { id: 104, title: "Driver Suspension / Reinstatement", url: "/admin/drivers/suspension", icon: FaUserSlash },
            { id: 105, title: "Driver Profile View", url: "/admin/drivers/profile", icon: FaUserCheck },
            { id: 106, title: "Driver Rating Overview", url: "/admin/drivers/rating", icon: FaStar },
            { id: 107, title: "Driver Earnings Overview", url: "/admin/drivers/earnings", icon: FaDollarSign },
            { id: 108, title: "Customer Account View", url: "/admin/drivers/customer-account", icon: FaUsers },
            { id: 109, title: "Ban / Unban Customer", url: "/admin/drivers/ban-customer", icon: FaUserMinus }
        ]
    },
    { 
        id: 2, 
        title: "User Management", 
        url: "/admin/users", 
        icon: FaUsers,
        hasDropdown: true,
        dropdownItems: [
            { id: 201, title: "User Role Management", url: "/admin/users/role-management", icon: FaUserCog },
            { id: 202, title: "System Configuration", url: "/admin/users/system-config", icon: FaSlidersH },
            { id: 203, title: "Live Map All Active Rides", url: "/admin/users/live-map", icon: FaMapMarkerAlt }
        ]
    },
    { 
        id: 3, 
        title: "Ride Monitoring", 
        url: "/admin/rides", 
        icon: FaMapMarkedAlt,
        hasDropdown: true,
        dropdownItems: [
            { id: 301, title: "Ride Detail View", url: "/admin/rides/detail-view", icon: FaEye },
            { id: 302, title: "Ride Event Log", url: "/admin/rides/event-log", icon: FaHistory },
            { id: 303, title: "Manual Ride Assignment", url: "/admin/rides/manual-assignment", icon: FaUserPlus },
            { id: 304, title: "Ride Cancellation by Admin", url: "/admin/rides/cancellation", icon: FaTrashAlt },
            { id: 305, title: "Ride History & Search", url: "/admin/rides/history", icon: FaHistory },
            { id: 306, title: "Driver Assignment Attempt Log", url: "/admin/rides/assignment-log", icon: FaFileAlt }
        ]
    },
    { 
        id: 4, 
        title: "Pricing Management", 
        url: "/admin/pricing", 
        icon: FaMoneyBillWave,
        hasDropdown: true,
        dropdownItems: [
            { id: 401, title: "View & Edit Pricing Rules", url: "/admin/pricing/rules", icon: FaMoneyBillWave },
            { id: 402, title: "Surge Pricing Configuration", url: "/admin/pricing/surge", icon: FaChartLine },
            { id: 403, title: "Vehicle Type Classification", url: "/admin/pricing/vehicle-classification", icon: FaCar }
        ]
    },
    { 
        id: 5, 
        title: "Payments & Finance", 
        url: "/admin/payments", 
        icon: FaCreditCard,
        hasDropdown: true,
        dropdownItems: [
            { id: 501, title: "Basic Payment Logs View", url: "/admin/payments/logs", icon: FaFileAlt },
            { id: 502, title: "Wallet Balance Management", url: "/admin/payments/wallet", icon: FaWallet },
            { id: 503, title: "Ledger & Double Entry View", url: "/admin/payments/ledger", icon: FaBook },
            { id: 504, title: "Platform Commission View", url: "/admin/payments/commission", icon: FaHandshake },
            { id: 505, title: "Refund Processing", url: "/admin/payments/refund", icon: FaRedoAlt },
            { id: 506, title: "Profit & Loss Reports", url: "/admin/payments/profit-loss", icon: FaChartPie }
        ]
    },
    // { 
    //     id: 6, 
    //     title: "Promotions Management", 
    //     url: "/admin/promotions", 
    //     icon: FaTag,
    //     hasDropdown: true,
    //     dropdownItems: [
    //         { id: 601, title: "Active Promotions", url: "/admin/promotions/active", icon: FaTag },
    //         { id: 602, title: "Create Campaign", url: "/admin/promotions/create", icon: FaPercentage },
    //         { id: 603, title: "Coupon Management", url: "/admin/promotions/coupons", icon: FaTicketAlt }
    //     ]
    // },
    // { 
    //     id: 7, 
    //     title: "Safety & Compliance", 
    //     url: "/admin/safety", 
    //     icon: FaShieldAlt,
    //     hasDropdown: true,
    //     dropdownItems: [
    //         { id: 701, title: "Emergency Alerts", url: "/admin/safety/alerts", icon: FaBell },
    //         { id: 702, title: "Compliance Reports", url: "/admin/safety/compliance", icon: FaFileAlt },
    //         { id: 703, title: "Incident Management", url: "/admin/safety/incidents", icon: FaExclamationTriangle }
    //     ]
    // },
    // { 
    //     id: 8, 
    //     title: "Analytics & Reporting", 
    //     url: "/admin/analytics", 
    //     icon: FaChartLine,
    //     hasDropdown: true,
    //     dropdownItems: [
    //         { id: 801, title: "Revenue Analytics", url: "/admin/analytics/revenue", icon: FaChartBar },
    //         { id: 802, title: "User Analytics", url: "/admin/analytics/users", icon: FaUsers },
    //         { id: 803, title: "Ride Analytics", url: "/admin/analytics/rides", icon: FaCar },
    //         { id: 804, title: "Custom Reports", url: "/admin/analytics/reports", icon: FaFileAlt }
    //     ]
    // },
    // { 
    //     id: 9, 
    //     title: "Logistics Management", 
    //     url: "/admin/logistics", 
    //     icon: FaTruck,
    //     hasDropdown: true,
    //     dropdownItems: [
    //         { id: 901, title: "Fleet Management", url: "/admin/logistics/fleet", icon: FaTruck },
    //         { id: 902, title: "Route Optimization", url: "/admin/logistics/routes", icon: FaMapMarkerAlt },
    //         { id: 903, title: "Delivery Tracking", url: "/admin/logistics/tracking", icon: FaEye }
    //     ]
    // },
    // { 
    //     id: 10, 
    //     title: "Audit & Security", 
    //     url: "/admin/audit", 
    //     icon: FaLock,
    //     hasDropdown: true,
    //     dropdownItems: [
    //         { id: 1001, title: "Driver Document File View", url: "/admin/audit/driver-documents", icon: FaFileAlt },
    //         { id: 1002, title: "Audit Logs", url: "/admin/audit/logs", icon: FaHistory },
    //         { id: 1003, title: "Security Settings", url: "/admin/audit/security", icon: FaShieldAlt }
    //     ]
    // },
    { 
        id: 11, 
        title: "Media & Verification", 
        url: "/admin/media", 
        icon: FaIdCard,
        hasDropdown: true,
        dropdownItems: [
            { id: 1101, title: "Driver Document File View", url: "/admin/media/driver-documents", icon: FaFileAlt },
            { id: 1102, title: "Vehicle Image View", url: "/admin/media/vehicle-images", icon: FaImage },
            { id: 1103, title: "Verification File Management", url: "/admin/media/verification-files", icon: FaFileUpload }
        ]
    }
];
