import React, {
  useContext,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  Search,
  Stethoscope,
  AlertCircle,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react";

import axios from "axios";

import { AppContext } from "../context/AppContext";

import symptomData from "../data/symptoms.json";

export default function SymptomChecker() {

  const { doctors } = useContext(AppContext);

  const commonSymptoms =
    symptomData?.commonSymptoms || [];

  const [symptoms, setSymptoms] =
    useState("");

  const [hasSearched, setHasSearched] =
    useState(false);

  const [matchedSpecialties, setMatchedSpecialties] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // FILTER DOCTORS
  const matchedDoctors = useMemo(() => {

    if (!hasSearched) return [];

    if (matchedSpecialties.length === 0)
      return [];

    const specialtyNames =
      matchedSpecialties.map((s) =>
        String(
          s.suggestedDepartment ||
          s.specialtyName
        ).toLowerCase()
      );

    const filtered = doctors.filter(
      (doc) =>
        specialtyNames.includes(
          String(
            doc.specialization ||
            doc.speciality
          ).toLowerCase()
        )
    );

    filtered.sort(
      (a, b) =>
        Number(a.fee || a.fees) -
        Number(b.fee || b.fees)
    );

    return filtered;

  }, [
    hasSearched,
    matchedSpecialties,
    doctors,
  ]);

  // AI SEARCH
  const handleSearch = async () => {

    if (!symptoms.trim()) return;

    try {

      setLoading(true);

      const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/predict-department`,
        {
          symptom: symptoms,
        }
      );

      if (res.data.success) {

        const result =
          res.data.result;

        // HIGH CONFIDENCE
        if (
          result.confidence >= 0.90
        ) {

          setMatchedSpecialties([
            {
              specialtyName:
                result.department,

              confidence:
                result.confidence,
            },
          ]);

        }

        // MEDIUM CONFIDENCE
        else if (
          result.confidence >= 0.50
        ) {

          setMatchedSpecialties([
            {
              specialtyName:
                `Did you mean: ${result.corrected_input} ?`,

              suggestedDepartment:
                result.department,

              confidence:
                result.confidence,
            },
          ]);

        }

        // LOW CONFIDENCE
        else {

          setMatchedSpecialties([]);

        }

        setHasSearched(true);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleSymptomClick = (
    symptom
  ) => {

    setSymptoms(symptom);

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleSearch();

    }

  };

  return (

    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 md:py-24">

        <div className="mx-auto max-w-4xl px-4 text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

            <Stethoscope className="h-4 w-4" />

            AI-Powered Symptom Analysis

          </div>

          <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl">

            Describe Your Symptoms

          </h1>

          <p className="mb-8 text-lg text-gray-600">

            Tell us what you are experiencing,
            and we will recommend the right
            specialist for you.

          </p>

          {/* SEARCH */}
          <div className="mx-auto max-w-2xl">

            <div className="flex gap-3">

              <div className="relative flex-1">

                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                <input
                  type="text"
                  placeholder="e.g. headache, fever, chest pain..."
                  value={symptoms}
                  onChange={(e) =>
                    setSymptoms(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleKeyDown
                  }
                  className="h-14 w-full rounded-xl border px-12 text-base outline-none"
                />

              </div>

              <button
                onClick={
                  handleSearch
                }
                className="h-14 cursor-pointer rounded-xl bg-black px-8 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 active:scale-95"
              >

                {loading
                  ? "Analyzing..."
                  : "Find Doctors"}

              </button>

            </div>

          </div>

          {/* COMMON SYMPTOMS */}
          <div className="mt-6">

            <p className="mb-3 text-sm text-gray-600">

              Common symptoms:

            </p>

            <div className="flex flex-wrap justify-center gap-2">

              {commonSymptoms.map(
                (symptom) => (

                  <button
                    key={symptom}
                    onClick={() =>
                      handleSymptomClick(
                        symptom
                      )
                    }
                    className="cursor-pointer rounded-full border bg-white px-3 py-1.5 text-sm transition-all hover:bg-gray-100 hover:scale-105"
                  >

                    {symptom}

                  </button>

                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* RESULTS */}
      {hasSearched && (

        <section className="py-12 md:py-16">

          <div className="mx-auto max-w-7xl px-4">

            {matchedSpecialties.length >
            0 ? (

              <>

                {/* DEPARTMENTS */}
                <div className="mb-12">

                  <div className="mb-6 flex items-center gap-2">

                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                    <h2 className="text-2xl font-bold text-black">

                      Recommended Departments

                    </h2>

                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {matchedSpecialties
                      .slice(0, 3)
                      .map(
                        (
                          sp,
                          index
                        ) => (

                          <div
                            key={
                              index
                            }
                            className={`rounded-2xl border bg-white p-5 shadow-sm ${
                              index === 0
                                ? "border-green-500"
                                : ""
                            }`}
                          >

                            <div className="flex items-center justify-between">

                              <h3 className="text-lg font-semibold">

                                {
                                  sp.specialtyName
                                }

                              </h3>

                              {index ===
                                0 && (

                                <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">

                                  Best Match

                                </span>

                              )}

                            </div>

                            {
                              sp.suggestedDepartment && (

                                <p className="mt-3 text-sm text-gray-600">

                                  Suggested Department:
                                  {" "}
                                  <span className="font-medium text-black">
                                    {
                                      sp.suggestedDepartment
                                    }
                                  </span>

                                </p>

                              )
                            }

                            <p className="mt-2 text-sm text-gray-500">

                              Confidence:
                              {" "}
                              {
                                (
                                  sp.confidence * 100
                                ).toFixed(0)
                              }%

                            </p>

                          </div>

                        )
                      )}

                  </div>

                </div>

                {/* DOCTORS */}
                <div>

                  <div className="mb-6">

                    <h2 className="text-2xl font-bold text-black">

                      Available Doctors

                    </h2>

                    <p className="text-gray-600">

                      {
                        matchedDoctors.length
                      }{" "}
                      doctors found

                    </p>

                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {matchedDoctors
                      .slice(0, 6)
                      .map(
                        (
                          doctor
                        ) => (

                          <div
                            key={
                              doctor._id ||
                              doctor.id
                            }
                            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                          >

                            <div className="flex gap-4 p-4">

                              <div className="h-24 w-24 overflow-hidden rounded-xl bg-gray-100">

                                <img
                                  src={
                                    doctor.image
                                  }
                                  alt={
                                    doctor.name
                                  }
                                  className="h-full w-full object-cover"
                                />

                              </div>

                              <div className="flex flex-1 flex-col">

                                <h3 className="font-semibold text-black">

                                  {
                                    doctor.name
                                  }

                                </h3>

                                <p className="text-sm text-green-700">

                                  {doctor.specialization ||
                                    doctor.speciality}

                                </p>

                                <div className="mt-1 flex items-center gap-1 text-sm">

                                  <Star className="h-4 w-4 text-yellow-500" />

                                  {/* <span>
                                    4.5
                                  </span> */}

                                </div>

                                <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">

                                  <Clock className="h-3.5 w-3.5" />

                                  {
                                    doctor.experience
                                  }

                                </div>

                              </div>

                            </div>

                            <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3">

                              <div>

                                <span className="text-lg font-bold">

                                  ₹
                                  {doctor.fee ||
                                    doctor.fees}

                                </span>

                              </div>

                              <Link
                                to={`/appointment/${doctor._id || doctor.id}`}
                                className="cursor-pointer rounded-lg bg-black px-4 py-2 text-sm text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 active:scale-95"
                              >

                                Book Now

                              </Link>

                            </div>

                          </div>

                        )
                      )}

                  </div>

                </div>

              </>

            ) : (

              <div className="mx-auto max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">

                  <AlertCircle className="h-8 w-8 text-gray-500" />

                </div>

                <h3 className="mb-2 text-xl font-semibold">

                  No matches found

                </h3>

                <p className="text-gray-600">

                  Try describing your symptoms
                  differently.

                </p>

              </div>

            )}

          </div>

        </section>

      )}

      {/* DISCLAIMER */}
      <section className="border-t bg-gray-50 py-8">

        <div className="mx-auto max-w-3xl px-4">

          <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

            <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600" />

            <div>

              <h4 className="font-semibold text-yellow-800">

                Disclaimer

              </h4>

              <p className="text-sm text-yellow-700">

                This tool is informational only
                and does not replace professional
                medical advice.

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}