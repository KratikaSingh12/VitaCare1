import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Star,
  Clock,
  MapPin,
  GraduationCap,
  Languages,
  Video,
  CalendarDays,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
}) {

  return (

    <div className="flex gap-1">

      {[1, 2, 3, 4, 5].map((star) => (

        <button
          key={star}
          type="button"
          onClick={() =>
            interactive &&
            onRatingChange?.(star)
          }
          className={
            interactive
              ? "cursor-pointer"
              : "cursor-default"
          }
          disabled={!interactive}
        >

          <Star
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />

        </button>

      ))}

    </div>

  );

}

function FeedbackCard({ feedback }) {

  return (

    <div className="rounded-xl border bg-white p-4 shadow-sm">

      <div className="mb-2 flex items-center justify-between">

        <span className="font-medium">
          {feedback.patientName}
        </span>

        <span className="text-sm text-gray-500">
          {new Date(
            feedback.date
          ).toLocaleDateString()}
        </span>

      </div>

      <StarRating rating={feedback.rating} />

      <p className="mt-2 text-sm text-gray-600">
        {feedback.comment}
      </p>

    </div>

  );

}

export default function DoctorProfile() {

  const { docId } = useParams();

  const { doctors } = useContext(AppContext);
  const doctor = doctors.find(
  (d) => String(d._id) === String(docId)
);

  const feedbacks = [];

  const [showFeedbackForm, setShowFeedbackForm] =
    useState(false);

  const [feedbackSubmitted, setFeedbackSubmitted] =
    useState(false);

  const [newFeedback, setNewFeedback] =
    useState({
      name: "",
      rating: 0,
      comment: "",
    });

  const [localFeedbacks, setLocalFeedbacks] =
    useState([]);

  const allFeedbacks = [
    ...localFeedbacks,
    ...feedbacks,
  ];

  const handleFeedbackSubmit = (e) => {

    e.preventDefault();

    const feedback = {

      id: `fb-${Date.now()}`,

      doctorId: docId,

      patientName: newFeedback.name,

      rating: newFeedback.rating,

      comment: newFeedback.comment,

      date: new Date(),

    };

    setLocalFeedbacks([
      feedback,
      ...localFeedbacks,
    ]);

    setFeedbackSubmitted(true);

    setShowFeedbackForm(false);

    setNewFeedback({
      name: "",
      rating: 0,
      comment: "",
    });

    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 3000);

  };

  // ✅ Doctor not found fix
  if (!doctor) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="text-center">

          <h1 className="mb-4 text-3xl font-bold">
            Doctor Not Found
          </h1>

          <Link
            to="/doctors"
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            Browse Doctors
          </Link>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6">

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700"
          >

            <ArrowLeft className="h-4 w-4" />

            Back to Doctors

          </Link>

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="flex flex-col gap-6 md:flex-row">

                <img
                  src={doctor?.image}
                  alt={doctor?.name}
                  className="h-64 w-64 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">

                    {doctor?.speciality}

                  </span>

                  <h1 className="mt-3 text-3xl font-bold">

                    {doctor?.name}

                  </h1>

                  <p className="mt-2 text-gray-600">

                    {doctor?.degree}

                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">

                    <div className="flex items-center gap-2 text-gray-600">

                      <Clock className="h-4 w-4" />

                      <span>
                        {doctor?.experience}
                      </span>

                    </div>

                    <div className="flex items-center gap-2 text-gray-600">

                      <GraduationCap className="h-4 w-4" />

                      <span>
                        {doctor?.degree}
                      </span>

                    </div>

                    {doctor?.address && (

                      <div className="flex items-center gap-2 text-gray-600">

                        <MapPin className="h-4 w-4" />

                        <span>
                          {
                            doctor?.address
                              ?.line1
                          }
                        </span>

                      </div>

                    )}

                    {doctor?.languages && (

                      <div className="flex items-center gap-2 text-gray-600">

                        <Languages className="h-4 w-4" />

                        <span>
                          {doctor?.languages}
                        </span>

                      </div>

                    )}

                  </div>

                  <div className="mt-6 border-t pt-5">

                    <h3 className="mb-2 text-lg font-semibold">
                      About
                    </h3>

                    <p className="text-gray-600">
                      {doctor?.about}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Feedback */}
            <div className="mt-6 rounded-2xl border bg-white shadow-sm">

              <div className="flex items-center justify-between border-b p-5">

                <h2 className="flex items-center gap-2 text-lg font-semibold">

                  <MessageSquare className="h-5 w-5" />

                  Patient Feedback

                </h2>

                <button
                  onClick={() =>
                    setShowFeedbackForm(
                      !showFeedbackForm
                    )
                  }
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  Write Review
                </button>

              </div>

              <div className="p-5">

                {feedbackSubmitted && (

                  <div className="mb-5 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">

                    <CheckCircle2 className="h-5 w-5" />

                    Feedback Submitted

                  </div>

                )}

                {showFeedbackForm && (

                  <form
                    onSubmit={
                      handleFeedbackSubmit
                    }
                    className="mb-6 space-y-4 rounded-xl border p-4"
                  >

                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newFeedback.name}
                      onChange={(e) =>
                        setNewFeedback({
                          ...newFeedback,
                          name:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-lg border px-4 py-2"
                      required
                    />

                    <StarRating
                      rating={
                        newFeedback.rating
                      }
                      interactive
                      onRatingChange={(
                        rating
                      ) =>
                        setNewFeedback({
                          ...newFeedback,
                          rating,
                        })
                      }
                    />

                    <textarea
                      rows={4}
                      placeholder="Write your review..."
                      value={
                        newFeedback.comment
                      }
                      onChange={(e) =>
                        setNewFeedback({
                          ...newFeedback,
                          comment:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-lg border px-4 py-2"
                      required
                    />

                    <button
                      type="submit"
                      className="rounded-lg bg-black px-5 py-2 text-white"
                    >
                      Submit
                    </button>

                  </form>

                )}

                {allFeedbacks.length > 0 ? (

                  <div className="space-y-4">

                    {allFeedbacks.map(
                      (feedback) => (

                        <FeedbackCard
                          key={feedback.id}
                          feedback={feedback}
                        />

                      )
                    )}

                  </div>

                ) : (

                  <p className="text-gray-500">
                    No feedback yet
                  </p>

                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">

              <div className="mb-6 text-center">

                <p className="text-sm text-gray-500">
                  Consultation Fee
                </p>

                <h2 className="text-4xl font-bold text-green-600">

                  ₹{doctor?.fees}

                </h2>

              </div>

              <div className="space-y-3">

                <Link
                  to={`/appointment/${doctor?._id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-white"
                >

                  <CalendarDays className="h-5 w-5" />

                  Book Appointment

                </Link>

                <Link
                  to="/emergency"
                  className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3"
                >

                  <Video className="h-5 w-5" />

                  Emergency Call

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}