
import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const AdminSettings = () => {
  const [siteName, setSiteName] = useState("levcharity");
  const [siteTagline, setSiteTagline] = useState("Empowering change through giving");
  const [enableDonations, setEnableDonations] = useState(true);
  const [requireAccountForDonation, setRequireAccountForDonation] = useState(false);
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true);
  
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={siteName} 
                    onChange={(e) => setSiteName(e.target.value)} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="siteTagline">Site Tagline</Label>
                  <Input 
                    id="siteTagline" 
                    value={siteTagline} 
                    onChange={(e) => setSiteTagline(e.target.value)} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription" 
                    placeholder="Enter a description for your site" 
                    rows={4} 
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Send email notifications for new donations and campaign updates
                    </div>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={enableEmailNotifications} 
                    onCheckedChange={setEnableEmailNotifications} 
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableDonations">Enable Donations</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow visitors to make donations on your site
                    </div>
                  </div>
                  <Switch 
                    id="enableDonations" 
                    checked={enableDonations} 
                    onCheckedChange={setEnableDonations} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireAccount">Require Account for Donation</Label>
                    <div className="text-sm text-muted-foreground">
                      Require users to create an account before donating
                    </div>
                  </div>
                  <Switch 
                    id="requireAccount" 
                    checked={requireAccountForDonation} 
                    onCheckedChange={setRequireAccountForDonation} 
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
