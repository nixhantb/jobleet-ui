import { useEffect, useState } from "react";

interface Application {
  id: string;
  position: string;
  company: string;
  companyId: string;
  status: string;
}

interface RawApplicationData {
  id: string;
  jobs?: { jobTitle?: string };
  company?: { companyName?: string };
  companyId: string;
  status?: { statusName?: string };
}

const mapStatusToUI = (apiStatus: string): string => {
  const statusMap: Record<string, string> = {
    Active: "pending",
    InReview: "reviewing",
    Approved: "accepted",
    Rejected: "rejected",
  };

  return statusMap[apiStatus] ?? "pending";
};

export function useApplications(seekerId: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformApplicationData = (applicationData: RawApplicationData): Application => {
    return {
      id: applicationData.id,
      position: applicationData.jobs?.jobTitle ?? "Unk Position",
      company: applicationData.company?.companyName ?? "Unk Name",
      companyId: applicationData.companyId,
      status: mapStatusToUI(applicationData.status?.statusName ?? "Active"),
    };
  };

  const fetchApplications = async () => {
    if (!seekerId) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5184/api/v1/applications`);

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data: RawApplicationData[] = await response.json();
      const formattedApplications = data.map(transformApplicationData);

      setApplications(formattedApplications);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const addApplication = (applicationData: RawApplicationData) => {
    const formattedApplication = transformApplicationData(applicationData);

    setApplications((prevApplications) => {
      const existingIndex = prevApplications.findIndex((app) => app.id === formattedApplication.id);

      if (existingIndex >= 0) {
        const updatedApplications = [...prevApplications];
        updatedApplications[existingIndex] = formattedApplication;
        return updatedApplications;
      } else {
        return [formattedApplication, ...prevApplications];
      }
    });
  };

  useEffect(() => {
    if (seekerId) {
      fetchApplications();
    }
  }, [seekerId]);

  return { applications, loading, error, fetchApplications, addApplication };
}
