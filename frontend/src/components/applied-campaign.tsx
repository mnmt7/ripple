import { Button } from "@/components/ui/button";

export default function AppliedCampaign({
  title,
  isApproved,
}: {
  title: string;
  isApproved: boolean;
}) {
  return (
    <li className="border border-gray-300 rounded-md p-4 shadow-md">
      <div className="font-bold mb-4 flex justify-between">
        <p className="font-bold">{title}</p>
        <p>{isApproved ? "Approved" : "Pending"}</p>
      </div>

      {isApproved && <Button variant="outline">Upload Content</Button>}
    </li>
  );
}
