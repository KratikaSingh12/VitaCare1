import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Heart,
  Sparkles,
  Baby,
  Brain,
  Activity,
  HeartPulse,
  Bone,
  Ear,
  Eye,
  Droplets,
  Smile,
  Ribbon,
  BrainCircuit,
} from "lucide-react";

const iconMap = {
  Stethoscope,
  Heart,
  Sparkles,
  Baby,
  Brain,
  Activity,
  HeartPulse,
  Bone,
  Ear,
  Eye,
  Droplets,
  Smile,
  Ribbon,
  BrainCircuit,
};

export function SpecialtyCard({ specialty, doctorCount }) {
  const Icon = iconMap[specialty?.icon] || Stethoscope;

  return (
    <Link to={`/doctors?specialty=${specialty?.id}`}>
      <div className="group cursor-pointer rounded-xl border bg-white p-6 text-center transition-all hover:shadow-lg">
        
        {/* ✅ Square fix */}
        <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
          <Icon className="h-7 w-7 text-blue-700" />
        </div>

        <h3 className="mb-1 font-semibold text-black">{specialty?.name}</h3>

        {doctorCount !== undefined && (
          <p className="text-sm text-gray-600">
            {doctorCount} Doctor{doctorCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
