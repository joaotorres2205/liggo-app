export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          phone: string | null;
          password_hash: string | null;
          otp_code_hash: string | null;
          otp_expires: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email: string;
          phone?: string | null;
          password_hash?: string | null;
          otp_code_hash?: string | null;
          otp_expires?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          name?: string | null;
          email?: string;
          phone?: string | null;
          password_hash?: string | null;
          otp_code_hash?: string | null;
          otp_expires?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          description: string | null;
          category: string | null;
          accent: string | null;
          image_url: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          description?: string | null;
          category?: string | null;
          accent?: string | null;
          image_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          icon?: string | null;
          description?: string | null;
          category?: string | null;
          accent?: string | null;
          image_url?: string | null;
          created_at?: string | null;
        };
      };
      providers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          role: string;
          description: string | null;
          specialties: string | null;
          service_ids: string[] | null;
          rating: number | null;
          city: string | null;
          avatar_url: string | null;
          distance: string | null;
          eta: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          role: string;
          description?: string | null;
          specialties?: string | null;
          service_ids?: string[] | null;
          rating?: number | null;
          city?: string | null;
          avatar_url?: string | null;
          distance?: string | null;
          eta?: string | null;
          created_at?: string | null;
        };
        Update: {
          user_id?: string;
          name?: string;
          role?: string;
          description?: string | null;
          specialties?: string | null;
          service_ids?: string[] | null;
          rating?: number | null;
          city?: string | null;
          avatar_url?: string | null;
          distance?: string | null;
          eta?: string | null;
          created_at?: string | null;
        };
      };
      service_requests: {
        Row: {
          id: string;
          user_id: string;
          provider_id: string | null;
          service_id: string;
          description: string | null;
          location: string | null;
          status: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider_id?: string | null;
          service_id: string;
          description?: string | null;
          location?: string | null;
          status?: string;
          created_at?: string | null;
        };
        Update: {
          user_id?: string;
          provider_id?: string | null;
          service_id?: string;
          description?: string | null;
          location?: string | null;
          status?: string;
          created_at?: string | null;
        };
      };
    };
  };
}
