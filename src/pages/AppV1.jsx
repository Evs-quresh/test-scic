import React, { useMemo, useState } from "react";
import {
  ChevronRight,
  Users,
  Shield,
  Settings,
  DoorOpen,
  Plus,
  Filter,
  Search,
  Globe,
  Building2,
  UserPlus,
  Lock,
  BadgeCheck,
  Clock,
  Activity,
  Trash2,
  Ban,
  PencilLine,
  LogOut,
  Bell,
  Mail,
  MessageSquare,
  Palette,
  ServerCog,
  LayoutDashboard,
} from "lucide-react";

// NOTE: This single-file mockup focuses on structure, layout and interactions.
// Styling uses TailwindCSS classes. Replace placeholder handlers with real API calls.
// In a real app, split into components and wire to your data layer.

const mockUsers = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha.khan@bankpk.com",
    phone: "+92 300 1234567",
    status: "active",
    roles: ["Bank Admin"],
    dept: "Clearing Ops",
    region: "PK",
    lastLogin: "2025-08-20 10:22",
  },
  {
    id: 2,
    name: "Omar Ali",
    email: "omar.ali@banksa.com",
    phone: "+966 55 123 7890",
    status: "pending",
    roles: ["Manager"],
    dept: "Settlement",
    region: "SA",
    lastLogin: "-",
  },
  {
    id: 3,
    name: "Fatima Noor",
    email: "fatima.noor@bankae.com",
    phone: "+971 50 111 2222",
    status: "locked",
    roles: ["Staff"],
    dept: "Tech Support",
    region: "AE",
    lastLogin: "2025-08-21 14:01",
  },
  {
    id: 4,
    name: "Hassan Raza",
    email: "hassan.raza@bankpk.com",
    phone: "+92 333 5557771",
    status: "disabled",
    roles: ["Staff"],
    dept: "Clearing Ops",
    region: "PK",
    lastLogin: "2025-07-29 08:10",
  },
];

const mockRoles = [
  {
    id: 1,
    name: "Super Admin",
    desc: "Global multi-tenant operator",
    perms: ["user:*", "role:*", "policy:*", "audit:read"],
  },
  {
    id: 2,
    name: "Bank Admin",
    desc: "Tenant admin for a bank",
    perms: [
      "user:read",
      "user:create",
      "user:update",
      "role:assign",
      "audit:read",
    ],
  },
  {
    id: 3,
    name: "Manager",
    desc: "Department manager",
    perms: ["user:create", "user:update"],
  },
  {
    id: 4,
    name: "Staff",
    desc: "Standard limited access",
    perms: ["user:read"],
  },
  {
    id: 5,
    name: "Auditor",
    desc: "Read-only oversight",
    perms: ["audit:read"],
  },
];

const mockGroups = [
  { id: 1, name: "Clearing Ops", type: "Department", members: 18 },
  { id: 2, name: "Settlement", type: "Department", members: 12 },
  { id: 3, name: "Tech Support", type: "Team", members: 7 },
  { id: 4, name: "Region‑PK", type: "Region", members: 24 },
];

const statusBadge = (s) => {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium";
  switch (s) {
    case "active":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          {" "}
          <BadgeCheck size={14} /> Active
        </span>
      );
    case "pending":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          {" "}
          <Clock size={14} /> Pending
        </span>
      );
    case "locked":
      return (
        <span className={`${base} bg-orange-100 text-orange-700`}>
          {" "}
          <Lock size={14} /> Locked
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-200 text-gray-700`}>
          {" "}
          <Ban size={14} /> Disabled
        </span>
      );
  }
};

// --- Components omitted for brevity (but same as provided by user) ---
// Due to space, we will not paste them all again here in this snippet.
// They are written into the file below.

export default function AppV1() {
  const [users] = useState(mockUsers);
  const [editUser, setEditUser] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isParamModalOpen, setIsParamModalOpen] = useState(false);
  const [paramForm, setParamForm] = useState({
    name: "",
    label: "",
    type: "Dropdown",
    category: "System",
    options: [],
    optionInput: "",
    active: true,
  });
  const [parameters, setParameters] = useState([
    {
      id: "374bc786",
      label: "Gender",
      name: "gender",
      type: "Dropdown",
      category: "User",
      defaults: ["Male", "Female", "Other"],
      active: true,
      updated: "8/25/2025, 7:05:56 PM",
    },
    {
      id: "a4dbff9d",
      label: "Is Active?",
      name: "is_active",
      type: "Checkbox",
      category: "System",
      defaults: ["true"],
      active: true,
      updated: "8/25/2025, 7:05:56 PM",
    },
    {
      id: "17d44b57",
      label: "Payment Method",
      name: "payment_method",
      type: "Radio",
      category: "Finance",
      defaults: ["Cash", "Card", "Wallet"],
      active: true,
      updated: "8/25/2025, 7:05:56 PM",
    },
    {
      id: "0d5e1453",
      label: "Tax % Rate",
      name: "tax_rate",
      type: "Number",
      category: "Finance",
      defaults: ["15"],
      active: true,
      updated: "8/25/2025, 7:05:56 PM",
    },
    {
      id: "395bb9a",
      label: "Financial Year Start",
      name: "fy_start",
      type: "Date",
      category: "Finance",
      defaults: ["2025-01-01"],
      active: true,
      updated: "8/25/2025, 7:05:56 PM",
    },
    {
      id: "1ce5ed80",
      label: "Enable Multi-language",
      name: "multi_language",
      type: "Toggle",
      category: "UI",
      defaults: ["false"],
      active: true,
      updated: "8/25/2025, 7:05:56 PM",
    },
  ]);
  const [activeTab, setActiveTab] = useState("users");
  const [activeModule, setActiveModule] = useState("user_mgmt"); // user_mgmt | alerts | config

  const activeCount = useMemo(
    () => users.filter((u) => u.status === "active").length,
    [users]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarCollapsed ? "w-16" : "w-64"
          } shrink-0 transition-all min-h-screen`}
        >
          <div className="flex h-screen flex-col bg-white shadow pb-3">
            <div className="flex items-center justify-between gap-2 border-b px-4 py-4">
              <div className="flex items-center gap-2 overflow-hidden">
                <Building2 className="text-blue-600" />
                {!isSidebarCollapsed && (
                  <span className="text-lg font-semibold">SCIC Admin</span>
                )}
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
              >
                {isSidebarCollapsed ? "›" : "‹"}
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              <button
                onClick={() => {
                  setActiveModule("dashboard");
                  setActiveTab("overview");
                }}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                  activeModule === "dashboard"
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard size={18} />
                {!isSidebarCollapsed && <span>Dashboard</span>}
              </button>
              <button
                onClick={() => {
                  setActiveModule("user_mgmt");
                  setActiveTab("users");
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                  activeModule === "user_mgmt"
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Users size={18} />
                {!isSidebarCollapsed && <span>User Management</span>}
              </button>
              <button
                onClick={() => {
                  setActiveModule("alerts");
                  setActiveTab("overview");
                }}
                className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                  activeModule === "alerts"
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Bell size={18} />
                {!isSidebarCollapsed && <span>Alert & Config</span>}
              </button>
              <button
                onClick={() => {
                  setActiveModule("config");
                  setActiveTab("general");
                }}
                className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                  activeModule === "config"
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Settings size={18} />
                {!isSidebarCollapsed && <span>System Config</span>}
              </button>
              <div className="relative mt-2 border-t p-3">
                <button
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-xs font-semibold">
                    U
                  </span>
                  {!isSidebarCollapsed && <span>Umair Baig</span>}
                </button>
                {isProfileOpen && (
                  <div className="absolute bottom-12 left-2 z-50 w-60 rounded-xl border bg-white p-2 text-sm shadow-xl">
                    <div className="mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-gray-700">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-200 text-xs font-semibold">
                        U
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-xs text-gray-500">
                          umair.baig@evantagesoft.com
                        </div>
                      </div>
                    </div>
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-gray-50">
                      <Settings size={16} /> Settings
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-gray-50">
                      <Activity size={16} /> Help
                    </button>
                    <div className="my-1 border-t" />
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-red-600 hover:bg-red-50">
                      <LogOut size={16} /> Log out
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 px-6 py-6">
          {/* Top bar */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">SCIC Admin</span>
              <ChevronRight className="mx-1 inline h-4 w-4 align-middle text-gray-400" />
              <span>
                {activeModule === "dashboard"
                  ? "Dashboard"
                  : activeModule === "alerts"
                  ? "Alerts & Notifications"
                  : activeModule === "config"
                  ? "System Config"
                  : "User Management"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border px-3 py-1 text-sm">
                EN
              </button>
              <button className="rounded-lg border px-3 py-1 text-sm">
                AR
              </button>
            </div>
          </div>

          {/* Page header */}
          <div className="mb-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {activeModule === "alerts"
                ? activeTab === "templates"
                  ? "Templates"
                  : activeTab === "channels"
                  ? "Channels"
                  : activeTab === "history"
                  ? "History"
                  : "Overview"
                : activeModule === "config"
                ? activeTab === "branding"
                  ? "Branding"
                  : activeTab === "integration"
                  ? "Integration"
                  : activeTab === "parameters"
                  ? "Parameter Setup"
                  : activeTab === "country"
                  ? "Country"
                  : activeTab === "currency"
                  ? "Currency"
                  : activeTab === "security"
                  ? "Security"
                  : "General"
                : activeModule === "dashboard"
                ? "Dashboard"
                : activeTab === "roles"
                ? "Roles"
                : activeTab === "groups"
                ? "Groups"
                : activeTab === "policies"
                ? "Security Policies"
                : activeTab === "audit"
                ? "Audit Log"
                : "Users"}
            </h2>
            <p className="text-sm text-gray-500">
              {activeModule === "alerts"
                ? activeTab === "templates"
                  ? "Manage notification templates for each channel"
                  : activeTab === "channels"
                  ? "Configure Email, SMS and In‑App channels"
                  : activeTab === "history"
                  ? "View recent deliveries and statuses"
                  : "Manage channels, templates, and delivery history"
                : activeModule === "config"
                ? activeTab === "branding"
                  ? "Customize colors and logo"
                  : activeTab === "integration"
                  ? "Manage SMTP, SMS, Webhooks, SSO and more"
                  : activeTab === "parameters"
                  ? "General platform parameters"
                  : activeTab === "country"
                  ? "Manage allowed countries"
                  : activeTab === "currency"
                  ? "Manage currencies and formats"
                  : activeTab === "security"
                  ? "Password and session policies"
                  : "Tenant and platform settings"
                : activeModule === "dashboard"
                ? "Key metrics and quick links"
                : activeTab === "roles"
                ? "Assign permissions and scope per tenant"
                : activeTab === "groups"
                ? "Departments, teams and regions"
                : activeTab === "policies"
                ? "Define password, MFA and session rules"
                : activeTab === "audit"
                ? "System activities and changes"
                : "Manage identities, roles, groups and status"}
            </p>
          </div>

          {/* Tabs row per module */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {activeModule === "user_mgmt" && (
              <>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "users"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => setActiveTab("roles")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "roles"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Role
                </button>
                <button
                  onClick={() => setActiveTab("groups")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "groups"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Group
                </button>
                <button
                  onClick={() => setActiveTab("policies")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "policies"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Security Policies
                </button>
                <button
                  onClick={() => setActiveTab("audit")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "audit"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Audit Log
                </button>
              </>
            )}
            {activeModule === "alerts" && (
              <>
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "overview"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("templates")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "templates"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Templates
                </button>
                <button
                  onClick={() => setActiveTab("channels")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "channels"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Channels
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "history"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  History
                </button>
              </>
            )}
            {activeModule === "config" && (
              <>
                <button
                  onClick={() => setActiveTab("general")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "general"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab("branding")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "branding"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Branding
                </button>
                <button
                  onClick={() => setActiveTab("integration")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "integration"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Integration
                </button>
                <button
                  onClick={() => setActiveTab("parameters")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "parameters"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Parameters
                </button>
                <button
                  onClick={() => setActiveTab("country")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "country"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Country
                </button>
                <button
                  onClick={() => setActiveTab("currency")}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    activeTab === "currency"
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  Currency
                </button>
              </>
            )}
          </div>

          {/* Dashboard */}
          {activeModule === "dashboard" && (
            <div className="space-y-4">
              {/* KPI row */}
              <div className="grid grid-cols-4 gap-4">
                <div className="rounded-xl border bg-white p-4">
                  <div className="text-xs text-gray-500">
                    Total Cheques In Process
                  </div>
                  <div className="mt-1 text-2xl font-semibold">1,482</div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="text-xs text-gray-500">Cleared</div>
                  <div className="mt-1 text-2xl font-semibold text-green-600">
                    1,132
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="text-xs text-gray-500">Returned (All)</div>
                  <div className="mt-1 text-2xl font-semibold text-red-600">
                    142
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="text-xs text-gray-500">Un‑Processed</div>
                  <div className="mt-1 text-2xl font-semibold text-amber-600">
                    208
                  </div>
                </div>
              </div>

              {/* Cheque Status + Weekly Trend */}
              <div className="grid grid-cols-2 gap-4">
                {/* Cheque Status */}
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="font-medium">Cheque Status</div>
                    <div className="text-xs text-gray-500">
                      Depends on dashboard settings
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-green-50 p-3">
                      <div className="text-xs text-gray-500">Cleared</div>
                      <div className="text-xl font-semibold text-green-600">
                        1,132
                      </div>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3">
                      <div className="text-xs text-gray-500">In Process</div>
                      <div className="text-xl font-semibold text-amber-600">
                        208
                      </div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3">
                      <div className="text-xs text-gray-500">Returned</div>
                      <div className="text-xl font-semibold text-red-600">
                        142
                      </div>
                    </div>
                  </div>
                  {/* simple graphic representation */}
                  <div className="mt-4 h-32 w-full rounded-lg bg-gray-50 p-3">
                    <div className="h-full w-full rounded bg-gradient-to-r from-green-200 via-amber-200 to-red-200" />
                  </div>
                </div>
                {/* Weekly Processing Trend */}
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-3 font-medium">
                    Weekly Processing Trend
                  </div>
                  <div className="flex h-40 items-end gap-2">
                    {[12, 18, 22, 15, 26, 30, 21].map((v, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="mx-auto w-8 rounded bg-blue-500"
                          style={{ height: `${v * 3}px` }}
                        />
                        <div className="mt-1 text-center text-[10px] text-gray-500">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Today Cheques progress + Un-Processed Trend */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-3 font-medium">Today Cheques Progress</div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-xl font-semibold">264</div>
                      <div className="text-xs text-gray-500">
                        Amount: PKR 48.2M
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <div className="text-xs text-gray-500">Cleared</div>
                      <div className="text-xl font-semibold text-green-600">
                        213
                      </div>
                      <div className="text-xs text-green-600">81%</div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3">
                      <div className="text-xs text-gray-500">Returned</div>
                      <div className="text-xl font-semibold text-red-600">
                        18
                      </div>
                      <div className="text-xs text-red-600">7%</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-3 font-medium">
                    Un‑Processed Cheques and Trend
                  </div>
                  <div className="h-40 rounded-lg bg-gray-50 p-3">
                    <div className="h-full w-full rounded bg-gradient-to-tr from-amber-100 to-amber-300" />
                  </div>
                </div>
              </div>

              {/* Settlement Status + Top Rated Banks */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 rounded-xl border bg-white p-4">
                  <div className="mb-3 font-medium">Settlement Status</div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span>Currently in Clearing</span>
                        <span className="text-xs text-gray-500">62%</span>
                      </div>
                      <div className="h-2 w-full rounded bg-gray-100">
                        <div className="h-2 w-[62%] rounded bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span>Not Settled</span>
                        <span className="text-xs text-gray-500">38%</span>
                      </div>
                      <div className="h-2 w-full rounded bg-gray-100">
                        <div className="h-2 w-[38%] rounded bg-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 rounded-xl border bg-white p-4">
                  <div className="mb-3 font-medium">Top Rated Banks</div>
                  <div className="space-y-2 text-sm">
                    {[
                      { name: "Bank PK", score: 4.8 },
                      { name: "Bank SA", score: 4.6 },
                      { name: "Bank AE", score: 4.4 },
                      { name: "Bank QA", score: 4.3 },
                    ].map((b) => (
                      <div
                        key={b.name}
                        className="flex items-center justify-between rounded-lg border px-3 py-2"
                      >
                        <span>{b.name}</span>
                        <span className="text-xs text-gray-500">
                          Rating {b.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-1 rounded-xl border bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="font-medium">Support Tickets</div>
                    <select className="rounded border px-2 py-1 text-xs">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                    </select>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      {
                        id: 1,
                        title: "Return reason mismatch",
                        priority: "High",
                      },
                      {
                        id: 2,
                        title: "Cheque image unreadable",
                        priority: "Medium",
                      },
                      { id: 3, title: "Delay in settlement", priority: "High" },
                    ].map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between rounded-lg border px-3 py-2"
                      >
                        <div className="truncate pr-2">{t.title}</div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            t.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Member Banks List View */}
              <div className="overflow-hidden rounded-xl border bg-white">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <div className="font-medium">Member Banks</div>
                  <select className="rounded border px-2 py-1 text-xs">
                    <option>Top 10</option>
                    <option>All</option>
                  </select>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Bank Name</th>
                      <th className="px-4 py-3">No of Customers</th>
                      <th className="px-4 py-3">No of Cheques</th>
                      <th className="px-4 py-3">Cheque Volume</th>
                      <th className="px-4 py-3">Quality Rating</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        logo: "BP",
                        name: "Bank PK",
                        customers: { total: 12450, active: 11890 },
                        cheques: 456120,
                        volume: "PKR 18.4B",
                        rating: 4.8,
                        status: "Active",
                      },
                      {
                        logo: "BS",
                        name: "Bank SA",
                        customers: { total: 10120, active: 9720 },
                        cheques: 392014,
                        volume: "SAR 12.9B",
                        rating: 4.6,
                        status: "Active",
                      },
                      {
                        logo: "BA",
                        name: "Bank AE",
                        customers: { total: 8120, active: 7735 },
                        cheques: 310882,
                        volume: "AED 9.7B",
                        rating: 4.4,
                        status: "Active",
                      },
                      {
                        logo: "BQ",
                        name: "Bank QA",
                        customers: { total: 5220, active: 5050 },
                        cheques: 198441,
                        volume: "QAR 5.1B",
                        rating: 4.3,
                        status: "Watch",
                      },
                    ].map((b) => (
                      <tr key={b.name} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded bg-gray-200 text-xs font-semibold">
                              {b.logo}
                            </span>
                            <span className="font-medium">{b.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-900">
                            {b.customers.total.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Active {b.customers.active.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {b.cheques.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">{b.volume}</td>
                        <td className="px-4 py-3">Rating {b.rating}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              b.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Users Filters & CTA */}
          {activeTab === "users" && (
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  className="w-80 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Search name, email, phone"
                />
              </div>
              <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Locked</option>
                <option>Disabled</option>
              </select>
              <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>All Regions</option>
                <option>PK</option>
                <option>SA</option>
                <option>AE</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                <Filter size={16} /> More Filters
              </button>
              <div className="ml-auto">
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  <UserPlus size={16} /> New User
                </button>
              </div>
            </div>
          )}

          {/* User Mgmt: Security Policies */}
          {activeModule === "user_mgmt" && activeTab === "policies" && (
            <div className="rounded-xl bg-white p-4 shadow">
              <div className="mb-3 text-base font-semibold">
                Security Policies
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl border p-3">
                  <div className="font-medium">Password Policy</div>
                  <div className="mt-2 grid gap-2">
                    <label className="text-xs text-gray-600">
                      Minimum Length
                    </label>
                    <input
                      className="rounded-xl border px-3 py-2"
                      defaultValue={12}
                    />
                    <label className="text-xs text-gray-600">
                      Require Complexity
                    </label>
                    <select className="rounded-xl border px-3 py-2">
                      <option>Upper/Lower/Digit/Special</option>
                    </select>
                    <label className="text-xs text-gray-600">
                      Expiry (days)
                    </label>
                    <input
                      className="rounded-xl border px-3 py-2"
                      defaultValue={90}
                    />
                  </div>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="font-medium">MFA Policy</div>
                  <div className="mt-2 grid gap-2">
                    <label className="text-xs text-gray-600">
                      Required For
                    </label>
                    <select className="rounded-xl border px-3 py-2">
                      <option>Manager and above</option>
                      <option>All users</option>
                    </select>
                    <label className="text-xs text-gray-600">
                      Allowed Methods
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "OTP Email",
                        "OTP SMS",
                        "Authenticator App",
                        "Passkey/WebAuthn",
                      ].map((m) => (
                        <button
                          key={m}
                          className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50"
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="font-medium">Session Policy</div>
                  <div className="mt-2 grid gap-2">
                    <label className="text-xs text-gray-600">
                      Access Token TTL (min)
                    </label>
                    <input
                      className="rounded-xl border px-3 py-2"
                      defaultValue={15}
                    />
                    <label className="text-xs text-gray-600">
                      Idle Timeout (min)
                    </label>
                    <input
                      className="rounded-xl border px-3 py-2"
                      defaultValue={30}
                    />
                    <label className="text-xs text-gray-600">
                      Max Concurrent Sessions
                    </label>
                    <input
                      className="rounded-xl border px-3 py-2"
                      defaultValue={3}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                  Save Policies
                </button>
              </div>
            </div>
          )}

          {/* User Mgmt: Audit Log */}
          {activeModule === "user_mgmt" && activeTab === "audit" && (
            <div className="overflow-hidden rounded-xl bg-white shadow">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Actor</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Target</th>
                    <th className="px-4 py-3">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      time: "2025-08-21 14:05",
                      actor: "Bank Admin (ayesha.khan)",
                      action: "USER_CREATE",
                      target: "user: omar.ali",
                      ip: "10.10.1.15",
                    },
                    {
                      id: 2,
                      time: "2025-08-21 14:06",
                      actor: "Bank Admin (ayesha.khan)",
                      action: "ROLE_ASSIGN",
                      target: "user: omar.ali → Manager",
                      ip: "10.10.1.15",
                    },
                    {
                      id: 3,
                      time: "2025-08-22 09:11",
                      actor: "System",
                      action: "LOGIN_FAIL",
                      target: "user: fatima.noor",
                      ip: "10.10.1.17",
                    },
                  ].map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{r.time}</td>
                      <td className="px-4 py-3">{r.actor}</td>
                      <td className="px-4 py-3">{r.action}</td>
                      <td className="px-4 py-3">{r.target}</td>
                      <td className="px-4 py-3">{r.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Users Table */}
          {activeTab === "users" && (
            <div className="overflow-hidden rounded-xl bg-white shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Roles
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Dept
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Region
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">
                        Last Login
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-gray-700">{u.email}</td>
                        <td className="px-4 py-3 text-gray-700">{u.phone}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {u.roles.join(", ")}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{u.dept}</td>
                        <td className="px-4 py-3 text-gray-700">{u.region}</td>
                        <td className="px-4 py-3">{statusBadge(u.status)}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {u.lastLogin}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditUser(u)}
                              className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                            >
                              <PencilLine size={14} /> Edit
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50">
                              <Activity size={14} /> Sessions
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50">
                              <Ban size={14} /> Disable
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Roles Panel (User Mgmt) */}
          {activeModule === "user_mgmt" && activeTab === "roles" && (
            <div className="rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">Roles</div>
                  <div className="text-xs text-gray-500">
                    Assign permissions and scope per tenant
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                  <Plus size={16} /> New Role
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mockRoles.map((r) => (
                  <div key={r.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{r.name}</div>
                        <div className="text-xs text-gray-500">{r.desc}</div>
                      </div>
                      <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                        Edit
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      Permissions: {r.perms.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groups Panel (User Mgmt) */}
          {activeModule === "user_mgmt" && activeTab === "groups" && (
            <div className="rounded-xl bg-white p-4 shadow">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">Groups</div>
                  <div className="text-xs text-gray-500">
                    Departments, teams and regions
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                  <Plus size={16} /> New Group
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mockGroups.map((g) => (
                  <div key={g.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{g.name}</div>
                        <div className="text-xs text-gray-500">{g.type}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Members: {g.members}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts & Notifications Module */}
          {activeModule === "alerts" && activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={18} />{" "}
                      <span className="font-medium">Email</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Enabled
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Send notifications via SMTP.
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={18} />{" "}
                      <span className="font-medium">SMS</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Enabled
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Send important OTPs and alerts.
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell size={18} />{" "}
                      <span className="font-medium">In‑App</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Enabled
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Show toasts and inbox messages.
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border bg-white">
                <div className="px-4 py-3 font-medium">Recent Deliveries</div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Recipient</th>
                      <th className="px-4 py-3">Channel</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        time: "2025‑08‑22 09:10",
                        to: "ayesha.khan@bankpk.com",
                        ch: "Email",
                        st: "Delivered",
                      },
                      {
                        id: 2,
                        time: "2025‑08‑22 09:12",
                        to: "+92 300 1234567",
                        ch: "SMS",
                        st: "Sent",
                      },
                      {
                        id: 3,
                        time: "2025‑08‑22 09:15",
                        to: "In‑App: Omar Ali",
                        ch: "In‑App",
                        st: "Read",
                      },
                    ].map((r) => (
                      <tr key={r.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{r.time}</td>
                        <td className="px-4 py-3">{r.to}</td>
                        <td className="px-4 py-3">{r.ch}</td>
                        <td className="px-4 py-3">{r.st}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeModule === "alerts" && activeTab === "templates" && (
            <div className="overflow-hidden rounded-xl border bg-white">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="font-medium">Templates</div>
                <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                  <Plus size={16} /> New Template
                </button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3">Subject/Preview</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      name: "User Invite",
                      channel: "Email",
                      preview: "Welcome to SCIC...",
                    },
                    {
                      id: 2,
                      name: "Login OTP",
                      channel: "SMS",
                      preview: "Your OTP is 123456",
                    },
                    {
                      id: 3,
                      name: "Policy Update",
                      channel: "In‑App",
                      preview: "Security policy updated",
                    },
                  ].map((t) => (
                    <tr key={t.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{t.name}</td>
                      <td className="px-4 py-3">{t.channel}</td>
                      <td className="px-4 py-3 text-gray-600">{t.preview}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeModule === "alerts" && activeTab === "channels" && (
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={18} />{" "}
                    <span className="font-medium">Email</span>
                  </div>
                  <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                    Enabled
                  </button>
                </div>
                <div className="text-xs text-gray-500">SMTP configured</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} />{" "}
                    <span className="font-medium">SMS</span>
                  </div>
                  <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                    Enabled
                  </button>
                </div>
                <div className="text-xs text-gray-500">Provider: Twilio</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={18} />{" "}
                    <span className="font-medium">In‑App</span>
                  </div>
                  <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                    Enabled
                  </button>
                </div>
                <div className="text-xs text-gray-500">Feed and toasts</div>
              </div>
            </div>
          )}
          {activeModule === "alerts" && activeTab === "history" && (
            <div className="overflow-hidden rounded-xl border bg-white">
              <div className="px-4 py-3 font-medium">Recent Deliveries</div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Channel</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      time: "2025‑08‑22 09:10",
                      to: "ayesha.khan@bankpk.com",
                      ch: "Email",
                      st: "Delivered",
                    },
                    {
                      id: 2,
                      time: "2025‑08‑22 09:12",
                      to: "+92 300 1234567",
                      ch: "SMS",
                      st: "Sent",
                    },
                    {
                      id: 3,
                      time: "2025‑08‑22 09:15",
                      to: "In‑App: Omar Ali",
                      ch: "In‑App",
                      st: "Read",
                    },
                  ].map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{r.time}</td>
                      <td className="px-4 py-3">{r.to}</td>
                      <td className="px-4 py-3">{r.ch}</td>
                      <td className="px-4 py-3">{r.st}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* System Config Module */}
          {activeModule === "config" && activeTab === "general" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <ServerCog size={18} />
                  <span className="font-medium">Tenant Settings</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-xs text-gray-600">Tenant Name</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      defaultValue="SCIC"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">
                      Default Locale
                    </label>
                    <select className="mt-1 w-full rounded-lg border px-3 py-2">
                      <option>en</option>
                      <option>ar</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="mb-2 text-sm text-gray-500">
                  Pick a tab to configure Branding, Integrations, Parameters or
                  Security.
                </div>
              </div>
            </div>
          )}
          {activeModule === "config" && activeTab === "parameters" && (
            <div className="rounded-xl border bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-medium">Parameters</div>
                <button
                  onClick={() => {
                    setIsParamModalOpen(true);
                    setParamForm({
                      name: "",
                      label: "",
                      type: "Dropdown",
                      category: "System",
                      options: [],
                      optionInput: "",
                      active: true,
                    });
                  }}
                  className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  New Parameter
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Label</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Default</th>
                      <th className="px-4 py-3">Active</th>
                      <th className="px-4 py-3">Updated</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameters.map((p) => (
                      <tr key={p.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{p.label}</div>
                          <div className="text-xs text-gray-500">{p.id}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{p.name}</td>
                        <td className="px-4 py-3 text-gray-700">{p.type}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {p.defaults.map((d, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              p.active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {p.active ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{p.updated}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="rounded-lg border px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeModule === "config" && activeTab === "branding" && (
            <div className="rounded-xl border bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <Palette size={18} />
                <span className="font-medium">Branding</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-600">Primary Color</label>
                  <input
                    type="color"
                    defaultValue="#0ea5e9"
                    className="mt-1 h-10 w-full rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Logo</label>
                  <input
                    type="file"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>
            </div>
          )}
          {activeModule === "config" && activeTab === "integration" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={18} />{" "}
                      <span className="font-medium">SMTP</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Configured
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Send emails via your SMTP server.
                  </div>
                  <div className="mt-3 text-right">
                    <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={18} />{" "}
                      <span className="font-medium">SMS</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Not Configured
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Integrate with Twilio or other SMS providers.
                  </div>
                  <div className="mt-3 text-right">
                    <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell size={18} />{" "}
                      <span className="font-medium">Webhooks</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Not Configured
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Send event callbacks to your endpoints.
                  </div>
                  <div className="mt-3 text-right">
                    <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={18} />{" "}
                      <span className="font-medium">SSO (SAML/OIDC)</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Not Configured
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Enable enterprise login via your IdP.
                  </div>
                  <div className="mt-3 text-right">
                    <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ServerCog size={18} />{" "}
                      <span className="font-medium">Audit Sink</span>
                    </div>
                    <button className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
                      Optional
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Forward audit logs to SIEM or storage.
                  </div>
                  <div className="mt-3 text-right">
                    <button className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
              {/* Example: SMTP detail form section */}
              <div className="rounded-xl border bg-white p-4">
                <div className="mb-2 font-medium">SMTP Configuration</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-xs text-gray-600">Host</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      defaultValue="smtp.example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Port</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      defaultValue={587}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Username</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      defaultValue="noreply@scic.local"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Password</label>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      defaultValue="••••••••"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                    Save Integration
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeModule === "config" && activeTab === "country" && (
            <div className="rounded-xl border bg-white p-4">
              <div className="mb-2 font-medium">Country</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-600">
                    Allowed Countries
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {["Pakistan", "Saudi Arabia", "UAE", "Qatar"].map((c) => (
                      <button
                        key={c}
                        className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600">
                    Default Country
                  </label>
                  <select className="mt-1 w-full rounded-lg border px-3 py-2">
                    <option>Pakistan</option>
                    <option>Saudi Arabia</option>
                    <option>United Arab Emirates</option>
                    <option>Qatar</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                  Save Countries
                </button>
              </div>
            </div>
          )}
          {activeModule === "config" && activeTab === "currency" && (
            <div className="rounded-xl border bg-white p-4">
              <div className="mb-2 font-medium">Currency</div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-600">
                    Supported Currencies
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {["PKR", "SAR", "AED", "QAR"].map((c) => (
                      <button
                        key={c}
                        className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600">
                    Default Currency
                  </label>
                  <select className="mt-1 w-full rounded-lg border px-3 py-2">
                    <option>PKR</option>
                    <option>SAR</option>
                    <option>AED</option>
                    <option>QAR</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Format</label>
                  <select className="mt-1 w-full rounded-lg border px-3 py-2">
                    <option>1,234,567.89</option>
                    <option>1.234.567,89</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                  Save Currencies
                </button>
              </div>
            </div>
          )}
          {activeModule === "config" && activeTab === "security" && (
            <div className="rounded-xl border bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <Shield size={18} />
                <span className="font-medium">Security</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-600">
                    Password Min Length
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    defaultValue={12}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">
                    Session Timeout (min)
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    defaultValue={30}
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* Footer counts */}
          {activeModule === "user_mgmt" && activeTab === "users" && (
            <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
              <Users size={18} />
              <span>{users.length} total</span>
              <BadgeCheck size={18} className="ml-3 text-green-600" />
              <span>{activeCount} active</span>
            </div>
          )}
        </div>
      </div>

      {/* Right-side Edit Drawer */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setEditUser(null)}
          />
          <div className="relative h-full w-[50vw] min-w-[560px] max-w-[820px] translate-x-0 bg-white p-5 shadow-2xl transition-transform duration-300">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <button
                onClick={() => setEditUser(null)}
                className="rounded-xl border px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
            <div className="grid gap-3">
              <div>
                <label className="text-xs text-gray-600">Full Name</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  defaultValue={editUser.name}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Email</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  defaultValue={editUser.email}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Phone</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  defaultValue={editUser.phone}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Status</label>
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    defaultValue={editUser.status}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="locked">Locked</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Region</label>
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    defaultValue={editUser.region}
                  >
                    <option value="PK">Pakistan</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="AE">UAE</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600">Departments</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {["Clearing Ops", "Settlement", "Tech Support"].map((d) => (
                    <button
                      key={d}
                      className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
                <Ban size={16} /> Disable
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setEditUser(null)}
                >
                  Cancel
                </button>
                <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parameter Create Modal */}
      {isParamModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Parameter</h3>
              <button
                onClick={() => setIsParamModalOpen(false)}
                className="rounded-xl border px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Name (key)</label>
                <input
                  value={paramForm.name}
                  onChange={(e) =>
                    setParamForm({ ...paramForm, name: e.target.value })
                  }
                  placeholder="e.g., max_login_attempts"
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Label</label>
                <input
                  value={paramForm.label}
                  onChange={(e) =>
                    setParamForm({ ...paramForm, label: e.target.value })
                  }
                  placeholder="Display label"
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Type</label>
                <select
                  value={paramForm.type}
                  onChange={(e) =>
                    setParamForm({ ...paramForm, type: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                >
                  <option>Dropdown</option>
                  <option>Text</option>
                  <option>Number</option>
                  <option>Boolean</option>
                  <option>Date</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Category</label>
                <select
                  value={paramForm.category}
                  onChange={(e) =>
                    setParamForm({ ...paramForm, category: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                >
                  <option>System</option>
                  <option>Security</option>
                  <option>Branding</option>
                  <option>Integration</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-600">Options</label>
                <div className="mt-1 flex gap-2">
                  <input
                    value={paramForm.optionInput}
                    onChange={(e) =>
                      setParamForm({
                        ...paramForm,
                        optionInput: e.target.value,
                      })
                    }
                    placeholder="Add option and press +"
                    className="flex-1 rounded-xl border px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => {
                      if (paramForm.optionInput.trim()) {
                        setParamForm({
                          ...paramForm,
                          options: [
                            ...paramForm.options,
                            paramForm.optionInput.trim(),
                          ],
                          optionInput: "",
                        });
                      }
                    }}
                    className="rounded-xl border px-3 py-2 text-sm"
                  >
                    +
                  </button>
                </div>
                {paramForm.options.length === 0 ? (
                  <div className="mt-2 text-xs text-gray-500">
                    No options added yet.
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {paramForm.options.map((opt, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                      >
                        {opt}
                        <button
                          onClick={() =>
                            setParamForm({
                              ...paramForm,
                              options: paramForm.options.filter(
                                (_, i) => i !== idx
                              ),
                            })
                          }
                          className="text-gray-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={paramForm.active}
                    onChange={(e) =>
                      setParamForm({ ...paramForm, active: e.target.checked })
                    }
                  />{" "}
                  Active
                </label>
              </div>
              <div className="col-span-2">
                <div className="mb-1 text-xs text-gray-600">Preview</div>
                <div className="rounded-xl border p-3">
                  <div className="text-xs text-gray-600">
                    {paramForm.label || "Field Label"}
                  </div>
                  {paramForm.type === "Dropdown" && (
                    <select className="mt-1 w-full rounded border px-3 py-2 text-sm">
                      <option></option>
                    </select>
                  )}
                  {paramForm.type === "Text" && (
                    <input className="mt-1 w-full rounded border px-3 py-2 text-sm" />
                  )}
                  {paramForm.type === "Number" && (
                    <input
                      type="number"
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                    />
                  )}
                  {paramForm.type === "Boolean" && (
                    <label className="mt-1 inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" /> Enabled
                    </label>
                  )}
                  {paramForm.type === "Date" && (
                    <input
                      type="date"
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsParamModalOpen(false)}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
