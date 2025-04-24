
export interface Campaign {
  id?: string;
  name: string;
  title: string;
  subtitle?: string;
  message: string;
  currency: string;
  is_unlimited_goal: boolean;
  goal_amount?: number;
  is_never_ending: boolean;
  start_date: string;
  end_date?: string;
  banner_image_url?: string;
  featured_image_url?: string;
  created_by: string;
  created_at?: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
}
