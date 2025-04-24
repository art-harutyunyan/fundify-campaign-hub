
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";

type Donation = {
  id: string;
  campaignName: string;
  amount: number;
  date: string;
};

type Campaign = {
  id: string;
  name: string;
  status: string;
  joined: string;
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }
    
    // This would be replaced with actual data fetching logic
    // For now we're just using mock data
    const mockDonations = [
      { id: "1", campaignName: "Save the Forests", amount: 100, date: "2025-03-20" },
      { id: "2", campaignName: "Clean Water Initiative", amount: 50, date: "2025-04-01" },
      { id: "3", campaignName: "Education Fund", amount: 75, date: "2025-04-15" },
    ];

    const mockCampaigns = [
      { id: "1", name: "Save the Forests", status: "Active", joined: "2025-03-20" },
      { id: "2", name: "Clean Water Initiative", status: "Completed", joined: "2025-04-01" },
    ];

    setDonations(mockDonations);
    setCampaigns(mockCampaigns);
    setLoading(false);
  }, [user, navigate]);

  // If user is not logged in, don't render the profile page
  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button asChild>
            <Link to="/profile/edit">Edit Profile</Link>
          </Button>
        </div>

        <Tabs defaultValue="campaigns">
          <TabsList className="mb-6">
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            <TabsTrigger value="account">Account Details</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Campaigns I've Supported</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading campaigns...</div>
                ) : campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <h3 className="text-lg font-medium">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Joined: {campaign.joined}</p>
                        </div>
                        <div>
                          <span className={`rounded-full px-3 py-1 text-xs ${
                            campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    You haven't supported any campaigns yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>My Donations</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading donations...</div>
                ) : donations.length > 0 ? (
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <h3 className="text-lg font-medium">{donation.campaignName}</h3>
                          <p className="text-sm text-muted-foreground">Date: {donation.date}</p>
                        </div>
                        <div className="font-medium text-green-600">${donation.amount}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    You haven't made any donations yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p>{user?.user_metadata?.full_name || "Not set"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                    <p>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
