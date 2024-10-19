"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import AppliedCampaign from "@/components/applied-campaign";
import AvailableCampaign from "@/components/available-campaign";

// const availableCampaigns = [
//   {
//     id: 1,
//     title: "Campaign 1",
//     description: "Campaign 1 description",
//     deadline: "2023-04-01",
//   },

//   {
//     id: 2,
//     title: "Campaign 2",
//     description: "Campaign 2 description",
//     deadline: "2023-04-15",
//   },
//   {
//     id: 3,
//     title: "Campaign 3",
//     description: "Campaign 3 description",
//     deadline: "2023-05-01",
//   },
// ];

const appliedCampaigns = [
  {
    id: 1,
    title: "Campaign 1",
    isApproved: true,
  },
  {
    id: 3,
    title: "Campaign 3",
    isApproved: false,
  },
];

interface AvailableCampaign {
  _id: string;
  title: string;
  description: string;
  deadline: string;
}

interface AppliedCampaign {
  id: string;
  title: string;
  isApproved: boolean;
}

export default function DashboardPage() {
  const [availableCampaigns, setAvailableCampaigns] = useState<
    AvailableCampaign[]
  >([]);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchAvailableCampaigns() {
      try {
        const response = await fetch("/api/v1/campaigns", {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setAvailableCampaigns(data.data.data);
      } catch (err) {
        toast({
          description: "Failed fetching the campaigns",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
    fetchAvailableCampaigns();
  }, []);

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-bold">Creator Dashboard</h1>
      <div>
        <h2 className="text-xl font-bold my-4">Available Campaigns</h2>
        <ul className="flex flex-col gap-4">
          {availableCampaigns.map(({ _id, title, description, deadline }) => (
            <AvailableCampaign
              id={_id}
              title={title}
              description={description}
              deadline={deadline}
            />
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold my-4">Applied Campaigns</h2>
        <ul className="flex flex-col gap-4">
          {appliedCampaigns.map(({ title, isApproved }) => (
            <AppliedCampaign title={title} isApproved={isApproved} />
          ))}
        </ul>
      </div>
    </div>
  );
}
