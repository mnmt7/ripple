"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Campaign {
  title: string;
  status: string;
  description: string;
  deadline: string;
  isApplied: boolean;
}

export default function Campaign({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [application, setApplication] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(`/api/v1/campaigns/${params.id}`, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setCampaign(data.data.data);
      } catch (err) {
        toast({
          description: "Failed fetching the campaign",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
    fetchCampaign();
  }, []);

  if (!campaign) {
    return null;
  }

  const { title, status, description, deadline } = campaign;

  const handleClick = async () => {
    try {
      const response = await fetch(
        `/api/v1/campaigns/${params.id}/applications`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            application,
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      setApplication("");
      setCampaign((prevCampaign) => ({ ...prevCampaign, isApplied: true }));
    } catch (err) {
      toast({
        description: "Failed submitting the application",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="p-8">
      <div className="border border-gray-300 rounded-md p-4 shadow-md">
        <p className="font-bold mb-4 text-2xl">{title}</p>
        <p className="font-bold mb-4">Status: {status}</p>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-gray-600 text-sm mb-2">Deadline: {deadline}</p>
        {campaign.isApplied ? (
          <p>Your application is under review</p>
        ) : (
          <>
            <Textarea
              placeholder="Tell us why you're great for this campaign"
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleClick}>Apply For Campaign</Button>
          </>
        )}
      </div>
    </div>
  );
}
