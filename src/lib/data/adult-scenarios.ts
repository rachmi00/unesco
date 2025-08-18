import { AdultScenario } from "@/types/scenarios"

export const adultScenarios: AdultScenario[] = [
  {
    id: 1,
    category: "workplace",
    title: "Corporate Hiring Committee - Regional Bias",
    context:
      "During a senior management hiring committee meeting, a department head from Douala makes this statement about candidates from the Northwest Region:",
    situation:
      "\"We need to be careful about hiring too many of these Les Bamenda people. They tend to form cliques, always speak their local languages during work hours, and frankly, they're better suited for manual labor than executive positions. Let's focus on candidates who understand our corporate culture.\"",
    stakeholders: [
      "Qualified Candidates",
      "Company Reputation",
      "Existing Employees",
      "Legal Compliance",
      "Shareholders",
      "Regional Communities",
    ],
    legalContext:
      "Cameroon's Labor Code Article 14 explicitly prohibits employment discrimination based on regional origin. Companies can face legal action and financial penalties for discriminatory hiring practices.",
    historicalContext:
      "'Les Bamenda' is a derogatory term historically used to refer to domestic workers from the Northwest, now applied to all Anglophones. This stereotype has contributed to systemic workplace discrimination and regional tensions.",
    question: "As a committee member, how do you address this discriminatory statement?",
    options: [
      {
        text: "Stay silent to maintain professional relationships and avoid conflict",
        impact: "negative",
        consequences: [
          "Discriminatory hiring practices continue",
          "Company exposed to legal liability",
          "Qualified candidates excluded unfairly",
          "Workplace culture remains exclusionary",
        ],
        explanation:
          "Professional silence in the face of discrimination makes you complicit and exposes the company to significant legal and reputational risks.",
        legalNote:
          "Failure to report workplace discrimination can make individuals and companies liable under Cameroon's anti-discrimination laws.",
        professionalRisk:
          "Silent complicity in discrimination can damage your professional reputation and career prospects.",
      },
      {
        text: "Privately discuss concerns with HR after the meeting",
        impact: "neutral",
        consequences: [
          "Issue addressed through proper channels",
          "Immediate discrimination continues",
          "Limited impact on current decision",
          "Professional relationships preserved",
        ],
        explanation:
          "While following proper channels is important, delayed action allows immediate discrimination to continue and may not prevent current hiring bias.",
        legalNote:
          "HR departments have legal obligations to address discrimination complaints promptly and thoroughly.",
      },
      {
        text: "Immediately challenge the statement citing legal requirements and company values",
        impact: "positive",
        consequences: [
          "Discrimination stopped immediately",
          "Legal compliance demonstrated",
          "Company values upheld",
          "Educational moment created",
        ],
        explanation:
          "Direct intervention prevents immediate discrimination and demonstrates leadership in upholding both legal requirements and ethical standards.",
        legalNote:
          "Actively preventing workplace discrimination demonstrates good faith compliance with labor laws and reduces legal liability.",
      },
      {
        text: "Document the statement, report to authorities, and propose diversity training for leadership",
        impact: "positive",
        consequences: [
          "Systematic approach to discrimination",
          "Legal protection established",
          "Long-term culture change initiated",
          "Professional standards elevated",
        ],
        explanation:
          "Comprehensive action addresses both immediate discrimination and systemic issues, providing maximum protection for all stakeholders.",
        legalNote:
          "Documentation and reporting create legal protection while proactive training demonstrates commitment to compliance.",
        professionalRisk:
          "Taking principled stands on discrimination enhances long-term professional credibility and leadership reputation.",
      },
    ],
  },  {
 
   id: 2,
    category: "business",
    title: "Business Partnership Negotiation - Ethnic Stereotypes",
    context:
      "During a high-stakes business negotiation in Yaoundé, your potential partner makes disparaging comments about Bamileke business practices:",
    situation:
      "\"I've heard these Tontinards are very crafty in business. They're obsessed with money and will do anything to get ahead - you can't trust them to honor agreements. Maybe we should look for partners from more reliable ethnic backgrounds who understand proper business ethics.\"",
    stakeholders: [
      "Business Partners",
      "Economic Development",
      "Ethnic Communities",
      "Market Competition",
      "Professional Networks",
      "Regional Economy",
    ],
    legalContext:
      "Cameroon's Commercial Code prohibits discrimination in business partnerships based on ethnic origin. Such practices can void contracts and result in legal penalties.",
    historicalContext:
      "'Tontinards' refers to the Bamileke community's traditional savings associations (tontines), but is used as a slur implying greed and untrustworthiness. This stereotype ignores the Bamileke community's significant contributions to Cameroon's economy.",
    question: "How do you respond to this ethnic stereotyping in a business context?",
    options: [
      {
        text: "Agree to avoid potential business complications",
        impact: "negative",
        consequences: [
          "Ethnic discrimination reinforced",
          "Economic opportunities restricted unfairly",
          "Professional reputation damaged",
          "Legal liability created",
        ],
        explanation:
          "Agreeing with ethnic stereotypes in business contexts perpetuates discrimination and can expose you to legal liability while damaging professional credibility.",
        legalNote:
          "Participating in discriminatory business practices violates commercial law and can result in contract nullification and penalties.",
        professionalRisk:
          "Discriminatory business practices can lead to professional sanctions and exclusion from future opportunities.",
      },
      {
        text: "Redirect the conversation to focus on individual qualifications and track records",
        impact: "neutral",
        consequences: [
          "Immediate stereotyping avoided",
          "Focus shifted to merit",
          "Underlying bias unaddressed",
          "Professional relationship maintained",
        ],
        explanation:
          "Redirecting avoids immediate discrimination but doesn't address the underlying bias or educate the partner about the harm of stereotyping.",
        legalNote:
          "While not actively discriminatory, failing to address bias may not provide full legal protection in discrimination cases.",
      },
      {
        text: "Challenge the stereotypes with facts about successful Bamileke businesses and entrepreneurs",
        impact: "positive",
        consequences: [
          "Stereotypes directly countered",
          "Educational opportunity created",
          "Professional standards upheld",
          "Inclusive business culture promoted",
        ],
        explanation:
          "Factual challenges to stereotypes help educate partners while demonstrating professional integrity and commitment to fair business practices.",
        legalNote:
          "Actively countering discrimination demonstrates good faith compliance with anti-discrimination laws in business.",
      },
      {
        text: "Terminate negotiations and report discriminatory practices to relevant business authorities",
        impact: "positive",
        consequences: [
          "Clear stand against discrimination",
          "Professional integrity maintained",
          "Legal protection established",
          "Industry standards elevated",
        ],
        explanation:
          "Taking a principled stand against discrimination, even at business cost, demonstrates integrity and helps establish higher professional standards.",
        legalNote:
          "Refusing to participate in discriminatory business practices provides strong legal protection and demonstrates ethical compliance.",
        professionalRisk:
          "Standing against discrimination enhances long-term professional reputation and attracts ethical business partners.",
      },
    ],
  },
]