import { AdultScenario } from "@/types/scenarios";

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
          "A qualified Anglophone engineer loses the job opportunity and struggles to feed his family",
          "Company faces a 50 million CFA lawsuit from discrimination victims",
          "Talented employees from Northwest resign, citing hostile work environment",
          "Your children grow up thinking discrimination is acceptable behavior",
        ],
        explanation:
          "Your silence means real families suffer. When discrimination goes unchallenged, it destroys lives and careers while exposing everyone to serious legal consequences.",
        legalNote:
          "Failure to report workplace discrimination can make individuals and companies liable under Cameroon's anti-discrimination laws.",
        professionalRisk:
          "Silent complicity in discrimination can destroy your professional reputation when the truth inevitably comes out.",
      },
      {
        text: "Privately discuss concerns with HR after the meeting",
        impact: "neutral",
        consequences: [
          "The current candidate is still rejected due to bias",
          "HR creates a paper trail but discrimination continues",
          "Other committee members don't learn why their views are wrong",
          "You avoid immediate confrontation but enable ongoing harm",
        ],
        explanation:
          "While HR involvement is good, delayed action means someone still loses their opportunity today. Half-measures often lead to half-solutions.",
        legalNote:
          "HR departments have legal obligations to address discrimination complaints promptly and thoroughly.",
      },
      {
        text: "Immediately challenge the statement citing legal requirements and company values",
        impact: "positive",
        consequences: [
          "The qualified candidate gets fair consideration and potentially the job",
          "Committee members learn about legal risks and change their approach",
          "Company culture begins shifting toward true inclusivity",
          "You become known as a leader who stands for what's right",
        ],
        explanation:
          "Your courage to speak up immediately protects real people and creates lasting change. This is how discrimination actually gets stopped.",
        legalNote:
          "Actively preventing workplace discrimination demonstrates good faith compliance with labor laws and reduces legal liability.",
      },
      {
        text: "Document the statement, report to authorities, and propose diversity training for leadership",
        impact: "positive",
        consequences: [
          "Systematic change prevents future discrimination against many candidates",
          "Company becomes a model for fair employment practices",
          "Leadership team gains tools to recognize and stop their own biases",
          "Your comprehensive action protects countless future job seekers",
        ],
        explanation:
          "Taking complete action creates systemic change that protects not just one person, but everyone who comes after. This is true leadership.",
        legalNote:
          "Documentation and reporting create legal protection while proactive training demonstrates commitment to compliance.",
        professionalRisk:
          "Taking principled stands on discrimination enhances long-term professional credibility and leadership reputation.",
      },
    ],
  },
  {
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
          "A successful Bamileke business owner loses a major contract and lays off 20 employees",
          "Your reputation in the business community becomes toxic when word spreads",
          "Ethnic tensions increase as discrimination becomes normalized in business",
          "You face legal action for participating in discriminatory practices",
        ],
        explanation:
          "Agreeing with hate makes you part of the problem. Real businesses fail and real families lose their livelihoods because of these choices.",
        legalNote:
          "Participating in discriminatory business practices violates commercial law and can result in contract nullification and penalties.",
        professionalRisk:
          "Discriminatory business practices will destroy your professional reputation once they become public knowledge.",
      },
      {
        text: "Redirect the conversation to focus on individual qualifications and track records",
        impact: "neutral",
        consequences: [
          "Current partnership may proceed on merit but bias remains unchallenged",
          "Partner continues discriminating in other business dealings",
          "You avoid confrontation but miss opportunity to create change",
          "Systemic discrimination in business networks continues",
        ],
        explanation:
          "Redirecting helps in the moment but doesn't address the deeper problem. The hate continues to spread when we don't directly confront it.",
        legalNote:
          "While not actively discriminatory, failing to address bias may not provide full legal protection in discrimination cases.",
      },
      {
        text: "Challenge the stereotypes with facts about successful Bamileke businesses and entrepreneurs",
        impact: "positive",
        consequences: [
          "Partner's perspective changes, leading to more inclusive business practices",
          "Successful businesses get fair opportunities based on merit",
          "Your reputation grows as someone who promotes fairness and facts",
          "Other business leaders learn from your example",
        ],
        explanation:
          "Education and facts can change minds and hearts. Your courage to speak truth helps build a more fair business environment for everyone.",
        legalNote:
          "Actively countering discrimination demonstrates good faith compliance with anti-discrimination laws in business.",
      },
      {
        text: "Terminate negotiations and report discriminatory practices to relevant business authorities",
        impact: "positive",
        consequences: [
          "You maintain your integrity and attract ethical business partners",
          "Discriminatory practices get investigated and stopped",
          "Business community learns that hate speech has serious consequences",
          "You become known as a leader who puts principles before profit",
        ],
        explanation:
          "Sometimes walking away is the strongest statement. Your principled stand protects others and elevates business standards for everyone.",
        legalNote:
          "Refusing to participate in discriminatory business practices provides strong legal protection and demonstrates ethical compliance.",
        professionalRisk:
          "Standing against discrimination enhances long-term professional reputation and attracts ethical business partners.",
      },
    ],
  },
  {
    id: 3,
    category: "media",
    title: "Radio Talk Show - Gender Discrimination",
    context:
      "You're hosting a popular morning radio show when a caller makes discriminatory statements about women in leadership:",
    situation:
      "Caller: \"Women are too emotional to be good leaders! They should focus on taking care of their families instead of trying to run companies or be politicians. A woman's place is in the kitchen, not in the boardroom!\"",
    stakeholders: [
      "Radio Listeners",
      "Women Professionals",
      "Young Girls",
      "Business Community",
      "Media Credibility",
      "Gender Equality",
    ],
    legalContext:
      "Cameroon's Constitution and Labor Code prohibit gender discrimination. Broadcasting discriminatory content violates media laws and can result in station penalties.",
    historicalContext:
      "Gender stereotypes in media have historically limited women's opportunities and reinforced harmful attitudes that prevent economic and social progress.",
    question: "How do you handle this discriminatory call on live radio?",
    options: [
      {
        text: "Let the caller continue because it generates listener engagement",
        impact: "negative",
        consequences: [
          "Young girls listening lose confidence in pursuing leadership careers",
          "Workplace discrimination against women increases in your community",
          "Your radio station faces complaints and potential license issues",
          "Talented women avoid your show, reducing audience diversity",
        ],
        explanation:
          "Allowing gender discrimination on air reinforces harmful stereotypes and limits opportunities for half your population. This damages your community's economic potential.",
        legalNote:
          "Broadcasting discriminatory content violates media laws and can result in fines and license restrictions.",
        professionalRisk:
          "Promoting gender discrimination will damage your reputation and limit your career opportunities.",
      },
      {
        text: "Cut the call short without addressing the discriminatory content",
        impact: "neutral",
        consequences: [
          "Discriminatory message is stopped but listeners don't understand why",
          "Some audience members may agree with the caller's views",
          "You avoid controversy but miss chance to educate your community",
          "Harmful gender stereotypes continue unchallenged",
        ],
        explanation:
          "While stopping discrimination is good, silence can be interpreted as agreement. Your audience needs to understand why gender equality matters.",
        legalNote:
          "Cutting discriminatory content prevents violations but may not demonstrate full professional responsibility.",
      },
      {
        text: "Cut the call and explain why gender equality benefits everyone",
        impact: "positive",
        consequences: [
          "Listeners learn about successful women leaders and their contributions",
          "Your radio station becomes known for promoting equality and progress",
          "Young girls feel encouraged to pursue their dreams",
          "Business community recognizes the value of gender diversity",
        ],
        explanation:
          "Educating your audience about gender equality helps create a more prosperous society where everyone can contribute their talents.",
        legalNote:
          "Promoting gender equality demonstrates compliance with anti-discrimination laws and professional standards.",
      },
      {
        text: "End the call, educate listeners, and feature successful women leaders in upcoming shows",
        impact: "positive",
        consequences: [
          "Your show becomes a platform for showcasing women's achievements",
          "Community attitudes toward women in leadership begin changing",
          "Young women gain role models and mentors through your programming",
          "You win awards for promoting gender equality and social progress",
        ],
        explanation:
          "Turning discrimination into education creates lasting change. Your comprehensive approach helps build a society where everyone can succeed.",
        legalNote:
          "Proactive programming for gender equality demonstrates exemplary compliance with equality laws and social responsibility.",
        professionalRisk:
          "Leading gender equality initiatives enhances your reputation and creates new career opportunities.",
      },
    ],
  },
  {
    id: 4,
    category: "media",
    title: "Facebook Group Admin - Disability Discrimination",
    context:
      "You admin a popular Facebook group with 50,000 members discussing community development when discriminatory posts appear:",
    situation:
      "Post: \"Why are we wasting money building ramps and special facilities for disabled people? They can't contribute meaningfully to society anyway. Let's focus our resources on normal people who can actually work and be productive!\"",
    stakeholders: [
      "Group Members",
      "People with Disabilities",
      "Community Development",
      "Platform Safety",
      "Inclusive Society",
      "Social Progress",
    ],
    legalContext:
      "Cameroon's disability rights laws and international conventions prohibit discrimination against people with disabilities. Online platforms must moderate discriminatory content.",
    historicalContext:
      "People with disabilities have historically faced systemic discrimination and exclusion, despite their valuable contributions to society when given equal opportunities.",
    question: "How do you respond to this discriminatory post in your Facebook group?",
    options: [
      {
        text: "Leave the post up because it generates discussion about resource allocation",
        impact: "negative",
        consequences: [
          "People with disabilities in your community feel unwelcome and excluded",
          "Discriminatory attitudes spread and become normalized",
          "Facebook may shut down your group for allowing hate speech",
          "Community development efforts become less inclusive and effective",
        ],
        explanation:
          "Allowing discrimination against people with disabilities perpetuates harmful attitudes and wastes human potential. Everyone deserves equal opportunities to contribute.",
        legalNote:
          "Failing to moderate discriminatory content against people with disabilities violates platform policies and disability rights laws.",
        professionalRisk:
          "Allowing disability discrimination will damage your reputation and potentially lead to legal issues.",
      },
      {
        text: "Delete the post quietly without explanation",
        impact: "neutral",
        consequences: [
          "Immediate discriminatory content is removed but poster may try again",
          "Group members don't understand why the post was removed",
          "You avoid confrontation but miss educational opportunity",
          "Similar discriminatory attitudes persist without being challenged",
        ],
        explanation:
          "While removing discriminatory content helps, education is needed to change attitudes and create lasting inclusion for people with disabilities.",
        legalNote:
          "Removing discriminatory content shows good faith moderation but education may be needed for full compliance.",
      },
      {
        text: "Delete the post and explain the value and rights of people with disabilities",
        impact: "positive",
        consequences: [
          "Group members learn about disability rights and the importance of inclusion",
          "People with disabilities feel supported and valued in the community",
          "Community development becomes more inclusive and comprehensive",
          "Other group admins learn from your example of inclusive moderation",
        ],
        explanation:
          "Education about disability rights helps create a more inclusive community where everyone can participate and contribute their unique talents.",
        legalNote:
          "Promoting disability rights and inclusion demonstrates compliance with anti-discrimination laws and inclusive development principles.",
      },
      {
        text: "Remove post, ban user, create educational content about disability inclusion, and invite disability advocates",
        impact: "positive",
        consequences: [
          "Your group becomes a model for inclusive community development",
          "People with disabilities gain a platform to share their experiences and needs",
          "Community projects become more accessible and benefit everyone",
          "You become recognized as a leader in promoting inclusive development",
        ],
        explanation:
          "Comprehensive action creates lasting change by education and including people with disabilities as equal partners in community development.",
        legalNote:
          "Proactive disability inclusion demonstrates exemplary compliance with disability rights laws and inclusive development principles.",
        professionalRisk:
          "Leading disability inclusion efforts enhances your reputation and creates opportunities in community development and advocacy.",
      },
    ],
  },
  {
    id: 5,
    category: "media",
    title: "WhatsApp Group - Spreading False Rumors",
    context:
      "You're in a neighborhood WhatsApp group when someone shares a false story designed to create ethnic hatred:",
    situation:
      "Message: \"URGENT! My cousin saw Fulani herders poisoning water wells near Bamenda. They want to kill all Christians! Share this warning with everyone you know. Don't drink water from public sources!\"",
    stakeholders: [
      "Community Members",
      "Fulani Herders",
      "Public Health",
      "Social Harmony",
      "Local Authorities",
      "Religious Groups",
    ],
    legalContext:
      "Spreading false information that causes public alarm or incites violence is illegal in Cameroon. WhatsApp groups are not exempt from cybercrime laws.",
    historicalContext:
      "False rumors about water poisoning have triggered violent attacks against Fulani communities across West Africa, resulting in hundreds of deaths.",
    question: "How do you respond to this dangerous false rumor in your WhatsApp group?",
    options: [
      {
        text: "Forward the message to other groups to warn more people",
        impact: "negative",
        consequences: [
          "Panic spreads across multiple communities and innocent Fulani families are attacked",
          "Children are pulled from school and communities become paralyzed with fear",
          "You face legal prosecution for spreading false information that caused violence",
          "Trust between religious and ethnic communities is destroyed for years",
        ],
        explanation:
          "Spreading false rumors makes you responsible for the panic and violence that follows. These lies have killed hundreds of innocent people across Africa.",
        legalNote:
          "Forwarding false information that causes public panic violates cybercrime laws and makes you criminally liable.",
        professionalRisk:
          "Spreading dangerous misinformation destroys your credibility and can lead to criminal prosecution.",
      },
      {
        text: "Ignore the message and don't respond to avoid getting involved",
        impact: "negative",
        consequences: [
          "False rumor continues spreading and may lead to violence against innocent people",
          "Group members assume the rumor is true because no one challenges it",
          "Your silence is seen as agreement with the dangerous message",
          "Community tensions escalate because truth isn't shared",
        ],
        explanation:
          "Your silence lets dangerous lies spread unchecked. When false rumors cause violence, your failure to speak up makes you partly responsible.",
        legalNote:
          "Failing to challenge false information in groups where you have influence may create legal liability if violence results.",
      },
      {
        text: "Ask for proof and remind group about checking facts before sharing",
        impact: "positive",
        consequences: [
          "Group members start questioning suspicious messages before sharing them",
          "False information is stopped before it can cause panic or violence",
          "Your community develops better media literacy and critical thinking",
          "Innocent communities are protected from false accusations",
        ],
        explanation:
          "Teaching people to think critically about information they receive helps protect everyone from dangerous rumors and builds a smarter community.",
        legalNote:
          "Promoting fact-checking and media literacy demonstrates responsible digital citizenship and helps prevent legal issues.",
      },
      {
        text: "Debunk the rumor with facts, report to authorities, educate group about rumor dangers",
        impact: "positive",
        consequences: [
          "Dangerous false information is completely neutralized before causing harm",
          "Law enforcement can investigate and prevent planned violence",
          "Your group becomes known for fighting misinformation and protecting all community members",
          "Other WhatsApp groups ask you to help them fight dangerous rumors",
        ],
        explanation:
          "Complete action saves lives by stopping dangerous lies and educating people. Your leadership in fighting misinformation protects entire communities.",
        legalNote:
          "Actively combating false information and reporting to authorities provides maximum legal protection and civic responsibility.",
        professionalRisk:
          "Leading the fight against misinformation establishes you as a trusted community voice and enhances your reputation.",
      },
    ],
  },
  {
    id: 6,
    category: "education",
    title: "University Campus - Religious Discrimination",
    context:
      "You're a university student leader when tensions arise between Christian and Muslim student groups over campus facilities:",
    situation:
      "\"These Muslim students are trying to take over our campus! They want special prayer times, halal food options, and now they're demanding a mosque. This is a Christian nation - they should go pray somewhere else if they don't like our traditions!\"",
    stakeholders: [
      "Muslim Students",
      "Christian Students",
      "University Administration",
      "Religious Communities",
      "Campus Harmony",
      "Educational Environment",
    ],
    legalContext:
      "Cameroon's Constitution guarantees freedom of religion and prohibits religious discrimination. Universities must provide equal treatment to all religious groups.",
    historicalContext:
      "Religious tensions on campuses have sometimes escalated to conflicts that disrupt education and violate students' fundamental rights to religious practice.",
    question: "How do you address this religious discrimination as a student leader?",
    options: [
      {
        text: "Support the statement to maintain Christian student support",
        impact: "negative",
        consequences: [
          "Muslim students face harassment and some drop out of university",
          "University faces legal action for allowing religious discrimination",
          "Campus becomes divided along religious lines with frequent conflicts",
          "Your leadership becomes associated with intolerance and discrimination",
        ],
        explanation:
          "Supporting religious discrimination destroys the educational environment for everyone. Real students lose their right to education when hate is allowed to flourish.",
        legalNote:
          "Supporting religious discrimination violates constitutional rights and can result in legal consequences for both individuals and institutions.",
        professionalRisk:
          "Leading religious discrimination will permanently damage your reputation and future career prospects.",
      },
      {
        text: "Stay neutral and avoid taking sides in religious matters",
        impact: "neutral",
        consequences: [
          "Religious tensions continue to simmer without resolution",
          "Muslim students feel unsupported and may leave campus",
          "Christian students interpret your silence as agreement",
          "Problems escalate because leadership doesn't provide clear direction",
        ],
        explanation:
          "Neutrality in the face of discrimination often helps the discriminator. Real leadership means protecting everyone's rights, not avoiding difficult conversations.",
        legalNote:
          "Student leaders have responsibilities to promote equality; neutrality may not fulfill these obligations.",
      },
      {
        text: "Organize interfaith dialogue sessions to promote understanding",
        impact: "positive",
        consequences: [
          "Students from different religions start working together on common goals",
          "Campus becomes known for religious harmony and mutual respect",
          "University administrators implement inclusive policies for all faith groups",
          "You gain recognition as a leader who builds bridges between communities",
        ],
        explanation:
          "Creating space for dialogue helps students understand each other better. When people talk together, fear and hatred usually disappear.",
        legalNote:
          "Promoting interfaith dialogue demonstrates commitment to constitutional values and helps prevent discrimination.",
      },
      {
        text: "Condemn the discrimination, advocate for equal religious facilities, and implement anti-discrimination policies",
        impact: "positive",
        consequences: [
          "All religious groups gain equal access to campus facilities and resources",
          "University becomes a model for religious diversity and inclusion",
          "Students learn valuable lessons about respecting diversity in a globalized world",
          "You become known as a principled leader who stands up for everyone's rights",
        ],
        explanation:
          "Taking comprehensive action to protect everyone's religious rights creates a truly inclusive educational environment where all students can thrive.",
        legalNote:
          "Actively protecting religious rights demonstrates compliance with constitutional obligations and prevents legal violations.",
        professionalRisk:
          "Leading efforts for religious inclusion enhances your reputation as a principled leader and opens future opportunities.",
      },
    ],
  },
];