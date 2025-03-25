"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ApplyButtonProps {
  jobId: string;
  seekerId: string;
  companyId: string;
  onApplicationSuccess?: (data: any) => void;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ jobId, seekerId, companyId, onApplicationSuccess }) => {
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleApply = async () => {
    setIsApplying(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5184/api/v1/applications/apply?seekerId=${seekerId}&jobId=${jobId}&companyId=${companyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const applicationData = await response.json();

      setIsApplied(true);

      if (onApplicationSuccess && applicationData) {
        onApplicationSuccess(applicationData);
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError((err as Error).message);
    } finally {
      setIsApplying(false);
    }
  };

  if (isApplied) {
    return (
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md font-medium disabled:bg-gray-300"
        disabled
      >
        Applied Successfully ✓
      </button>
    );
  }

  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-gray-300"
        onClick={handleApply}
        disabled={isApplying}
      >
        {isApplying ? "Submitting..." : "Apply Now"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">Error: {error}. Please try again.</p>}
    </div>
  );
};

export default ApplyButton;
