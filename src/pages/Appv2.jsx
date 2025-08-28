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
  Eye,
  EyeOff,
  Mail,
  Phone,
  Key,
  ArrowRight,
  CheckCircle,
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

function LoginPage({ onLogin }) {
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleIdentifierChange = (value) => {
    setIdentifier(value);
    setErrors((prev) => ({ ...prev, identifier: "" }));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setErrors((prev) => ({ ...prev, otp: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!identifier) {
      newErrors.identifier = `${
        loginMethod === "email" ? "Email" : "Phone"
      } is required`;
    } else if (loginMethod === "email" && !validateEmail(identifier)) {
      newErrors.identifier = "Please enter a valid email address";
    } else if (loginMethod === "phone" && !validatePhone(identifier)) {
      newErrors.identifier = "Please enter a valid phone number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (otpSent && !otp) {
      newErrors.otp = "OTP is required";
    } else if (otpSent && otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password flow
    console.log("Forgot password clicked");
  };

  const handleRegister = () => {
    // TODO: Implement registration flow
    console.log("Register clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            SCIC Admin Portal
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              otpSent ? handleLogin() : handleSendOtp();
            }}
          >
            {/* Login Method Toggle */}
            <div className="flex rounded-xl border mb-6 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === "email"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Mail size={16} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === "phone"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Phone size={16} />
                Phone
              </button>
            </div>

            {/* Email/Phone Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginMethod === "email" ? "Email Address" : "Phone Number"}
              </label>
              <div className="relative">
                {loginMethod === "email" ? (
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                ) : (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                )}
                <input
                  type={loginMethod === "email" ? "email" : "tel"}
                  value={identifier}
                  onChange={(e) => handleIdentifierChange(e.target.value)}
                  placeholder={
                    loginMethod === "email"
                      ? "Enter your email"
                      : "Enter your phone number"
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors ${
                    errors.identifier ? "border-red-300" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.identifier && (
                <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* OTP Section */}
            {otpSent && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Verification
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      handleOtpChange(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="Enter 6-digit OTP"
                    className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors ${
                      errors.otp ? "border-red-300" : "border-gray-300"
                    }`}
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Resend
                  </button>
                </div>
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  OTP sent to{" "}
                  {loginMethod === "email" ? identifier : `+${identifier}`}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {otpSent ? "Verifying..." : "Sending OTP..."}
                </>
              ) : (
                <>
                  {otpSent ? "Login" : "Send OTP"}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Forgot Password & Register Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={handleRegister}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 SCIC Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function Toolbar({ onCreate, filters, setFilters }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            className="w-60 rounded-xl border pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="Search name, email, phone"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          />
        </div>
        <select
          className="rounded-xl border px-3 py-2 text-sm"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="locked">Locked</option>
          <option value="disabled">Disabled</option>
        </select>
        <select
          className="rounded-xl border px-3 py-2 text-sm"
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        >
          <option value="">All Regions</option>
          <option value="PK">Pakistan</option>
          <option value="SA">Saudi Arabia</option>
          <option value="AE">UAE</option>
        </select>
        <button className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
          <Filter className="h-4 w-4" /> More Filters
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
        >
          <UserPlus className="h-4 w-4" /> New User
        </button>
      </div>
    </div>
  );
}

function UsersTable({ rows, onEdit }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Roles</th>
            <th className="px-4 py-3">Dept</th>
            <th className="px-4 py-3">Region</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Login</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{u.name}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3">{u.phone}</td>
              <td className="px-4 py-3">{u.roles.join(", ")}</td>
              <td className="px-4 py-3">{u.dept}</td>
              <td className="px-4 py-3">{u.region}</td>
              <td className="px-4 py-3">{statusBadge(u.status)}</td>
              <td className="px-4 py-3">{u.lastLogin}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="rounded-xl border px-3 py-1.5 text-xs hover:bg-gray-50 inline-flex items-center gap-1"
                  >
                    <PencilLine className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button className="rounded-xl border px-3 py-1.5 text-xs hover:bg-gray-50 inline-flex items-center gap-1">
                    <DoorOpen className="h-3.5 w-3.5" /> Sessions
                  </button>
                  <button className="rounded-xl border px-3 py-1.5 text-xs hover:bg-gray-50 inline-flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Disable
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CreateUserModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dept: "",
    region: "",
    roles: [],
  });
  if (!open) return null;
  const toggleRole = (r) =>
    setForm((f) => ({
      ...f,
      roles: f.roles.includes(r)
        ? f.roles.filter((x) => x !== r)
        : [...f.roles, r],
    }));
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create User</h3>
          <button
            onClick={onClose}
            className="rounded-xl border px-2 py-1 text-xs"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Full Name</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Phone</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Department</label>
            <select
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.dept}
              onChange={(e) => setForm({ ...form, dept: e.target.value })}
            >
              <option value="">Select</option>
              <option>Clearing Ops</option>
              <option>Settlement</option>
              <option>Tech Support</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Region</label>
            <select
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
            >
              <option value="">Select</option>
              <option value="PK">Pakistan</option>
              <option value="SA">Saudi Arabia</option>
              <option value="AE">UAE</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Roles</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {["Super Admin", "Bank Admin", "Manager", "Staff", "Auditor"].map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRole(r)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      form.roles.includes(r)
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {r}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
          >
            Create & Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

function RolesPanel({ roles, onNew, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-base font-semibold">Roles</div>
          <div className="text-xs text-gray-500">
            Assign permissions and scope per tenant
          </div>
        </div>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" /> New Role
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <div key={r.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-gray-500">{r.desc}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(r)}
                  className="rounded-xl border px-3 py-1.5 text-xs hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(r.id)}
                  className="rounded-xl border px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Permissions: {r.perms.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupsPanel({ groups, onNew, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-base font-semibold">Groups</div>
          <div className="text-xs text-gray-500">
            Departments, teams, and regions
          </div>
        </div>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" /> New Group
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {groups.map((g) => (
          <div key={g.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{g.name}</div>
                <div className="text-xs text-gray-500">Type: {g.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500">
                  Members: {g.members?.length ?? g.members}
                </div>
                <button
                  onClick={() => onEdit(g)}
                  className="rounded-xl border px-3 py-1.5 text-xs hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(g.id)}
                  className="rounded-xl border px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PoliciesPanel() {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="mb-3 text-base font-semibold">Security Policies</div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="rounded-xl border p-3">
          <div className="font-medium">Password Policy</div>
          <div className="mt-2 grid gap-2">
            <label className="text-xs text-gray-600">Minimum Length</label>
            <input className="rounded-xl border px-3 py-2" defaultValue={12} />
            <label className="text-xs text-gray-600">Require Complexity</label>
            <select className="rounded-xl border px-3 py-2">
              <option>Upper/Lower/Digit/Special</option>
            </select>
            <label className="text-xs text-gray-600">Expiry (days)</label>
            <input className="rounded-xl border px-3 py-2" defaultValue={90} />
          </div>
        </div>
        <div className="rounded-xl border p-3">
          <div className="font-medium">MFA Policy</div>
          <div className="mt-2 grid gap-2">
            <label className="text-xs text-gray-600">Required For</label>
            <select className="rounded-xl border px-3 py-2">
              <option>Manager and above</option>
              <option>All users</option>
            </select>
            <label className="text-xs text-gray-600">Allowed Methods</label>
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
            <input className="rounded-xl border px-3 py-2" defaultValue={15} />
            <label className="text-xs text-gray-600">Idle Timeout (min)</label>
            <input className="rounded-xl border px-3 py-2" defaultValue={30} />
            <label className="text-xs text-gray-600">
              Max Concurrent Sessions
            </label>
            <input className="rounded-xl border px-3 py-2" defaultValue={3} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
          Save Policies
        </button>
      </div>
    </div>
  );
}

function AuditPanel() {
  const rows = [
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
  ];
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
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
          {rows.map((r) => (
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
  );
}

function TopNav({ activeModule, activeTab }) {
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: "SCIC Admin",
        icon: <Building2 className="h-5 w-5" />,
        clickable: false,
      },
    ];

    // Add module breadcrumb
    switch (activeModule) {
      case "dashboard":
        breadcrumbs.push({
          label: "Dashboard",
          icon: <Activity className="h-4 w-4" />,
          clickable: false,
        });
        break;
      case "users":
        breadcrumbs.push({
          label: "User Management",
          icon: <Users className="h-4 w-4" />,
          clickable: false,
        });
        // Add tab breadcrumb for User Management
        if (activeTab && activeTab !== "users") {
          switch (activeTab) {
            case "roles":
              breadcrumbs.push({
                label: "Roles",
                icon: <Shield className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "groups":
              breadcrumbs.push({
                label: "Groups",
                icon: <Settings className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "policies":
              breadcrumbs.push({
                label: "Security Policies",
                icon: <Lock className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "audit":
              breadcrumbs.push({
                label: "Audit Logs",
                icon: <Activity className="h-4 w-4" />,
                clickable: true,
              });
              break;
            default:
              break;
          }
        }
        break;
      case "alerts":
        breadcrumbs.push({
          label: "Alert & Config",
          icon: <Shield className="h-4 w-4" />,
          clickable: false,
        });
        // Add tab breadcrumb for Alert & Config
        if (activeTab && activeTab !== "overview") {
          switch (activeTab) {
            case "templates":
              breadcrumbs.push({
                label: "Templates",
                icon: <Shield className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "channels":
              breadcrumbs.push({
                label: "Channels",
                icon: <Globe className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "history":
              breadcrumbs.push({
                label: "History",
                icon: <Activity className="h-4 w-4" />,
                clickable: true,
              });
              break;
            default:
              break;
          }
        }
        break;
      case "config":
        breadcrumbs.push({
          label: "System Config",
          icon: <Settings className="h-4 w-4" />,
          clickable: false,
        });
        // Add tab breadcrumb for System Config
        if (activeTab && activeTab !== "general") {
          switch (activeTab) {
            case "branding":
              breadcrumbs.push({
                label: "Branding",
                icon: <Building2 className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "integration":
              breadcrumbs.push({
                label: "Integration",
                icon: <Globe className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "parameters":
              breadcrumbs.push({
                label: "Parameters",
                icon: <Settings className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "country":
              breadcrumbs.push({
                label: "Country",
                icon: <Globe className="h-4 w-4" />,
                clickable: true,
              });
              break;
            case "currency":
              breadcrumbs.push({
                label: "Currency",
                icon: <Settings className="h-4 w-4" />,
                clickable: true,
              });
              break;
            default:
              break;
          }
        }
        break;
      default:
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
            <div
              className={`flex items-center gap-2 ${
                crumb.clickable ? "cursor-pointer hover:text-gray-700" : ""
              }`}
            >
              {crumb.icon}
              <span
                className={
                  index === 0
                    ? "text-lg font-semibold"
                    : "text-sm text-gray-600"
                }
              >
                {crumb.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50">
          EN
        </button>
        <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50">
          AR
        </button>
        <div className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm">
          <Globe className="h-4 w-4" />
          <span>Multi‑Tenant</span>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </header>
  );
}

function Sidebar({
  activeModule,
  setActiveModule,
  isCollapsed,
  setIsCollapsed,
  setActiveTab,
}) {
  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      key: "users",
      label: "User Management",
      icon: <Users className="h-4 w-4" />,
    },
    {
      key: "alerts",
      label: "Alert & Config",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      key: "config",
      label: "System Config",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  const handleModuleClick = (moduleKey) => {
    setActiveModule(moduleKey);
    // Reset to default tab for each module
    switch (moduleKey) {
      case "dashboard":
        // Dashboard doesn't have tabs, so no need to set activeTab
        break;
      case "users":
        setActiveTab("users");
        break;
      case "alerts":
        setActiveTab("overview");
        break;
      case "config":
        setActiveTab("general");
        break;
      default:
        break;
    }
  };

  return (
    <aside
      className={`h-[calc(100vh-56px)] border-r bg-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 w-full rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-center"
        >
          {isCollapsed ? <ChevronRight size={16} /> : "Toggle Sidebar"}
        </button>

        <nav className="space-y-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => handleModuleClick(it.key)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                activeModule === it.key ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {it.icon}
              {!isCollapsed && <span>{it.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function CreateParameterModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    label: "",
    type: "text",
    category: "",
    options: [],
    active: true,
  });
  const [optionInput, setOptionInput] = useState("");
  if (!open) return null;

  const addOption = () => {
    if (optionInput.trim() && !form.options.includes(optionInput.trim())) {
      setForm((f) => ({ ...f, options: [...f.options, optionInput.trim()] }));
      setOptionInput("");
    }
  };
  const removeOption = (opt) =>
    setForm((f) => ({ ...f, options: f.options.filter((o) => o !== opt) }));

  const renderPreview = () => {
    switch (form.type) {
      case "checkbox":
        return <input type="checkbox" checked={form.active} readOnly />;
      case "radio":
        return (
          <div className="flex gap-2">
            {form.options.map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input type="radio" name="param-preview" readOnly /> {opt}
              </label>
            ))}
          </div>
        );
      case "select":
        return (
          <select className="rounded-lg border px-3 py-2 text-sm">
            {form.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            className="rounded-lg border px-3 py-2 text-sm"
            defaultValue={0}
            readOnly
          />
        );
      case "date":
        return (
          <input
            type="date"
            className="rounded-lg border px-3 py-2 text-sm"
            readOnly
          />
        );
      case "toggle":
        return (
          <button
            className={`rounded-full px-3 py-1 text-xs ${
              form.active ? "bg-gray-900 text-white" : "border"
            }`}
          >
            Toggle
          </button>
        );
      default:
        return (
          <input
            type="text"
            className="rounded-lg border px-3 py-2 text-sm"
            defaultValue="Text Value"
            readOnly
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">New Parameter</h3>
          <button
            onClick={onClose}
            className="rounded-xl border px-2 py-1 text-xs"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Name (Key)</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Label</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Type</label>
            <select
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value, options: [] })
              }
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Group</option>
              <option value="select">Select Dropdown</option>
              <option value="date">Date</option>
              <option value="toggle">Toggle</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Category</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          {(form.type === "radio" || form.type === "select") && (
            <div className="col-span-2">
              <label className="text-xs text-gray-600">Options</label>
              <div className="mt-1 flex gap-2">
                <input
                  className="flex-1 rounded-xl border px-3 py-2 text-sm"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  placeholder="Add option"
                />
                <button
                  onClick={addOption}
                  className="rounded-xl bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {form.options.map((opt) => (
                  <span
                    key={opt}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs"
                  >
                    {opt}
                    <button
                      onClick={() => removeOption(opt)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          {(form.type === "checkbox" || form.type === "toggle") && (
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <label className="text-sm text-gray-900">Active by default</label>
            </div>
          )}
          <div className="col-span-2">
            <label className="text-xs text-gray-600">Preview</label>
            <div className="mt-1 rounded-xl border bg-gray-50 p-3">
              {renderPreview()}
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
          >
            Save Parameter
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppV2() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState({ q: "", status: "", region: "" });
  const [openCreate, setOpenCreate] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [openCreateRole, setOpenCreateRole] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      desc: "Global multi‑tenant operator",
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
      desc: "Read‑only oversight",
      perms: ["audit:read"],
    },
  ]);
  const [groups, setGroups] = useState([
    { id: 1, name: "Clearing Ops", type: "Department", members: [1, 2, 3] },
    { id: 2, name: "Settlement", type: "Department", members: [2, 4] },
    { id: 3, name: "Tech Support", type: "Team", members: [3] },
    { id: 4, name: "Region‑PK", type: "Region", members: [1, 2, 3, 4] },
  ]);
  const [editingRole, setEditingRole] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
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
  const [selectedIntegration, setSelectedIntegration] = useState("smtp");

  const filtered = useMemo(() => {
    return mockUsers.filter((u) => {
      const q = filters.q.toLowerCase();
      const matchesQ =
        !q ||
        [u.name, u.email, u.phone].some((v) =>
          (v || "").toLowerCase().includes(q)
        );
      const matchesStatus = !filters.status || u.status === filters.status;
      const matchesRegion = !filters.region || u.region === filters.region;
      return matchesQ && matchesStatus && matchesRegion;
    });
  }, [filters]);

  // ... existing code ...

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav activeModule={activeModule} activeTab={activeTab} />
      <div className="mx-auto max-w-[1400px]">
        <div className="flex">
          <Sidebar
            activeModule={activeModule}
            setActiveModule={setActiveModule}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
            setActiveTab={setActiveTab}
          />
          <main className="h-[calc(100vh-56px)] flex-1 overflow-y-auto p-6">
            {/* Dashboard Module */}
            {activeModule === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
                  <p className="text-gray-600">
                    Overview of system performance and key metrics
                  </p>
                </div>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cheque Status Widget */}
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">Cheque Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total in Process
                        </span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cleared</span>
                        <span className="font-semibold text-green-600">
                          856
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Returned</span>
                        <span className="font-semibold text-red-600">78</span>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Processing Trend */}
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">
                      Weekly Processing Trend
                    </h3>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-around p-4">
                      {[20, 45, 30, 60, 40, 55, 35].map((height, i) => (
                        <div
                          key={i}
                          className="bg-gray-900 rounded-t"
                          style={{ height: `${height}%`, width: "8px" }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Today Cheques Progress */}
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">
                      Today Cheques Progress
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>In Process</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cleared</span>
                          <span>35%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settlement Status */}
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">Settlement Status</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>In Clearing</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-600 h-2 rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Settled</span>
                          <span>35%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Rated Banks */}
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">Top Rated Banks</h3>
                    <div className="space-y-2">
                      {["HBL Bank", "UBL Bank", "MCB Bank", "Allied Bank"].map(
                        (bank, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm">{bank}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              4.{9 - i}.{i + 1}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Support Tickets */}
                  <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">Support Tickets</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Open</span>
                        <span className="text-red-600 font-semibold">12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>In Progress</span>
                        <span className="text-yellow-600 font-semibold">8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Resolved</span>
                        <span className="text-green-600 font-semibold">45</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Banks List */}
                <div className="bg-white rounded-xl border">
                  <div className="p-6 border-b">
                    <h3 className="font-semibold">Member Banks</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bank Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No of Customers
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No of Cheques
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cheque Volume
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quality Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            name: "HBL Bank",
                            customers: "1,234",
                            cheques: "5,678",
                            volume: "$12.5M",
                            rating: "4.9",
                            status: "Active",
                          },
                          {
                            name: "UBL Bank",
                            customers: "987",
                            cheques: "4,321",
                            volume: "$8.9M",
                            rating: "4.7",
                            status: "Active",
                          },
                          {
                            name: "MCB Bank",
                            customers: "756",
                            cheques: "3,456",
                            volume: "$6.7M",
                            rating: "4.5",
                            status: "Active",
                          },
                          {
                            name: "Allied Bank",
                            customers: "543",
                            cheques: "2,789",
                            volume: "$4.2M",
                            rating: "4.3",
                            status: "Active",
                          },
                        ].map((bank, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {bank.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {bank.customers}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {bank.cheques}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {bank.volume}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {bank.rating}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                {bank.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* User Management Module */}
            {activeModule === "users" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-semibold">User Management</div>
                    <div className="text-sm text-gray-500">
                      Manage identities, roles, groups and status
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b">
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "users"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Users
                  </button>
                  <button
                    onClick={() => setActiveTab("roles")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "roles"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Roles
                  </button>
                  <button
                    onClick={() => setActiveTab("groups")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "groups"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Groups
                  </button>
                  <button
                    onClick={() => setActiveTab("policies")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "policies"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Security Policies
                  </button>
                  <button
                    onClick={() => setActiveTab("audit")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "audit"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Audit Logs
                  </button>
                </div>

                {/* Users Tab */}
                {activeTab === "users" && (
                  <div className="space-y-4">
                    <Toolbar
                      onCreate={() => setOpenCreate(true)}
                      filters={filters}
                      setFilters={setFilters}
                    />
                    <UsersTable
                      rows={filtered}
                      onEdit={(u) => setEditUser(u)}
                    />
                  </div>
                )}

                {/* Roles Tab */}
                {activeTab === "roles" && (
                  <RolesPanel
                    roles={roles}
                    onNew={() => {
                      setEditingRole(null);
                      setOpenCreateRole(true);
                    }}
                    onEdit={(r) => {
                      setEditingRole(r);
                      setOpenCreateRole(true);
                    }}
                    onDelete={(id) =>
                      setRoles((rs) => rs.filter((r) => r.id !== id))
                    }
                  />
                )}

                {/* Groups Tab */}
                {activeTab === "groups" && (
                  <GroupsPanel
                    groups={groups}
                    onNew={() => {
                      setEditingGroup(null);
                      setOpenCreateGroup(true);
                    }}
                    onEdit={(g) => {
                      setEditingGroup(g);
                      setOpenCreateGroup(true);
                    }}
                    onDelete={(id) =>
                      setGroups((gs) => gs.filter((g) => g.id !== id))
                    }
                  />
                )}

                {/* Security Policies Tab */}
                {activeTab === "policies" && <PoliciesPanel />}

                {/* Audit Logs Tab */}
                {activeTab === "audit" && <AuditPanel />}
              </div>
            )}

            {/* Alert & Config Module */}
            {activeModule === "alerts" && (
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">
                    Alert & Config
                  </h1>
                  <p className="text-gray-600">
                    Manage alerts and notifications
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "overview"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("templates")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "templates"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Templates
                  </button>
                  <button
                    onClick={() => setActiveTab("channels")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "channels"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Channels
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "history"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    History
                  </button>
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Alert Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Alerts
                            </p>
                            <p className="text-2xl font-semibold">1,234</p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Activity className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Active Alerts
                            </p>
                            <p className="text-2xl font-semibold text-green-600">
                              89
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <BadgeCheck className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Failed Alerts
                            </p>
                            <p className="text-2xl font-semibold text-red-600">
                              12
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Ban className="h-6 w-6 text-red-600" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Templates</p>
                            <p className="text-2xl font-semibold">24</p>
                          </div>
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Shield className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Alerts */}
                    <div className="bg-white rounded-xl border">
                      <div className="p-6 border-b">
                        <h3 className="font-semibold">Recent Alerts</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {[
                            {
                              type: "success",
                              message: "Cheque cleared successfully",
                              time: "2 minutes ago",
                              user: "System",
                            },
                            {
                              type: "warning",
                              message: "High volume of pending cheques",
                              time: "15 minutes ago",
                              user: "Alert System",
                            },
                            {
                              type: "error",
                              message: "Settlement failed for batch #1234",
                              time: "1 hour ago",
                              user: "System",
                            },
                            {
                              type: "info",
                              message: "New user registered: omar.ali",
                              time: "2 hours ago",
                              user: "User Management",
                            },
                          ].map((alert, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-lg border"
                            >
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  alert.type === "success"
                                    ? "bg-green-500"
                                    : alert.type === "warning"
                                    ? "bg-yellow-500"
                                    : alert.type === "error"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {alert.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {alert.time} • {alert.user}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Templates Tab */}
                {activeTab === "templates" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Alert Templates</h3>
                      <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                        <Plus className="h-4 w-4" />
                        New Template
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Cheque Cleared",
                          type: "Success",
                          channels: ["Email", "SMS"],
                          active: true,
                        },
                        {
                          name: "Settlement Failed",
                          type: "Error",
                          channels: ["Email", "SMS", "Webhook"],
                          active: true,
                        },
                        {
                          name: "User Login",
                          type: "Info",
                          channels: ["Email"],
                          active: false,
                        },
                        {
                          name: "High Volume Alert",
                          type: "Warning",
                          channels: ["Email", "SMS"],
                          active: true,
                        },
                        {
                          name: "System Maintenance",
                          type: "Info",
                          channels: ["Email", "SMS"],
                          active: true,
                        },
                        {
                          name: "Security Alert",
                          type: "Error",
                          channels: ["Email", "SMS", "Webhook"],
                          active: true,
                        },
                      ].map((template, i) => (
                        <div key={i} className="bg-white rounded-xl border p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{template.name}</h4>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                template.active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {template.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Type:
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  template.type === "Success"
                                    ? "bg-green-100 text-green-700"
                                    : template.type === "Error"
                                    ? "bg-red-100 text-red-700"
                                    : template.type === "Warning"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {template.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Channels:
                              </span>
                              <div className="flex gap-1">
                                {template.channels.map((channel, j) => (
                                  <span
                                    key={j}
                                    className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                                  >
                                    {channel}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button className="flex-1 rounded-lg border px-3 py-2 text-xs hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="flex-1 rounded-lg border px-3 py-2 text-xs hover:bg-gray-50">
                              Duplicate
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Channels Tab */}
                {activeTab === "channels" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Notification Channels</h3>
                      <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                        <Plus className="h-4 w-4" />
                        Add Channel
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Email",
                          type: "SMTP",
                          status: "Active",
                          config: "smtp.bank.com:587",
                        },
                        {
                          name: "SMS",
                          type: "Twilio",
                          status: "Active",
                          config: "Twilio Account",
                        },
                        {
                          name: "Webhook",
                          type: "HTTP",
                          status: "Active",
                          config: "https://api.bank.com/webhook",
                        },
                        {
                          name: "Slack",
                          type: "Webhook",
                          status: "Inactive",
                          config: "Not configured",
                        },
                      ].map((channel, i) => (
                        <div key={i} className="bg-white rounded-xl border p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{channel.name}</h4>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                channel.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {channel.status}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Type:
                              </span>
                              <span className="text-sm">{channel.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Config:
                              </span>
                              <span className="text-sm text-gray-600">
                                {channel.config}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button className="flex-1 rounded-lg border px-3 py-2 text-xs hover:bg-gray-50">
                              Configure
                            </button>
                            <button className="flex-1 rounded-lg border px-3 py-2 text-xs hover:bg-gray-50">
                              Test
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === "history" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Alert History</h3>
                      <div className="flex gap-2">
                        <select className="rounded-lg border px-3 py-2 text-sm">
                          <option>All Types</option>
                          <option>Success</option>
                          <option>Error</option>
                          <option>Warning</option>
                          <option>Info</option>
                        </select>
                        <input
                          type="date"
                          className="rounded-lg border px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Template</th>
                            <th className="px-4 py-3">Channel</th>
                            <th className="px-4 py-3">Recipient</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              time: "2025-01-21 14:30",
                              type: "Success",
                              template: "Cheque Cleared",
                              channel: "Email",
                              recipient: "user@bank.com",
                              status: "Delivered",
                            },
                            {
                              time: "2025-01-21 14:25",
                              type: "Error",
                              template: "Settlement Failed",
                              channel: "SMS",
                              recipient: "+1234567890",
                              status: "Failed",
                            },
                            {
                              time: "2025-01-21 14:20",
                              type: "Info",
                              template: "User Login",
                              channel: "Email",
                              recipient: "admin@bank.com",
                              status: "Delivered",
                            },
                            {
                              time: "2025-01-21 14:15",
                              type: "Warning",
                              template: "High Volume Alert",
                              channel: "Webhook",
                              recipient: "api.bank.com",
                              status: "Delivered",
                            },
                          ].map((alert, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-3">{alert.time}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    alert.type === "Success"
                                      ? "bg-green-100 text-green-700"
                                      : alert.type === "Error"
                                      ? "bg-red-100 text-red-700"
                                      : alert.type === "Warning"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {alert.type}
                                </span>
                              </td>
                              <td className="px-4 py-3">{alert.template}</td>
                              <td className="px-4 py-3">{alert.channel}</td>
                              <td className="px-4 py-3">{alert.recipient}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    alert.status === "Delivered"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {alert.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* System Config Module */}
            {activeModule === "config" && (
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">System Config</h1>
                  <p className="text-gray-600">
                    Configure system settings and parameters
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b">
                  <button
                    onClick={() => setActiveTab("general")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "general"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab("branding")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "branding"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Branding
                  </button>
                  <button
                    onClick={() => setActiveTab("integration")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "integration"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Integration
                  </button>
                  <button
                    onClick={() => setActiveTab("parameters")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "parameters"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Parameters
                  </button>
                  <button
                    onClick={() => setActiveTab("country")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "country"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Country
                  </button>
                  <button
                    onClick={() => setActiveTab("currency")}
                    className={`px-4 py-2 text-sm ${
                      activeTab === "currency"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    Currency
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                      <h3 className="font-semibold mb-4">General Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              System Name
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue="SCIC Admin Portal"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              System Version
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue="v2.1.0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Default Language
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>English</option>
                              <option>Arabic</option>
                              <option>French</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Time Zone
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>UTC+5 (Pakistan)</option>
                              <option>UTC+3 (Saudi Arabia)</option>
                              <option>UTC+4 (UAE)</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Maintenance Mode
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-600">
                                Enable maintenance mode
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Debug Mode
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-600">
                                Enable debug logging
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Session Timeout (minutes)
                            </label>
                            <input
                              type="number"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue={30}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Login Attempts
                            </label>
                            <input
                              type="number"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue={5}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                          Save Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "branding" && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                      <h3 className="font-semibold mb-4">Branding Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company Name
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue="SCIC Bank"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Logo
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <Building2 className="h-8 w-8 text-gray-400" />
                              </div>
                              <p className="text-sm text-gray-600">
                                Click to upload logo
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG up to 2MB
                              </p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Favicon
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              <div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-gray-400" />
                              </div>
                              <p className="text-xs text-gray-600">
                                Upload favicon
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Primary Color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                className="w-12 h-10 rounded border"
                                defaultValue="#111827"
                              />
                              <input
                                type="text"
                                className="flex-1 rounded-lg border px-3 py-2"
                                defaultValue="#111827"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Secondary Color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                className="w-12 h-10 rounded border"
                                defaultValue="#6B7280"
                              />
                              <input
                                type="text"
                                className="flex-1 rounded-lg border px-3 py-2"
                                defaultValue="#6B7280"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Custom CSS
                            </label>
                            <textarea
                              className="w-full rounded-lg border px-3 py-2 h-32"
                              placeholder="Add custom CSS styles..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                          Save Branding
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "integration" && (
                  <div className="space-y-6">
                    {/* Top Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          key: "smtp",
                          title: "SMTP",
                          desc: "Send emails via your SMTP server.",
                          configured: true,
                          icon: <Mail className="h-4 w-4" />,
                        },
                        {
                          key: "sms",
                          title: "SMS",
                          desc: "Integrate with Twilio or other SMS providers.",
                          configured: false,
                          icon: <Phone className="h-4 w-4" />,
                        },
                        {
                          key: "webhook",
                          title: "Webhooks",
                          desc: "Send event callbacks to your endpoints.",
                          configured: false,
                          icon: <Globe className="h-4 w-4" />,
                        },
                        {
                          key: "sso",
                          title: "SSO (SAML/OIDC)",
                          desc: "Enable enterprise login via your IdP.",
                          configured: false,
                          icon: <Lock className="h-4 w-4" />,
                        },
                        {
                          key: "audit",
                          title: "Audit Sink",
                          desc: "Forward audit logs to SIEM or storage.",
                          configured: false,
                          icon: <Activity className="h-4 w-4" />,
                        },
                      ].map((c, idx) => (
                        <div
                          key={idx}
                          className={`bg-white rounded-xl border p-4 flex items-start justify-between ${
                            selectedIntegration === c.key
                              ? "ring-2 ring-gray-900"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {c.icon}
                            <div>
                              <div className="font-medium">{c.title}</div>
                              <div className="text-xs text-gray-500">
                                {c.desc}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 ${
                                c.configured
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {c.configured ? "Configured" : "Not Configured"}
                            </span>
                            <button
                              onClick={() => setSelectedIntegration(c.key)}
                              className="rounded-lg border px-3 py-1.5 text-xs hover:bg-gray-50"
                            >
                              Configure
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SMTP Configuration Panel */}
                    {selectedIntegration === "smtp" && (
                      <div className="bg-white rounded-xl border">
                        <div className="p-5 border-b">
                          <h3 className="font-semibold">SMTP Configuration</h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Host
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue="smtp.example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Port
                            </label>
                            <input
                              type="number"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue={587}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Username
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue="noreply@scic.local"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Password
                            </label>
                            <input
                              type="password"
                              className="w-full rounded-lg border px-3 py-2"
                              defaultValue="••••••••"
                            />
                          </div>
                        </div>
                        <div className="p-5 flex justify-end">
                          <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                            Save Integration
                          </button>
                        </div>
                      </div>
                    )}

                    {/* End Cards-driven form */}
                  </div>
                )}

                {activeTab === "parameters" && (
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
                            <tr
                              key={p.id}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="px-4 py-3">
                                <div className="font-medium">{p.label}</div>
                                <div className="text-xs text-gray-500">
                                  {p.id}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {p.name}
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {p.type}
                              </td>
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
                              <td className="px-4 py-3 text-gray-700">
                                {p.updated}
                              </td>
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

                {activeTab === "country" && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                      <h3 className="font-semibold mb-4">Country Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Default Country
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>Pakistan</option>
                              <option>Saudi Arabia</option>
                              <option>UAE</option>
                              <option>Kuwait</option>
                              <option>Qatar</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Allowed Countries
                            </label>
                            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                              {[
                                {
                                  code: "PK",
                                  name: "Pakistan",
                                  flag: "🇵🇰",
                                  active: true,
                                },
                                {
                                  code: "SA",
                                  name: "Saudi Arabia",
                                  flag: "🇸🇦",
                                  active: true,
                                },
                                {
                                  code: "AE",
                                  name: "UAE",
                                  flag: "🇦🇪",
                                  active: true,
                                },
                                {
                                  code: "KW",
                                  name: "Kuwait",
                                  flag: "🇰🇼",
                                  active: false,
                                },
                                {
                                  code: "QA",
                                  name: "Qatar",
                                  flag: "🇶🇦",
                                  active: false,
                                },
                                {
                                  code: "BH",
                                  name: "Bahrain",
                                  flag: "🇧🇭",
                                  active: false,
                                },
                                {
                                  code: "OM",
                                  name: "Oman",
                                  flag: "🇴🇲",
                                  active: false,
                                },
                              ].map((country) => (
                                <div
                                  key={country.code}
                                  className="flex items-center gap-3"
                                >
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    defaultChecked={country.active}
                                  />
                                  <span className="text-lg">
                                    {country.flag}
                                  </span>
                                  <span className="text-sm">
                                    {country.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({country.code})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country Format
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>ISO 3166-1 alpha-2 (PK, SA, AE)</option>
                              <option>
                                ISO 3166-1 alpha-3 (PAK, SAU, ARE)
                              </option>
                              <option>
                                Full Name (Pakistan, Saudi Arabia, UAE)
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Code Format
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>With + (+92, +966, +971)</option>
                              <option>Without + (92, 966, 971)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date Format
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>DD/MM/YYYY</option>
                              <option>MM/DD/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Time Format
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>12-hour (AM/PM)</option>
                              <option>24-hour</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                          Save Country Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "currency" && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                      <h3 className="font-semibold mb-4">Currency Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Default Currency
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>PKR - Pakistani Rupee</option>
                              <option>SAR - Saudi Riyal</option>
                              <option>AED - UAE Dirham</option>
                              <option>USD - US Dollar</option>
                              <option>EUR - Euro</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Supported Currencies
                            </label>
                            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                              {[
                                {
                                  code: "PKR",
                                  name: "Pakistani Rupee",
                                  symbol: "₨",
                                  active: true,
                                },
                                {
                                  code: "SAR",
                                  name: "Saudi Riyal",
                                  symbol: "ر.س",
                                  active: true,
                                },
                                {
                                  code: "AED",
                                  name: "UAE Dirham",
                                  symbol: "د.إ",
                                  active: true,
                                },
                                {
                                  code: "USD",
                                  name: "US Dollar",
                                  symbol: "$",
                                  active: true,
                                },
                                {
                                  code: "EUR",
                                  name: "Euro",
                                  symbol: "€",
                                  active: false,
                                },
                                {
                                  code: "GBP",
                                  name: "British Pound",
                                  symbol: "£",
                                  active: false,
                                },
                                {
                                  code: "KWD",
                                  name: "Kuwaiti Dinar",
                                  symbol: "د.ك",
                                  active: false,
                                },
                                {
                                  code: "QAR",
                                  name: "Qatari Riyal",
                                  symbol: "ر.ق",
                                  active: false,
                                },
                              ].map((currency) => (
                                <div
                                  key={currency.code}
                                  className="flex items-center gap-3"
                                >
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    defaultChecked={currency.active}
                                  />
                                  <span className="text-sm font-medium">
                                    {currency.symbol}
                                  </span>
                                  <span className="text-sm">
                                    {currency.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({currency.code})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Currency Format
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>Symbol First (₨1,000)</option>
                              <option>Symbol Last (1,000₨)</option>
                              <option>Code First (PKR 1,000)</option>
                              <option>Code Last (1,000 PKR)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Decimal Places
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>2 (1,000.00)</option>
                              <option>3 (1,000.000)</option>
                              <option>0 (1,000)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Thousand Separator
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>Comma (1,000)</option>
                              <option>Period (1.000)</option>
                              <option>Space (1 000)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Decimal Separator
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>Period (1,000.00)</option>
                              <option>Comma (1.000,00)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Exchange Rate API
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>Fixer.io</option>
                              <option>ExchangeRate-API</option>
                              <option>Currency Layer</option>
                              <option>Manual</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Update Frequency
                            </label>
                            <select className="w-full rounded-lg border px-3 py-2">
                              <option>Every hour</option>
                              <option>Every 6 hours</option>
                              <option>Daily</option>
                              <option>Weekly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
                          Save Currency Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
      {/* Create User Modal */}
      <CreateUserModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSave={(data) => {
          console.log("Create user:", data);
          setOpenCreate(false);
        }}
      />

      {/* Create Role Modal */}
      {openCreateRole && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {editingRole ? "Edit Role" : "Create Role"}
              </h3>
              <button
                onClick={() => setOpenCreateRole(false)}
                className="rounded-xl border px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
            <div className="grid gap-3">
              <div>
                <label className="text-xs text-gray-600">Role Name</label>
                <input
                  id="role-name"
                  defaultValue={editingRole?.name || ""}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  placeholder="e.g., Bank Admin"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Description</label>
                <input
                  id="role-desc"
                  defaultValue={editingRole?.desc || ""}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  placeholder="Short description"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Permissions</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {[
                    "user:read",
                    "user:create",
                    "user:update",
                    "role:assign",
                    "policy:*",
                    "audit:read",
                  ].map((p) => (
                    <button
                      key={p}
                      className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setOpenCreateRole(false)}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = document
                    .getElementById("role-name")
                    .value.trim();
                  const desc = document
                    .getElementById("role-desc")
                    .value.trim();
                  if (!name) return;
                  if (editingRole) {
                    setRoles((rs) =>
                      rs.map((r) =>
                        r.id === editingRole.id ? { ...r, name, desc } : r
                      )
                    );
                  } else {
                    setRoles((rs) => [
                      { id: Date.now(), name, desc, perms: ["user:read"] },
                      ...rs,
                    ]);
                  }
                  setOpenCreateRole(false);
                  setEditingRole(null);
                }}
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
              >
                {editingRole ? "Save Changes" : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {openCreateGroup && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {editingGroup ? "Edit Group" : "Create Group"}
              </h3>
              <button
                onClick={() => setOpenCreateGroup(false)}
                className="rounded-xl border px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
            <div className="grid gap-3">
              <div>
                <label className="text-xs text-gray-600">Group Name</label>
                <input
                  id="group-name"
                  defaultValue={editingGroup?.name || ""}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  placeholder="e.g., Clearing Ops"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Type</label>
                <select
                  id="group-type"
                  defaultValue={editingGroup?.type || "Department"}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                >
                  <option>Department</option>
                  <option>Team</option>
                  <option>Region</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Members</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {[
                    "Ayesha Khan",
                    "Omar Ali",
                    "Fatima Noor",
                    "Hassan Raza",
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
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setOpenCreateGroup(false)}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = document
                    .getElementById("group-name")
                    .value.trim();
                  const type = document.getElementById("group-type").value;
                  if (!name) return;
                  if (editingGroup) {
                    setGroups((gs) =>
                      gs.map((g) =>
                        g.id === editingGroup.id ? { ...g, name, type } : g
                      )
                    );
                  } else {
                    setGroups((gs) => [
                      { id: Date.now(), name, type, members: [] },
                      ...gs,
                    ]);
                  }
                  setOpenCreateGroup(false);
                  setEditingGroup(null);
                }}
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
              >
                {editingGroup ? "Save Changes" : "Create Group"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Drawer */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="h-full w-full max-w-md bg-white p-5 shadow-2xl">
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
                <Ban className="h-4 w-4" /> Disable
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

      {/* Parameter Modal */}
      <CreateParameterModal
        open={isParamModalOpen}
        onClose={() => setIsParamModalOpen(false)}
        onSave={(data) => {
          console.log("New parameter:", data);
          setIsParamModalOpen(false);
        }}
      />
    </div>
  );
}
