import { ConfigType } from '../types';

interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
  lastUpdated: Date;
  status: 'Ready' | 'Processing' | 'Error';
}

interface StockAnswer {
  id: string;
  answer: string;
  questions: string[];
}

interface Scenario {
  id: string;
  name: string;
  whenToApply: string;
  tags?: string[];
  escalationGroup?: string;
  fallbackMessage?: string;
}

interface Field {
  id: string;
  name: string;
  fieldName: string;
  required: string;
}

interface VariantData {
  knowledgeSources: KnowledgeSource[];
  stockAnswers: StockAnswer[];
  scenarios: Scenario[];
  fields: Field[];
}

export const mockData: Record<ConfigType, VariantData> = {
  'Aiden': {
    knowledgeSources: [
      {
        id: '1',
        name: 'Product Documentation',
        type: 'PDF',
        lastUpdated: new Date('2024-03-10'),
        status: 'Ready',
      },
      {
        id: '2',
        name: 'Knowledge Base Articles',
        type: 'Website',
        lastUpdated: new Date('2024-03-12'),
        status: 'Ready',
      },
      {
        id: '3',
        name: 'API Documentation',
        type: 'Website',
        lastUpdated: new Date('2024-03-15'),
        status: 'Processing',
      }
    ],
    stockAnswers: [
      {
        id: '1',
        answer: 'Our business hours are Monday through Friday, 9 AM to 6 PM EST.',
        questions: ['What are your business hours?', 'When are you open?', 'Office hours']
      },
      {
        id: '2',
        answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
        questions: ['How do I reset my password?', 'I forgot my password', 'Password reset']
      },
      {
        id: '3',
        answer: 'Our standard shipping time is 2-3 business days within the continental US.',
        questions: ['How long does shipping take?', 'When will I receive my order?', 'Shipping time']
      }
    ],
    scenarios: [
      {
        id: '1',
        name: 'Technical Issue',
        whenToApply: 'Customer reports a technical problem or error',
        tags: ['technical', 'support'],
        escalationGroup: 'Technical Support',
        fallbackMessage: "I understand you're experiencing technical difficulties. Let me connect you with our technical support team."
      },
      {
        id: '2',
        name: 'Billing Question',
        whenToApply: 'Customer has questions about billing or payments',
        tags: ['billing', 'payment'],
        escalationGroup: 'Billing Support',
        fallbackMessage: "For your security, I'll connect you with our billing team to assist with your payment question."
      },
      {
        id: '3',
        name: 'Sales Opportunity',
        whenToApply: 'Customer shows interest in purchasing or upgrading',
        tags: ['sales', 'opportunity'],
        escalationGroup: 'Sales Team',
        fallbackMessage: "I'll connect you with our sales team who can provide detailed pricing and package information."
      }
    ],
    fields: [
      {
        id: '1',
        name: 'Company',
        fieldName: 'visitorCompany',
        required: 'Always required'
      },
      {
        id: '2',
        name: 'Department',
        fieldName: 'visitorDepartment',
        required: 'Not required'
      },
      {
        id: '3',
        name: 'Issue Category',
        fieldName: 'issueCategory',
        required: 'Always required'
      }
    ]
  },
  'Aiden (Empty)': {
    knowledgeSources: [],
    stockAnswers: [],
    scenarios: [],
    fields: []
  },
  'Bespoke with Aiden': {
    knowledgeSources: [
      {
        id: '1',
        name: 'Support Documentation',
        type: 'Website',
        lastUpdated: new Date('2024-03-14'),
        status: 'Ready',
      },
      {
        id: '2',
        name: 'Training Materials',
        type: 'PDF',
        lastUpdated: new Date('2024-03-15'),
        status: 'Processing',
      }
    ],
    stockAnswers: [
      {
        id: '1',
        answer: 'Our enterprise plan includes unlimited users, priority support, and custom integrations.',
        questions: ['What comes with enterprise?', 'Enterprise plan features', 'Enterprise pricing']
      },
      {
        id: '2',
        answer: 'We offer a 14-day free trial with full access to all features.',
        questions: ['Do you have a trial?', 'Free trial', 'Try before buy']
      }
    ],
    scenarios: [
      {
        id: '1',
        name: 'Enterprise Interest',
        whenToApply: 'Visitor inquires about enterprise features or pricing',
        tags: ['enterprise', 'sales'],
        escalationGroup: 'Enterprise Sales',
        fallbackMessage: "I'll connect you with our enterprise team to discuss your specific needs."
      },
      {
        id: '2',
        name: 'Integration Support',
        whenToApply: 'Questions about API or integrations',
        tags: ['integration', 'technical'],
        escalationGroup: 'Integration Support',
        fallbackMessage: "Let me connect you with our integration specialists."
      }
    ],
    fields: [
      {
        id: '1',
        name: 'Project Size',
        fieldName: 'projectSize',
        required: 'Always required'
      },
      {
        id: '2',
        name: 'Timeline',
        fieldName: 'timeline',
        required: 'Always required'
      },
      {
        id: '3',
        name: 'Budget Range',
        fieldName: 'budgetRange',
        required: 'Not required'
      },
      {
        id: '4',
        name: 'Industry',
        fieldName: 'industry',
        required: 'Not required'
      }
    ]
  },
  'Bespoke without Aiden': {
    knowledgeSources: [],
    stockAnswers: [
      {
        id: '1',
        answer: 'Thank you for your interest. A representative will be with you shortly.',
        questions: ['Greeting', 'Welcome']
      },
      {
        id: '2',
        answer: 'I apologize, but all our representatives are currently assisting other customers. Please leave your contact information and we will get back to you as soon as possible.',
        questions: ['Busy message', 'No agents available']
      }
    ],
    scenarios: [
      {
        id: '1',
        name: 'General Support',
        whenToApply: 'Any support request',
        tags: ['support'],
        escalationGroup: 'Customer Support',
        fallbackMessage: "A support representative will be with you shortly."
      },
      {
        id: '2',
        name: 'Sales Inquiry',
        whenToApply: 'Sales related questions',
        tags: ['sales'],
        escalationGroup: 'Sales Team',
        fallbackMessage: "Our sales team will contact you soon."
      }
    ],
    fields: [
      {
        id: '1',
        name: 'Name',
        fieldName: 'visitorName',
        required: 'Always required'
      },
      {
        id: '2',
        name: 'Email',
        fieldName: 'visitorEmail',
        required: 'Always required'
      },
      {
        id: '3',
        name: 'Phone',
        fieldName: 'visitorPhone',
        required: 'Not required'
      }
    ]
  },
  'Classic Olark': {
    knowledgeSources: [],
    stockAnswers: [
      {
        id: '1',
        answer: 'Thank you for contacting us. A support representative will be with you shortly.',
        questions: ['Greeting']
      },
      {
        id: '2',
        answer: 'Please leave a message and we will get back to you as soon as possible.',
        questions: ['Offline message']
      }
    ],
    scenarios: [
      {
        id: '1',
        name: 'Default Routing',
        whenToApply: 'All chats',
        tags: ['general'],
        escalationGroup: 'Support',
        fallbackMessage: "Please leave a message and we'll get back to you."
      }
    ],
    fields: [
      {
        id: '1',
        name: 'Subject',
        fieldName: 'subject',
        required: 'Always required'
      },
      {
        id: '2',
        name: 'Priority',
        fieldName: 'priority',
        required: 'Always required'
      }
    ]
  }
};