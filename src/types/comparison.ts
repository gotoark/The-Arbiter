export interface TechStackOption {
  name: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  tradeOffs: string[];
}

export interface ComparisonResult {
  optionA: TechStackOption;
  optionB: TechStackOption;
  recommendation: string;
  useCase: string;
}

export interface ComparisonRequest {
  techStackA: string;
  techStackB?: string;
  useCase?: string;
}