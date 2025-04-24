
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminAnalytics = () => {
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50">
              <p className="text-muted-foreground">Analytics dashboard coming soon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50">
              <p className="text-muted-foreground">Campaign metrics coming soon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Donations Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50">
              <p className="text-muted-foreground">Donation statistics coming soon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50">
              <p className="text-muted-foreground">Engagement metrics coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
