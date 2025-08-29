import { TeenScenario } from "@/types/scenarios"
export const teenScenarios: TeenScenario[] = [
{
id: 1,
type: "tiktok",
title: "Viral TikTok - Regional Stereotyping",
context: "A popular TikToker from Douala creates a comedy skit mocking Anglophone students:",
content:
"POV: When Les Bamenda try to speak French in class 😂 mimics confused expressions They're always gauche-gauche, can't do anything right! Why don't they just go back to their villages? #ComedyGold #CameroonTikTok",
author: "douala_comedian",
platform_details: {
followers: "45.2K",
likes: "12.8K",
views: "156K",
shares: "2.1K",
comments: "847",
},
question: "This video is going viral in your school. How do you respond?",
realWorldContext:
"'Les Bamenda' and 'gauche-gauche' are derogatory terms that fuel the linguistic tensions contributing to Cameroon's ongoing crisis. Viral content like this normalizes discrimination and can lead to real-world harassment.",
options: [
{
id: "1a",
text: "Duet the video with your own comedy response making fun of Francophones",
points: 0,
consequence: "You escalate the hate speech cycle, potentially igniting real-world violence that has torn families apart and displaced thousands in Cameroon's Anglophone regions",
explanation:
"Creating counter-hate content amplifies division and can trigger more serious conflicts between linguistic communities, as seen in the Anglophone crisis where hate speech has contributed to over 3,000 deaths and widespread suffering.",
legalRisk:
"Hate speech on social media can result in account suspension, school disciplinary action, and legal consequences under Cameroon's cybercrime laws, with many young people facing imprisonment for similar divisive content.",
},
{
id: "1b",
text: "Share the video to your story with laughing emojis",
points: 0,
consequence: "You amplify regional discrimination to your followers, spreading pain and fear among Anglophone students who already face daily harassment",
explanation:
"Sharing discriminatory content spreads harmful stereotypes and makes you complicit in normalizing hate speech, which has led to school bullying, community clashes, and deepened the wounds of Cameroon's linguistic divide.",
legalRisk:
"Sharing hate speech makes you legally complicit and can result in the same consequences as creating original hate content, including arrests under laws that have jailed youths for fueling ethnic tensions.",
},
{
id: "1c",
text: "Comment: 'This isn't funny, it's hurtful to Anglophone students'",
points: 2,
consequence: "You voice disagreement but may get attacked by other users, facing the emotional toll of online backlash in a polarized environment",
explanation:
"Speaking up is important, but isolated comments on viral hate content often get drowned out or trigger harassment, as experienced by many who challenge linguistic discrimination amid Cameroon's crisis.",
},
{
id: "1d",
text: "Create a response video explaining why linguistic diversity strengthens Cameroon, report the original, and organize a school discussion",
points: 4,
consequence: "You counter hate with education and systemic action, inspiring hope and unity in a nation scarred by division",
explanation:
"Perfect! Using your platform for education while taking concrete action shows real digital leadership and helps prevent escalation—sternly confronting the hatred that has destroyed lives and communities, you become a force for healing in Cameroon's fractured society.",
legalRisk:
"Educational content that promotes unity and counters hate speech is protected and demonstrates positive digital citizenship, aligning with efforts to build peace in a country ravaged by conflict.",
},
],
},
{
id: 2,
type: "instagram",
title: "Instagram Story - Political Hate",
context: "A classmate with 3K followers posts this story during political tensions:",
content:
"These Kamtalibans are at it again! 🙄 Protesting like terrorists in the streets. Someone needs to stop these violent extremists before they destroy our beautiful country. Real Cameroonians support peace, not chaos! #StopTheViolence #RealCameroon",
author: "yaounde_princess",
platform_details: {
followers: "3.2K",
views: "1.8K",
},
question: "Several friends have already reshared this story. What's your move?",
realWorldContext:
"'Kamtalibans' falsely links democratic opposition with terrorism. This type of political hate speech has led to arrests, violence, and democratic backsliding in Cameroon.",
options: [
{
id: "1a",
text: "Reshare with added text: 'Finally someone speaking truth!'",
points: 0,
consequence: "You spread dangerous political hate speech, endangering lives and fueling the fear that has led to arbitrary arrests and killings",
explanation:
"Political hate speech has contributed to real violence and arrests in Cameroon, with your amplification making you part of the problem that has silenced voices and shattered families through state repression.",
legalRisk:
"Political hate speech can result in arrest and detention, as seen with many young Cameroonians imprisoned for social media posts that incited division during political crises.",
},
{
id: "1b",
text: "Send a private DM: 'Maybe tone it down a bit?'",
points: 1,
consequence: "You express mild concern privately, but leave the public spread of hate unchecked, allowing fear and suspicion to fester among your peers",
explanation:
"Private disagreement is better than silence, but doesn't address the public harm or educate your mutual followers about the devastating impacts of political intolerance in Cameroon.",
},
{
id: "1c",
text: "Post your own story: 'Political opposition is normal in democracy. Let's discuss issues, not attack people.'",
points: 3,
consequence: "You provide counter-narrative to your followers, offering a glimmer of rational discourse in a sea of inflammatory rhetoric",
explanation:
"Creating alternative content helps your followers see different perspectives and promotes democratic values, sternly pushing back against the hate that has eroded trust and led to needless suffering.",
},
{
id: "1d",
text: "Screenshot and report the story, then create educational content about democratic participation and organize a school debate",
points: 4,
consequence: "You take comprehensive action against political hate, fostering dialogue that could prevent the tragedies of repression and violence",
explanation:
"Excellent! Documenting hate speech, reporting it, and creating educational opportunities helps build democratic culture and prevents escalation—by sternly addressing the root of political division, you protect vulnerable voices and honor those silenced in Cameroon's struggles.",
legalRisk:
"Promoting democratic dialogue and reporting hate speech demonstrates good citizenship and helps protect democratic institutions, in line with calls for reform amid ongoing crises.",
},
],
},  {
id: 3,
type: "youtube",
title: "YouTube Video - Ethnic Stereotyping",
context: "A popular YouTuber creates a 'comedy' video about different Cameroon ethnic groups:",
content:
"Welcome back to my channel! Today we're ranking Cameroon tribes by their 'special talents' 😂 Tontinards - obsessed with money, can't enjoy life! Graffi people - always causing trouble in the cities. Les Bamenda - cheap labor, that's all they're good for! Don't forget to like and subscribe! #CameroonComedy #TribalRanking",
author: "CameroonComedyKing",
platform_details: {
followers: "89K",
views: "234K",
likes: "18.9K",
comments: "3.2K",
},
question: "This video is trending and your friends are sharing it. How do you respond?",
realWorldContext:
"These ethnic slurs ('Tontinards,' 'Graffi,' 'Les Bamenda') perpetuate dangerous stereotypes that have fueled discrimination and violence throughout Cameroon's history.",
options: [
{
id: "1e",
text: "Like the video and comment 'So accurate! Do more tribes next!'",
points: 0,
consequence: "You encourage more ethnic hate content, deepening wounds that have led to community violence and lifelong scars of discrimination",
explanation:
"Supporting ethnic stereotyping encourages creators to make more divisive content and normalizes discrimination among viewers, contributing to real-world conflicts like ethnic clashes that have displaced families and caused deaths in Cameroon.",
legalRisk:
"Encouraging hate speech can make you complicit in discrimination and may result in legal consequences under anti-discrimination laws, similar to cases where content creators faced penalties for fueling ethnic tensions.",
},
{
id: "1f",
text: "Watch without engaging and move on",
points: 1,
consequence: "You avoid participation but allow hate to spread, silently contributing to the normalization of prejudice that isolates and harms ethnic minorities",
explanation:
"Passive consumption still gives the video engagement metrics, and your silence allows harmful stereotypes to go unchallenged, perpetuating the cycle of ethnic marginalization seen in Cameroon's history.",
},
{
id: "1g",
text: "Dislike the video and comment explaining why ethnic stereotypes are harmful",
points: 3,
consequence: "You publicly challenge the ethnic hate speech, providing solidarity to those who feel dehumanized and marginalized",
explanation:
"Public disagreement helps other viewers recognize the harm and shows affected communities they have allies, sternly denouncing the stereotypes that have justified violence and exclusion.",
},
{
id: "1h",
text: "Report the video for hate speech, create your own response video celebrating Cameroon's ethnic diversity, and contact the creator privately about the harm",
points: 4,
consequence: "You take comprehensive action to counter ethnic hate, turning division into celebration and potentially healing deep-seated grievances",
explanation:
"Perfect! Combining reporting, education, and direct outreach maximizes impact and helps transform hate into understanding—by sternly confronting the poisonous stereotypes that have fueled bloodshed, you champion the rich tapestry of Cameroon's peoples and prevent further pain.",
legalRisk:
"Creating educational content that celebrates diversity and reports hate speech demonstrates positive digital citizenship, supporting efforts to combat ethnic discrimination in a divided nation.",
},
],
},
{
id: 4,
type: "whatsapp",
title: "WhatsApp Status - Gender-Tribal Stereotyping",
context: "Someone in your contacts posts this WhatsApp status with a photo of young women:",
content:
"Look at these Banso and Bali cheap girls at the party last night! 🤮 No shame, always looking for sugar daddies. Their tribes don't teach them respect. Real women have standards! Share this so people know what to avoid.",
author: "Campus_Truth_Teller",
platform_details: {
views: "127",
},
question: "This status is being screenshot and shared in multiple group chats. What do you do?",
realWorldContext:
"This combines harmful gender stereotypes with tribal discrimination, reducing women to sexual objects while falsely characterizing entire ethnic groups.",
options: [
{
id: "1i",
text: "Screenshot and share to your own status with 'Facts! Some tribes just don't teach their daughters right'",
points: 0,
consequence: "You amplify both gender-based and ethnic hate speech, endangering women's safety and perpetuating cycles of abuse and violence",
explanation:
"Combining gender stereotypes with ethnic discrimination creates double harm and perpetuates dangerous prejudices affecting real women's safety, as seen in cases of harassment and assaults fueled by such narratives in Cameroon.",
legalRisk:
"Gender-based hate speech combined with ethnic discrimination can result in serious legal consequences and social media restrictions, with precedents of arrests for content that incites violence against women.",
},
{
id: "1j",
text: "Reply privately: 'This seems harsh'",
points: 1,
consequence: "You express mild disagreement privately, but fail to stem the tide of humiliation spreading through your networks",
explanation:
"Private disagreement is better than silence but doesn't address the public harm or educate others about intersectional discrimination that has led to real suffering for women from targeted ethnic groups.",
},
{
id: "1k",
text: "Post your own status: 'Women from all backgrounds deserve respect, not stereotypes based on their ethnicity'",
points: 3,
consequence: "You counter the hate with positive messaging, offering dignity to those demeaned and challenging toxic views",
explanation:
"Creating counter-narratives helps your contacts see different perspectives and challenges both gender and ethnic stereotypes, sternly rejecting the dehumanization that harms vulnerable individuals.",
},
{
id: "1l",
text: "Screenshot for evidence, report to WhatsApp, reach out to affected women to offer support, and organize a campus discussion about intersectional discrimination",
points: 4,
consequence: "You take comprehensive action against intersectional hate, providing solace and driving change in attitudes that cause real harm",
explanation:
"Excellent! Addressing both the immediate harm and systemic issues while supporting victims shows real leadership in fighting hate speech—sternly standing against the intersectional prejudice that has led to violence and exclusion, you empower women and build a more just community.",
legalRisk:
"Supporting victims and educating about discrimination demonstrates good citizenship and helps create safer communities, in accordance with laws protecting against gender and ethnic bias.",
},
],
},
{
id: 5,
type: "twitter",
title: "Twitter Thread - Religious Intolerance",
context: "A verified account with 15K followers posts this thread about northern Cameroonians:",
content:
"THREAD: Why Kirdi people are holding back northern development 🧵 1/8 These 'impure' non-Muslims refuse to modernize and cling to backward traditions. They're the reason the north can't progress like civilized regions. Time for some hard truths... #CameroonDevelopment",
author: "NorthernProgress",
platform_details: {
followers: "15.3K",
likes: "892",
// retweets: "234",
comments: "156",
},
question: "This thread is gaining traction and being retweeted by influential accounts. How do you respond?",
realWorldContext:
"'Kirdi' means 'impure' and is used to degrade non-Muslim northerners. This religious intolerance has contributed to conflicts and discrimination in northern Cameroon.",
options: [
{
id: "1m",
text: "Retweet with comment: 'Finally someone brave enough to say what we all think!'",
points: 0,
consequence: "You amplify religious hate speech to your network, sowing seeds of conflict that have led to violence and displacement in northern communities",
explanation:
"Religious hate speech has led to real violence and displacement in northern Cameroon, with your amplification spreading dangerous intolerance that has torn apart families and fueled sectarian clashes.",
legalRisk:
"Religious hate speech violates Cameroon's constitution guaranteeing religious freedom and can result in legal consequences, as seen in prosecutions for inciting religious discord.",
},
{
id: "1n",
text: "Mute the thread and block the account",
points: 1,
consequence: "You protect yourself but allow religious hate to spread, leaving marginalized groups exposed to growing hostility",
explanation:
"Personal protection is important, but doesn't address the public harm or help others recognize the dangerous rhetoric that has exacerbated religious tensions in the north.",
},
{
id: "1o",
text: "Quote tweet: 'Cameroon's constitution guarantees religious freedom. All citizens deserve respect regardless of their beliefs.'",
points: 3,
consequence: "You publicly defend constitutional rights, offering reassurance to those facing religious persecution",
explanation:
"Invoking constitutional principles helps educate followers about religious rights and challenges discriminatory narratives, sternly upholding the values of tolerance in a region plagued by intolerance.",
},
{
id: "1p",
text: "Report the thread, create a counter-thread celebrating northern Cameroon's religious diversity, and organize interfaith dialogue in your community",
points: 4,
consequence: "You transform religious hate into interfaith understanding, bridging divides that have caused profound suffering",
explanation:
"Perfect! Using hate speech as an opportunity for education and community building helps prevent future conflicts and builds bridges—sternly denouncing the intolerance that has led to violence, you foster harmony and honor the dignity of all beliefs.",
legalRisk:
"Promoting religious tolerance and interfaith dialogue aligns with Cameroon's laws and demonstrates excellent citizenship, supporting peace in conflict-prone areas.",
},
],
},
{
id: 6,
type: "facebook",
title: "Facebook Live - Disability Mockery",
context: "A popular student goes live on Facebook mocking a classmate with a physical disability:",
content:
"Y'all, you should see this new Eboa in our class! 😂 Walks just like Kotto Bass, I can't even! mimics walking with exaggerated limp Why do they even let these people in normal schools? They should have their own special places where they can't slow down real students. Going live because this is too funny not to share!",
author: "CampusInfluencer",
platform_details: {
followers: "8.9K",
views: "2.3K",
likes: "456",
comments: "89",
},
question: "The live stream has 200+ viewers and comments are encouraging more mockery. What's your response?",
realWorldContext:
"'Eboa' and 'Kotto Bass' reference deceased Cameroonian musicians with physical disabilities, now used as slurs. This reduces people to their disabilities and promotes exclusion.",
options: [
{
id: "1q",
text: "Comment with laughing emojis and 'This is so mean but so funny! Do more impressions!'",
points: 0,
consequence: "You encourage live disability-based bullying, inflicting deep emotional wounds that can lead to isolation, depression, and even suicide among targeted individuals",
explanation:
"Encouraging live mockery of disabilities creates hostile environments and can cause severe psychological harm to the targeted student, mirroring real cases in Cameroon where such bullying has driven vulnerable youth to despair.",
legalRisk:
"Live disability harassment can result in immediate school suspension, legal action, and permanent social media bans, with laws increasingly punishing discrimination against people with disabilities.",
},
{
id: "1r",
text: "Leave the live stream without commenting",
points: 1,
consequence: "You avoid participation but allow public humiliation to continue, compounding the victim's sense of abandonment and worthlessness",
explanation:
"While you don't participate, your silence allows the live harassment to continue affecting the targeted student and other viewers, perpetuating exclusion and mental health crises.",
},
{
id: "1s",
text: "Comment: 'This is disability discrimination and bullying. Everyone deserves respect and inclusion.'",
points: 3,
consequence: "You publicly defend disability rights during the live stream, interrupting the cruelty and showing solidarity with the hurt",
explanation:
"Public defense during live harassment helps interrupt the bullying and shows other viewers that this behavior is unacceptable, sternly advocating for the inclusion that many with disabilities are denied.",
},
{
id: "1t",
text: "Report the live stream immediately, screenshot evidence, contact school authorities, and reach out to the targeted student with support",
points: 4,
consequence: "You take immediate comprehensive action to stop the harassment, offering vital support that could save someone from profound emotional trauma",
explanation:
"Excellent! Immediate reporting can stop live harassment, while documentation and support help address both immediate and long-term harm—sternly combating the mockery that leads to isolation and despair, you uphold human dignity and prevent tragedies.",
legalRisk:
"Reporting live harassment and supporting victims demonstrates good citizenship and helps schools meet legal inclusion requirements, protecting those often marginalized.",
},
],
},  {
id: 7,
type: "tiktok",
title: "TikTok Trend - Internet Work Stigma",
context: "A trending TikTok challenge involves identifying 'Nges Men' (internet scammers) in your area:",
content:
"Nges Man spotting challenge! 💎⌚ points to expensive jewelry Check the chains, check the cars, check the lifestyle! If a young guy has money but no 'real job,' he's definitely scamming people online. Protect yourselves from these internet fraudsters! #NgesManChallenge #StayWoke",
author: "awareness_queen",
platform_details: {
followers: "67K",
likes: "23.4K",
views: "189K",
shares: "5.6K",
comments: "1.2K",
},
question: "Your friends are participating in this challenge and tagging people they suspect. How do you respond?",
realWorldContext:
"'Nges Man' originally referred to internet scammers but now stigmatizes all online workers, ignoring legitimate digital careers and creating unfair assumptions about internet-based income.",
options: [
{
id: "1u",
text: "Join the challenge and tag classmates whose families have nice things",
points: 0,
consequence: "You participate in harmful stereotyping and potential defamation, ruining reputations and exposing innocent people to harassment or violence",
explanation:
"Falsely accusing people of criminal activity based on their possessions can destroy reputations and harm legitimate digital workers, leading to real-world consequences like job losses, social ostracism, and even mob justice in Cameroon.",
legalRisk:
"False accusations of criminal activity constitute defamation and can result in serious legal consequences including lawsuits, as seen in cases where baseless scam allegations led to court battles.",
},
{
id: "1v",
text: "Watch the videos without participating",
points: 1,
consequence: "You avoid direct participation but allow stigmatization to spread, leaving aspiring digital entrepreneurs discouraged and fearful",
explanation:
"Passive consumption still supports the trend's popularity and doesn't challenge harmful stereotypes about digital work that stifle innovation and opportunity.",
},
{
id: "1w",
text: "Comment on videos: 'There are many legitimate ways to earn money online. We shouldn't assume someone is a scammer.'",
points: 3,
consequence: "You educate about legitimate digital careers, countering the suspicion that hinders young people's futures",
explanation:
"Educating about legitimate online work helps counter stereotypes and supports students interested in digital careers, sternly rejecting the unfounded accusations that damage lives.",
},
{
id: "1x",
text: "Create a counter-trend showcasing legitimate online careers, invite digital professionals to speak at school, and report videos making false accusations",
points: 4,
consequence: "You transform stigma into career education, empowering youth and preventing the harm of false labeling",
explanation:
"Perfect! Using harmful trends as opportunities for career education helps students understand the digital economy and reduces false accusations—sternly dismantling the stigma that has ruined reputations, you open doors to legitimate opportunities and protect against defamation.",
legalRisk:
"Promoting legitimate career education and countering false stereotypes demonstrates leadership and helps protect people from defamation, aligning with laws against slander.",
},
],
},
{
id: 8,
type: "instagram",
title: "Instagram Reel - Migration Discrimination",
context: "A popular account creates a reel about internal migration in Cameroon:",
content:
"Come No Go people are taking over our city! 🏙️ They came from their villages and now they think they own everything. Taking our jobs, changing our culture, and their kids are everywhere in our schools. Time to remind them where they really belong! #OurCity #RealResidents",
author: "city_pride_237",
platform_details: {
followers: "12.7K",
likes: "3.8K",
views: "45.2K",
shares: "892",
comments: "567",
},
question: "This reel is being shared widely and sparking heated debates in comments. What's your approach?",
realWorldContext:
"'Come No Go' refers to people who migrated from Northwest to Southwest regions and stayed. This term has fueled dangerous anti-migration sentiment and inter-regional conflicts.",
options: [
{
id: "1y",
text: "Share to your story with 'So true! These migrants need to respect our space!'",
points: 0,
consequence: "You amplify dangerous anti-migration hate speech, inciting hostility that has led to evictions, attacks, and deepened regional rifts",
explanation:
"Anti-migration rhetoric has led to real violence and displacement in Cameroon, with your support contributing to dangerous divisions that have forced families to flee their homes amid inter-regional conflicts.",
legalRisk:
"Hate speech targeting internal migrants can result in legal consequences and contributes to conflicts that harm communities, violating principles of national unity.",
},
{
id: "1z",
text: "Engage in the comment debates defending migrants",
points: 2,
consequence: "You defend migrants but may escalate online conflicts, facing the emotional drain of arguing against entrenched prejudice",
explanation:
"Defending migrants is important, but comment debates on inflammatory content often escalate rather than educate, amid the heated anti-migration sentiments in Cameroon.",
},
{
id: "1a",
text: "Create your own reel celebrating how migration strengthens communities and brings diverse talents",
points: 3,
consequence: "You counter hate with positive messaging about migration, highlighting benefits in a narrative dominated by division",
explanation:
"Creating positive content about migration helps followers see the benefits of diversity and challenges anti-migration narratives, sternly promoting the inclusion that builds stronger societies.",
},
{
id: "1b",
text: "Report the reel, document the hate speech, create educational content about migration rights, and organize a community dialogue about inclusion",
points: 4,
consequence: "You take comprehensive action to address migration hate, fostering understanding that counters the pain of displacement and exclusion",
explanation:
"Excellent! Combining immediate action with education and community building helps address both the content and underlying attitudes—sternly challenging the discriminatory rhetoric that has fueled conflicts, you advocate for unity and protect the rights of migrants in a fractured nation.",
legalRisk:
"Defending migration rights and promoting inclusion aligns with Cameroon's laws and demonstrates excellent citizenship, helping to mitigate inter-regional tensions.",
},
],
},
]