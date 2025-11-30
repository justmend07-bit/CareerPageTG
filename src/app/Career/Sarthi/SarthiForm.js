"use client";

import { useState } from "react";
import {
  Camera,
  Upload,
  User,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Map,
  Briefcase,
  Building2,
  Instagram,
} from "lucide-react";

export default function SarthiForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  // previews
  const [aadharPreview, setAadharPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleFilePreview = (e, setPreview) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);

    // selected roles
    selectedRoles.forEach((role) => formData.append("roles", role));

    const res = await fetch("/saarthi/api", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSubmitting(false);

    if (data.success) {
      setSuccess("Application submitted successfully!");
      e.target.reset();
      setSelectedRoles([]);
      setAadharPreview(null);
      setPhotoPreview(null);
    } else {
      alert("Something went wrong.");
    }
  };

  const handleRoleToggle = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const roles = [
    "On-Ground Volunteer",
    "Trip Lead",
    "Content Creator",
    "Community Engagement",
    "Operations / Logistics",
  ];

  return (
    <div className="min-h-screen  py-12 px-4 rounded-2xl  mt-20 ">

      {/* HEADER */}
      <div className="text-center mb-16 animate-header">
        <h1 className="
      text-5xl md:text-6xl font-extrabold tracking-tight 
      bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 
      text-transparent bg-clip-text drop-shadow-sm
    ">
          Become a Saarthi
        </h1>

        <p className="text-gray-600 mt-4 text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
          Join our on-ground team to coordinate trips, lead groups,
          create content, and craft unforgettable experiences.
        </p>

        {/* Decorative underline */}
        <div className="mt-4 flex justify-center">
          <div className="h-[3px] w-24 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300  rounded-full shadow-sm"></div>
        </div>
      </div>


      {/* FORM CARD */}
      <div className="max-w-3xl mx-auto bg-white  shadow-md rounded-3xl p-10 md:p-12 border border-orange-200/40 animate-slideUp">

        {success && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-6 border border-green-300 animate-fadeIn">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-14">

          <SectionTitle title="Personal Information" />

          <InputField required label="Full Name" name="full_name" placeholder="Enter your full name" icon={User} className="sm:bg-white" />

          {/* DOB + Gender */}
          <TwoCol>
            <InputField required label="Date of Birth" type="date" name="dob" icon={Calendar} />
            <SelectField label="Gender" name="gender" icon={User} required>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </SelectField>
          </TwoCol>

          <InputField required
            label="Aadhar Number"
            name="aadhar_number"
            placeholder="Enter 12-digit Aadhar number"
            maxLength="12"
            icon={CreditCard}
          />

          {/* File Uploads */}
          <TwoCol>
            <UploadField
              label="Aadhar Card (Front)"
              name="aadhar_front"
              preview={aadharPreview}
              onChange={(e) => handleFilePreview(e, setAadharPreview)}
            />

            <ProfileField
              label="Profile Photo"
              name="profile_photo"
              preview={photoPreview}
              onChange={(e) => handleFilePreview(e, setPhotoPreview)}
            />
          </TwoCol>

          {/* Contact */}
          <TwoCol>
            <InputField required label="Email Address" name="email" type="email" icon={Mail} />
            <InputField required label="Mobile Number" name="mobile" placeholder="+91 98765 43210" icon={Phone} />
          </TwoCol>

          {/* City & State */}
          <TwoCol>
            <InputField required label="Current City" name="city" placeholder="e.g. Mumbai" icon={MapPin} />
            <InputField required label="State" name="state" placeholder="e.g. Maharashtra" icon={Map} />
          </TwoCol>

          <TextAreaField label="Address" name="address" required/>

          <SectionTitle title="Background Information" />

          <TwoCol>
            <SelectField required label="Occupation" name="occupation" icon={Briefcase}>
              <option value="">Select occupation</option>
              <option>Student</option>
              <option>Professional</option>
              <option>Freelancer</option>
              <option>Entrepreneur</option>
            </SelectField>

            <InputField required
              label="College / Organization Name"
              name="organization"
              icon={Building2}
            />
          </TwoCol>

          <InputField
            label="Social media handle (optional)"
            name="socialmedia"
            placeholder=""

          />

          <InputField
            label="Previous experience(if any)"
            name="previous_experience"
            placeholder=""

          />

          <SectionTitle title="Roles & Motivation" required/>

          {/* Roles */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-3">Roles of Interest</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all animate-fadeInSmall ${selectedRoles.includes(role)
                      ? "bg-orange-500 text-white shadow-md scale-[1.02]"
                      : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <TextAreaField
            label="Why do you want to become a Saarthi?"
            name="motivation"
            rows="6"
            required
          />

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes fadeInSmall { from { opacity: 0; transform: scale(.95) } to { opacity: 1; transform: scale(1) } }

        .animate-fadeIn { animation: fadeIn .6s ease-out }
        .animate-slideUp { animation: slideUp .7s ease-out }
        .animate-fadeInSmall { animation: fadeInSmall .35s ease-out }
      `}</style>
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fadeInSmall">
    {title}
  </h2>
);

const TwoCol = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 
          focus:ring-orange-400 focus:bg-white outline-none transition-all"
      />
    </div>
  </div>
);

const SelectField = ({ label, icon: Icon, children, ...props }) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      {Icon &&
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      }
      <select
        {...props}
        className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 
          focus:ring-orange-400 focus:bg-white outline-none appearance-none transition-all"
      >
        {children}
      </select>
    </div>
  </div>
);

const UploadField = ({ label, name, onChange, preview }) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

    <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer 
      hover:border-orange-400 hover:bg-orange-50/40 transition-all hover:scale-[1.01] block">

      {preview ? (
        <img src={preview} className="mx-auto h-32 object-cover rounded-xl shadow-sm" />
      ) : (
        <>
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            <span className="text-orange-600 font-medium">Upload</span> or drag & drop
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
        </>
      )}

      <input type="file" name={name} className="hidden" onChange={onChange} />
    </label>
  </div>
);

const ProfileField = ({ label, name, onChange, preview }) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

    <div className="flex items-center gap-4">
      {preview ? (
        <img
          src={preview}
          className="w-20 h-20 rounded-full object-cover shadow-md"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
          <Camera className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <label className="px-6 py-2 border border-gray-300 rounded-xl shadow-sm text-sm hover:bg-gray-100 cursor-pointer transition-all">
        Change
        <input type="file" name={name} className="hidden" onChange={onChange} />
      </label>
    </div>
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div className="animate-fadeInSmall">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      {...props}
      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:ring-2 
        focus:ring-orange-400 focus:bg-white outline-none resize-none transition-all"
    ></textarea>
  </div>
);