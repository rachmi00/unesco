import { StoryData } from "@/types/story";

export const aniseRayStory: StoryData = {
  scene1: {
    id: "scene1",
    text: "Ray casually mentions that women from your ethnic group 'are always lazy' with a dismissive shrug.",
    image: "/anise_upset.webp",
    choices: [
      { text: "Laugh it off awkwardly", nextScene: "scene2a" },
      { text: "Go quiet and ignore it", nextScene: "scene2b" },
    ],
    isEnding: false,
  },
  scene2a: {
    id: "scene2a",
    text: "Ray smirks, thinking you agreed. Inside, you feel a twist of anger.",
    image: "/background.webp",
    choices: [
      { text: "Later, scroll Facebook", nextScene: "scene3" }
    ],
    isEnding: false,
  },
  scene2b: {
    id: "scene2b",
    text: "The silence hangs heavy. Ray changes the subject like nothing happened.",
    image: "/background.webp",
    choices: [
      { text: "Later, scroll Facebook", nextScene: "scene3" }
    ],
    isEnding: false,
  },
  scene3: {
    id: "scene3",
    text: "Hours later, scrolling Facebook, you see a video: 'What tribe would you not date from?'",
    image: "/video.webp",
    choices: [
      { text: "Watch the video", nextScene: "scene4" }
    ],
    isEnding: false,
  },
  scene4: {
    id: "scene4",
    text: "A young man declares: 'I wouldn't date a girl from Ray's tribe because they're all prostitutes.'",
    image: "/anise_upset.webp",
    choices: [
      { text: "Screenshot & post revenge comment", nextScene: "retaliation1" },
      { text: "Report the video & message Ray privately", nextScene: "dialogue1" },
      { text: "Do nothing & keep scrolling", nextScene: "apathy" },
    ],
    isEnding: false,
  },
  // BAD PATH — spirals
  retaliation1: {
    id: "retaliation1",
    text: "Your post explodes overnight. People argue bitterly, some defending you, others piling on insults about both tribes.",
    image: "/background.webp",
    choices: [
      { text: "Keep fighting back", nextScene: "retaliation2" },
      { text: "Delete the post in regret", nextScene: "retaliation_delete" },
    ],
    isEnding: false,
  },
  retaliation2: {
    id: "retaliation2",
    text: "Friends DM you to stop. Your inbox fills with slurs and threats. The bitterness spreads beyond the screen.",
    image: "/anise_upset.webp",
    choices: [
      { text: "Defend yourself louder", nextScene: "retaliation3" },
      { text: "Log off in tears", nextScene: "retaliation_burnout" },
    ],
    isEnding: false,
  },
  retaliation3: {
    id: "retaliation3",
    text: "You become the face of an online feud. Ray avoids you. Mutual friends take sides. The cycle of hate deepens.",
    image: "/background.webp",
    isEnding: true,
    outcomeType: "negative",
  },
  retaliation_delete: {
    id: "retaliation_delete",
    text: "You delete your comment, but the screenshots live on. Rumors about you spread anyway.",
    image: "/anise_upset.webp",
    isEnding: true,
    outcomeType: "negative",
  },
  retaliation_burnout: {
    id: "retaliation_burnout",
    text: "You log off, shaken. The noise continues without you. You feel both relieved and powerless.",
    image: "/anise_upset.webp",
    isEnding: true,
    outcomeType: "negative",
  },
  // GOOD PATH — harder but rewarding
  dialogue1: {
    id: "dialogue1",
    text: "You message Ray: 'Your words earlier really hurt me. I saw a video targeting your tribe and it made me think.'",
    image: "/background.webp",
    choices: [
      { text: "Send as is", nextScene: "dialogue2" },
      { text: "Rewrite angrily instead", nextScene: "retaliation1" },
    ],
    isEnding: false,
  },
  dialogue2: {
    id: "dialogue2",
    text: "Ray replies: 'Come on, it was just a joke. Don't be so sensitive.'",
    image: "/ray.webp",
    choices: [
      { text: "Call him out firmly", nextScene: "dialogue3" },
      { text: "Stay polite and explain again", nextScene: "dialogue4" },
    ],
    isEnding: false,
  },
  dialogue3: {
    id: "dialogue3",
    text: "You tell him: 'Jokes like that reinforce stereotypes. Imagine if I said the same about your people.'",
    image: "/background.webp",
    choices: [
      { text: "Wait for his response", nextScene: "dialogue5" }
    ],
    isEnding: false,
  },
  dialogue4: {
    id: "dialogue4",
    text: "You write: 'I don't think you realize how much it stings when it's said about me and my people.'",
    image: "/background.webp",
    choices: [
      { text: "Wait for his response", nextScene: "dialogue5" }
    ],
    isEnding: false,
  },
  dialogue5: {
    id: "dialogue5",
    text: "Ray pauses. After minutes, he types: '...Okay, I get your point. I never thought of it that way.'",
    image: "/ray.webp",
    choices: [
      { text: "Thank him and end conversation", nextScene: "cycle_breaker" },
      { text: "Ask him to reflect more deeply", nextScene: "dialogue6" },
    ],
    isEnding: false,
  },
  dialogue6: {
    id: "dialogue6",
    text: "You push: 'Words shape attitudes. If we stop laughing at stereotypes, maybe they'll lose power.'",
    image: "/background.webp",
    choices: [
      { text: "See how he reacts", nextScene: "cycle_breaker" }
    ],
    isEnding: false,
  },
  cycle_breaker: {
    id: "cycle_breaker",
    text: "Ray sighs: 'You're right. I'll be more careful.' For the first time, you feel hope that cycles of hate can break.",
    image: "/loving.png",
    isEnding: true,
    outcomeType: "positive",
    badge: "Cycle Breaker Badge",
  },
  // Neutral
  apathy: {
    id: "apathy",
    text: "You scroll past. The words sting but fade. Nothing changes, but nothing worsens either.",
    image: "/background.webp",
    isEnding: true,
    outcomeType: "neutral",
  },
};