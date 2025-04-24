import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Campaign } from "@/types/campaign";

const CreateCampaignForm = () => {
  const { user } = useAuth();
  const { createCampaign, loading } = useCampaigns();
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubtitle, setCampaignSubtitle] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [campaignCurrency, setCampaignCurrency] = useState("USD");
  const [isUnlimitedGoal, setIsUnlimitedGoal] = useState(false);
  const [campaignGoal, setCampaignGoal] = useState("");
  const [isNeverEnding, setIsNeverEnding] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      console.error("User not logged in");
      return;
    }
    
    try {
      const campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'> = {
        name: campaignName,
        title: campaignTitle,
        subtitle: campaignSubtitle,
        message: campaignMessage,
        currency: campaignCurrency,
        is_unlimited_goal: isUnlimitedGoal,
        goal_amount: isUnlimitedGoal ? undefined : Number(campaignGoal),
        is_never_ending: isNeverEnding,
        start_date: startDate ? startDate.toISOString() : new Date().toISOString(),
        end_date: isNeverEnding || !endDate ? undefined : endDate.toISOString(),
        banner_image_url: bannerImage ? URL.createObjectURL(bannerImage) : undefined,
        featured_image_url: featuredImage ? URL.createObjectURL(featuredImage) : undefined,
        created_by: user.id,
        status: 'draft'
      };
      
      const newCampaign = await createCampaign(campaignData);
      
      if (newCampaign) {
        navigate('/admin/campaigns');
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  
  const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
  ];
  
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  return (
    <AdminLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Create Campaign</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter internal campaign name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="campaignTitle">Campaign Title</Label>
                  <Input
                    id="campaignTitle"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    placeholder="Enter public-facing campaign title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="campaignSubtitle">Campaign Subtitle</Label>
                  <Input
                    id="campaignSubtitle"
                    value={campaignSubtitle}
                    onChange={(e) => setCampaignSubtitle(e.target.value)}
                    placeholder="Enter a brief subtitle"
                  />
                </div>
                
                <div>
                  <Label htmlFor="campaignMessage">Campaign Message</Label>
                  <Textarea
                    id="campaignMessage"
                    value={campaignMessage}
                    onChange={(e) => setCampaignMessage(e.target.value)}
                    placeholder="Enter detailed campaign description"
                    rows={5}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={campaignCurrency} onValueChange={setCampaignCurrency}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="unlimitedGoal"
                    checked={isUnlimitedGoal}
                    onCheckedChange={setIsUnlimitedGoal}
                  />
                  <Label htmlFor="unlimitedGoal">Unlimited Goal</Label>
                </div>
                
                {!isUnlimitedGoal && (
                  <div>
                    <Label htmlFor="campaignGoal">Campaign Goal ({campaignCurrency})</Label>
                    <Input
                      id="campaignGoal"
                      type="number"
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      placeholder="Enter campaign goal amount"
                      required={!isUnlimitedGoal}
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="neverEnding"
                    checked={isNeverEnding}
                    onCheckedChange={setIsNeverEnding}
                  />
                  <Label htmlFor="neverEnding">Never Ending Campaign</Label>
                </div>
                
                <div>
                  <Label>Campaign Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {!isNeverEnding && (
                  <div>
                    <Label>Campaign End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => date < (startDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="bannerImage">Campaign Banner Image</Label>
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="bannerImage"
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 px-4 py-2 hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="text-sm text-gray-600">
                        {bannerImage ? bannerImage.name : "Upload banner image"}
                      </span>
                      <Input
                        id="bannerImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setBannerImage)}
                      />
                    </label>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="featuredImage">Campaign Featured Image</Label>
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="featuredImage"
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 px-4 py-2 hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="text-sm text-gray-600">
                        {featuredImage ? featuredImage.name : "Upload featured image"}
                      </span>
                      <Input
                        id="featuredImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setFeaturedImage)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/campaigns')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Campaign"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateCampaignForm;
