"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AvailableCampaign({
  id,
  title,
  description,
  deadline,
}: {
  id: string;
  title: string;
  description: string;
  deadline: string;
}) {
  const router = useRouter();
  return (
    <li className="border border-gray-300 rounded-md p-4 shadow-md">
      <p className="font-bold mb-4">{title}</p>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-gray-600 text-sm mb-2">Deadline: {deadline}</p>
      <Button onClick={() => router.push(`/campaigns/${id}`)}>Apply</Button>
    </li>
  );
}
