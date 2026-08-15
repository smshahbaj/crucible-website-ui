export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  badge: string;
  category: 'core' | 'architecture' | 'safety' | 'operations';
  description: string;
  promptExample: string;
  verificationQuestion: string;
}

export interface FeatureGate {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  detailedDescription: string;
  metrics: string;
}

export interface DecisionScenario {
  id: string;
  title: string;
  command: string;
  context: string;
  proposal: string;
  evidenceGates: {
    name: string;
    status: 'passed' | 'warning' | 'failed';
    detail: string;
  }[];
  failureModesFound: string[];
  stoppingRuleVerdict: {
    status: 'HALT_ACTION_APPROVED' | 'ESCALATE_TO_DEEP_REVIEW' | 'REJECT_INSUFFICIENT_EVIDENCE';
    evScore: number;
    explanation: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
