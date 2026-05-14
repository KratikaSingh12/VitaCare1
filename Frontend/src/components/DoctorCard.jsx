import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react";

export default function DoctorCard({ doctor }) {
  if (!doctor) return null;

  return (
    <div className="group overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={doctor.image || "/placeholder.svg"}
          alt={doctor.name || "Doctor"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {doctor?.available && (
          <span className="absolute left-3 top-3 rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-green-800">
            Available Today
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
            {doctor.specialization || doctor.specialtyName || "Specialist"}
          </span>
        </div>

        <h3 className="mb-1 text-lg font-semibold text-black">{doctor.name}</h3>

        <p className="mb-3 text-sm text-gray-600">
          {doctor.degree || doctor.education || ""}
        </p>

        <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-black">{doctor.rating }</span>
            <span>({doctor.reviews || 0})</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{doctor.experience || 0} yrs</span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{doctor.hospital || "Hospital"}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-green-700">
              ₹{doctor.fee || 0}
            </span>
            <span className="text-sm text-gray-600"> /visit</span>
          </div>

          <Link
           to={doctor._id ? `/doctor/${doctor._id}` : "#"}
            className="rounded-md bg-[#0072D5] px-4 py-2 text-sm font-medium text-white hover:bg-[#0072D5]"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
