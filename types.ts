
export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Branding' | 'Marketing' | 'Protection' | 'Audit';
  features: string[];
  imageUrl: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}
