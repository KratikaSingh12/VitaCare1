import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  HeartPulse,
  Sparkles,
  Baby,
  Brain,
  Bone,
  ArrowRight,
} from "lucide-react";

// ✅ Dynamic JSON imports
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import deptData from "../data/departments.json";

// ✅ Icon mapper
const ICONS = {
  Stethoscope,
  HeartPulse,
  Sparkles,
  Baby,
  Brain,
  Bone,
};

const SpecialtyCard = ({ specialty, doctorCount }) => {
  const Icon = ICONS[specialty.icon];

  return (
  <Link
    to={`/doctors/${specialty.name}`}
    className="group flex flex-col items-center justify-center rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-lg"
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
      {Icon ? <Icon className="h-7 w-7 text-blue-600" /> : null}
    </div>

    <h3 className="mb-1 text-base font-semibold text-black">
      {specialty.name}
    </h3>

    <p className="text-sm text-gray-500">
      {doctorCount} Doctor{doctorCount !== 1 ? "s" : ""}
    </p>
  </Link>
);

};

const DepartmentInfo = ({ title, description }) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default function Departments() {
  const specialties = deptData?.specialties || [];
  const { doctors } = useContext(AppContext);

  // ✅ Doctor count per department (dynamic)
  const specialtyDoctorCount = useMemo(() => {
    const map = {};

    for (const sp of specialties) {

  map[sp.id] = doctors.filter(
    (d) =>
      String(
        d.speciality
      ).toLowerCase() ===
      String(
        sp.name
      ).toLowerCase()
  ).length;

}

    return map;
  }, [specialties]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold">Medical Departments</h1>
          <p className="text-gray-600">
            Explore our {specialties.length} specialized departments with expert healthcare professionals
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {specialties.map((specialty) => (
            <SpecialtyCard
              key={specialty.id}
              specialty={specialty}
              doctorCount={specialtyDoctorCount[specialty.id] || 0}
            />
          ))}
        </div>

        {/* Department Descriptions (dynamic from JSON) */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">About Our Departments</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {specialties.map((sp) => (
              <DepartmentInfo
                key={sp.id}
                title={sp.name}
                description={sp.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
