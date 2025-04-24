
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Campaign } from "@/types/campaign";
import { useCampaigns } from "@/hooks/useCampaigns";

const AdminCampaigns = () => {
  const { getCampaigns, loading } = useCampaigns();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };
    
    fetchCampaigns();
  }, [getCampaigns]);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <Button asChild>
            <Link to="/admin/campaigns/create">New Campaign</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading campaigns...</div>
            ) : campaigns.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Goal</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.title}</TableCell>
                      <TableCell>
                        <span className={`rounded-full px-2 py-1 text-xs ${getStatusBadgeClass(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {campaign.is_unlimited_goal
                          ? "Unlimited"
                          : `${campaign.currency} ${campaign.goal_amount}`}
                      </TableCell>
                      <TableCell>
                        {new Date(campaign.start_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {campaign.is_never_ending
                          ? "Never Ending"
                          : campaign.end_date
                          ? new Date(campaign.end_date).toLocaleDateString()
                          : "Not set"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No campaigns found.</p>
                <p className="mt-2">
                  <Link to="/admin/campaigns/create" className="text-blue-600 hover:underline">
                    Create your first campaign
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaigns;
