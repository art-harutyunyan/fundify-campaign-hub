
import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock campaign data
const campaignsData = [
  {
    id: "1",
    title: "Support Local Community Garden",
    category: "Environment",
    status: "Active",
    createdAt: "2023-02-15",
    raised: 7260,
    goal: 12000,
    daysLeft: 15,
  },
  {
    id: "2",
    title: "Children's Education Fund",
    category: "Education",
    status: "Active",
    createdAt: "2023-03-10",
    raised: 28450,
    goal: 50000,
    daysLeft: 30,
  },
  {
    id: "3",
    title: "Animal Shelter Renovation",
    category: "Animals",
    status: "Active",
    createdAt: "2023-04-05",
    raised: 14800,
    goal: 20000,
    daysLeft: 5,
  },
  {
    id: "4",
    title: "Medical Treatment Support",
    category: "Health",
    status: "Active",
    createdAt: "2023-04-12",
    raised: 35690,
    goal: 45000,
    daysLeft: 8,
  },
  {
    id: "5",
    title: "Clean Water Initiative",
    category: "Environment",
    status: "Draft",
    createdAt: "2023-04-18",
    raised: 0,
    goal: 25000,
    daysLeft: 0,
  },
  {
    id: "6",
    title: "Arts & Cultural Festival",
    category: "Arts",
    status: "Ended",
    createdAt: "2022-10-15",
    raised: 12500,
    goal: 15000,
    daysLeft: 0,
  },
];

const AdminCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
            <p className="text-muted-foreground">
              Manage all fundraising campaigns on your platform
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>

        <Card>
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Raised</TableHead>
                    <TableHead>Goal</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.title}</TableCell>
                      <TableCell>{campaign.category}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            campaign.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "Draft"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </TableCell>
                      <TableCell>{campaign.createdAt}</TableCell>
                      <TableCell>${campaign.raised.toLocaleString()}</TableCell>
                      <TableCell>${campaign.goal.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="w-full campaign-progress">
                          <div
                            className="campaign-progress-bar"
                            style={{
                              width: `${Math.min(
                                100,
                                (campaign.raised / campaign.goal) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link
                                to={`/campaigns/${campaign.id}`}
                                className="flex items-center w-full"
                              >
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                to={`/admin/campaigns/${campaign.id}`}
                                className="flex items-center w-full"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredCampaigns.length === 0 && (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("All");
                  }}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCampaigns;
