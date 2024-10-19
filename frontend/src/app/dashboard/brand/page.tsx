"use client";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import NewCampaignDialog from "@/components/new-campaign-dialog";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: number;
  title: string;
  status: string;
  applications: string;
}

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch("/api/v1/campaigns", {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setCampaigns(data.data.data);
      } catch (err) {
        toast({
          description: "Failed fetching the campaigns",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
    fetchCampaigns();
  }, []);

  return (
    <div className="px-4 mt-8">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-900"> Brand Dashboard</h1>

        <Button onClick={() => setIsOpen(true)}>Create New Campaign</Button>
        <NewCampaignDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
      <main>
        <Table>
          <TableHeader>
            <TableRow className="uppercase">
              <TableHead>Campaign Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium bold">
                  {campaign.title}
                </TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>{campaign.applications}</TableCell>
                <TableCell>
                  <Button variant="outline">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
