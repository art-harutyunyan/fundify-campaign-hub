
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";

// Mock campaign data
const campaignsData = [
  {
    id: "1",
    title: "Support Local Community Garden",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1586280268958-9483002d016a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    raised: 7260,
    goal: 12000,
    daysLeft: 15,
    creator: "Green Community Initiative",
    creatorImage: "https://images.unsplash.com/photo-1523626752472-b55a628f1517?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    createdAt: "2023-02-15",
    description: `
      <p>Our local community garden has been a cornerstone of our neighborhood for over 5 years, providing fresh produce and a space for community gatherings. However, we're now facing challenges with our irrigation system and need to upgrade our tools and equipment.</p>
      <p>With your support, we plan to:</p>
      <ul>
        <li>Install a new water-efficient irrigation system</li>
        <li>Purchase sustainable gardening tools</li>
        <li>Build accessible garden beds for seniors and people with disabilities</li>
        <li>Establish a seed library for the community</li>
      </ul>
      <p>The garden serves over 200 families in our area and donates 30% of its produce to local food banks. Your contribution will help ensure we can continue to serve our community for years to come.</p>
    `,
    updates: [
      {
        id: "1",
        date: "2023-04-10",
        title: "Halfway to our goal!",
        content: "Thanks to your generous support, we've reached 50% of our fundraising goal! We've already purchased some new tools and are planning the irrigation system upgrade."
      },
      {
        id: "2",
        date: "2023-03-01",
        title: "Garden planning session",
        content: "We held a community planning session to discuss the garden improvements. Over 30 community members attended and provided valuable input."
      }
    ],
    comments: [
      {
        id: "1",
        name: "Sarah Johnson",
        date: "2023-04-15",
        content: "This garden has been amazing for my family. Happy to support!"
      },
      {
        id: "2",
        name: "Michael Rodriguez",
        date: "2023-04-08",
        content: "The community events at the garden are always so wonderful. Looking forward to the improvements."
      }
    ]
  },
];

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = campaignsData.find(c => c.id === id);

  if (!campaign) {
    return (
      <MainLayout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
          <p className="mb-8">The campaign you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/campaigns">Browse Campaigns</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const percentRaised = Math.min(100, (campaign.raised / campaign.goal) * 100);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-auto object-cover"
              />
            </div>

            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
              </TabsContent>
              
              <TabsContent value="updates">
                {campaign.updates.length > 0 ? (
                  <div className="space-y-6">
                    {campaign.updates.map(update => (
                      <div key={update.id} className="border-b pb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-bold">{update.title}</h3>
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                        <p>{update.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No updates yet.</p>
                )}
              </TabsContent>
              
              <TabsContent value="comments">
                {campaign.comments.length > 0 ? (
                  <div className="space-y-6">
                    {campaign.comments.map(comment => (
                      <div key={comment.id} className="border-b pb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold">{comment.name}</h3>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No comments yet.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{campaign.title}</h1>
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src={campaign.creatorImage} 
                    alt={campaign.creator}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">
                    Created by <span className="font-medium">{campaign.creator}</span>
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="campaign-progress">
                    <div 
                      className="campaign-progress-bar" 
                      style={{ width: `${percentRaised}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">${campaign.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{percentRaised.toFixed(0)}%</span>
                    <span className="text-muted-foreground">{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full text-base py-6" size="lg">
                    Donate Now
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Make a Donation</h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[10, 25, 50, 100, 250, 500].map((amount) => (
                    <Button 
                      key={amount} 
                      variant="outline" 
                      className="text-center"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label className="text-sm font-medium">Or enter custom amount</label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="mt-1"
                    min="1"
                  />
                </div>
                
                <Button className="w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CampaignDetail;
