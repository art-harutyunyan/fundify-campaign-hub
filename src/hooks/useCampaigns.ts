
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Campaign } from '@/types/campaign';
import { useToast } from '@/components/ui/use-toast';

export function useCampaigns() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Create a new campaign
  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<Campaign | null> => {
    try {
      setLoading(true);
      
      // Upload banner image if provided
      let bannerImageUrl;
      let featuredImageUrl;
      
      // Here you would handle file uploads to Supabase storage
      // For now we'll just assume URLs are provided directly
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          { 
            ...campaignData,
            banner_image_url: bannerImageUrl || campaignData.banner_image_url,
            featured_image_url: featuredImageUrl || campaignData.featured_image_url,
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating campaign:', error);
        toast({
          title: 'Failed to create campaign',
          description: error.message,
          variant: 'destructive'
        });
        return null;
      }
      
      toast({
        title: 'Campaign created',
        description: 'Your campaign has been created successfully.'
      });
      
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Failed to create campaign',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Get all campaigns
  const getCampaigns = async (): Promise<Campaign[]> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching campaigns:', error);
        toast({
          title: 'Failed to fetch campaigns',
          description: error.message,
          variant: 'destructive'
        });
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Get a specific campaign by ID
  const getCampaignById = async (id: string): Promise<Campaign | null> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching campaign:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    createCampaign,
    getCampaigns,
    getCampaignById
  };
}
