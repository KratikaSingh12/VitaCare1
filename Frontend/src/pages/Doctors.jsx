import React, {
  useContext,
  useMemo,
  useState,
} from "react";

import { Link, useParams } from "react-router-dom";

import { Search } from "lucide-react";

import { AppContext } from "../context/AppContext";

import deptData from "../data/departments.json";

const Doctors = () => {

  // ✅ MongoDB doctors
  const { doctors } = useContext(AppContext);

  const { speciality } = useParams();

  const specialties =
    deptData?.specialties || [];

  const initialSpecialty =
    speciality || "all";

  const [search, setSearch] =
    useState("");

  const [specialty, setSpecialty] =
    useState(initialSpecialty);

  const [sortBy, setSortBy] =
    useState("fee-low");

  // ✅ FILTER + SEARCH
  const filteredDoctors = useMemo(() => {

    let result = [...doctors];

    // SEARCH
    if (search.trim()) {

      const q = search.toLowerCase();

      result = result.filter(
        (doc) =>
          String(doc.name)
            .toLowerCase()
            .includes(q) ||

          String(
            doc.specialization ||
              doc.speciality
          )
            .toLowerCase()
            .includes(q) ||

          String(doc.degree)
            .toLowerCase()
            .includes(q)
      );
    }

    // SPECIALITY FILTER
    if (specialty !== "all") {

      result = result.filter(
        (doc) =>
          String(
            doc.specialization ||
              doc.speciality
          ).toLowerCase() ===
          String(
            specialties.find(
              (s) =>
                s.id === specialty
            )?.name || specialty
          ).toLowerCase()
      );
    }

    // SORTING
    switch (sortBy) {

      case "fee-low":

        result.sort(
          (a, b) =>
            Number(
              a.fee || a.fees
            ) -
            Number(
              b.fee || b.fees
            )
        );

        break;

      case "fee-high":

        result.sort(
          (a, b) =>
            Number(
              b.fee || b.fees
            ) -
            Number(
              a.fee || a.fees
            )
        );

        break;

      case "name":

        result.sort((a, b) =>
          String(a.name).localeCompare(
            String(b.name)
          )
        );

        break;

      default:
        break;
    }

    return result;

  }, [
    doctors,
    search,
    specialty,
    sortBy,
    specialties,
  ]);

  const currentSpecialtyName =

    specialty === "all"

      ? "All Specialties"

      : specialties.find(
          (s) =>
            s.id === specialty
        )?.name || specialty;

  return (

    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8">

          <h1 className="mb-2 text-3xl font-bold text-black">

            Find a Doctor

          </h1>

          <p className="text-gray-600">

            Browse our network of{" "}

            {doctors.length}+ healthcare professionals

          </p>

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* SEARCH + FILTER */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}
          <div className="relative w-full max-w-md">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-10 py-3 outline-none"
            />

          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">

            <select
              value={specialty}
              onChange={(e) =>
                setSpecialty(
                  e.target.value
                )
              }
              className="rounded-lg border px-4 py-3"
            >

              <option value="all">
                All Specialties
              </option>

              {specialties.map(
                (spec) => (

                  <option
                    key={spec.id}
                    value={spec.id}
                  >

                    {spec.name}

                  </option>

                )
              )}

            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="rounded-lg border px-4 py-3"
            >

              <option value="fee-low">
                Lowest Fee
              </option>

              <option value="fee-high">
                Highest Fee
              </option>

              <option value="name">
                Name A-Z
              </option>

            </select>

            <button
              onClick={() => {

                setSearch("");

                setSpecialty("all");

                setSortBy("fee-low");

              }}
              className="rounded-lg border px-4 py-3"
            >

              Clear

            </button>

          </div>

        </div>

        {/* RESULT COUNT */}
        <p className="mb-6 text-sm text-gray-600">

          Showing{" "}

          {filteredDoctors.length} doctor
          {filteredDoctors.length !== 1
            ? "s"
            : ""}

          {" "}in {currentSpecialtyName}

        </p>

        {/* DOCTORS GRID */}
        {filteredDoctors.length >
        0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredDoctors.map(
              (doctor) => (

                <DoctorCard
                  key={doctor._id}
                  doctor={doctor}
                />

              )
            )}

          </div>

        ) : (

          <div className="rounded-2xl border py-16 text-center">

            <h2 className="text-xl font-semibold">

              No Doctors Found

            </h2>

            <p className="mt-2 text-gray-600">

              Try different filters

            </p>

          </div>

        )}

      </div>

    </div>

  );
};

export default Doctors;

/* ================= CARD ================= */

function DoctorCard({ doctor }) {

  return (

    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">

      <div className="h-52 overflow-hidden">

        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover"
        />

      </div>

      <div className="p-5">

        <h2 className="text-lg font-bold">

          {doctor.name}

        </h2>

        <p className="mt-1 text-sm text-green-700">

          {doctor.specialization ||
            doctor.speciality}

        </p>

        <p className="mt-1 text-sm text-gray-500">

          {doctor.experience}

        </p>

        <p className="mt-3 line-clamp-2 text-sm text-gray-600">

          {doctor.about}

        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xl font-bold text-green-600">

            ₹{doctor.fee || doctor.fees}

          </span>

        </div>

        <div className="mt-5 flex gap-2">

          <Link
            to={`/doctor/${doctor._id}`}
            className="flex-1 rounded-lg border px-4 py-2 text-center text-sm"
          >

            Profile

          </Link>

          <Link
            to={`/appointment/${doctor._id}`}
            className="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm text-white"
          >

            Book

          </Link>

        </div>

      </div>

    </div>

  );
}