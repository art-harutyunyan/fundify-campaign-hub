
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";

// Mock data for campaigns
const campaignsData = [
  {
    id: "1",
    title: "Support Local Community Garden",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1586280268958-9483002d016a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 7260,
    goal: 12000,
    daysLeft: 15,
  },
  {
    id: "2",
    title: "Children's Education Fund",
    category: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 28450,
    goal: 50000,
    daysLeft: 30,
  },
  {
    id: "3",
    title: "Animal Shelter Renovation",
    category: "Animals",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 14800,
    goal: 20000,
    daysLeft: 5,
  },
  {
    id: "4",
    title: "Medical Treatment Support",
    category: "Health",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 35690,
    goal: 45000,
    daysLeft: 8,
  },
  {
    id: "5",
    title: "Clean Water Initiative",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 18750,
    goal: 25000,
    daysLeft: 20,
  },
  {
    id: "6",
    title: "Arts & Cultural Festival",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 9120,
    goal: 15000,
    daysLeft: 12,
  },
];

// Categories for filter
const categories = [
  "All Categories",
  "Environment",
  "Education",
  "Animals",
  "Health",
  "Arts",
];

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter campaigns based on search term and category
  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <section className="bg-purple-50 py-10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Campaigns</h1>
            <p className="text-muted-foreground mb-6">
              Find and support fundraising campaigns that align with your values and interests.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button asChild>
              <Link to="/campaigns/new">Start a Campaign</Link>
            </Button>
          </div>

          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="card-hover overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {campaign.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {campaign.daysLeft} days left
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="campaign-progress">
                        <div 
                          className="campaign-progress-bar" 
                          style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">${campaign.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/campaigns/${campaign.id}`}>View Campaign</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Campaigns;
