
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for featured campaigns
const featuredCampaigns = [
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
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="gradient-purple section-padding">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Make a Difference Today
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Create or support fundraising campaigns for causes that matter. Every contribution counts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/campaigns">Browse Campaigns</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-white/20 hover:bg-white/30">
                <Link to="/campaigns/new">Start a Campaign</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featured Campaigns</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These campaigns are making a real impact. Join them in their journey to success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampaigns.map((campaign) => (
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
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/campaigns">View All Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating or supporting a campaign is easy with our simplified process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create a Campaign</h3>
              <p className="text-muted-foreground">
                Set up your fundraising campaign with a compelling story, images, and a clear goal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Story</h3>
              <p className="text-muted-foreground">
                Spread the word about your campaign through social media and your personal network.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Collect Donations</h3>
              <p className="text-muted-foreground">
                Receive secure online donations and track your progress toward your goal.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
