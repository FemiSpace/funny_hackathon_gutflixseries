// lib/foodData.ts

export interface FoodItem {
  id: number;
  name: string;
  image: string; // path to the image in /public
  damageScore: number; // A negative number for bad food, positive for good
  outsidePerception: string;
  insideReactionGif: string; // filename for the GIF
  reactionLabel: string; // sarcastic/funny label for the GIF
  llmPrompt: string; // A prompt for an LLM
}

export const foodData: FoodItem[] = [
  {
    id: 1,
    name: "Energy Drink",
    image: "/images/energy-drink.jpeg",
    damageScore: -8,
    outsidePerception: "Boosted!",
    insideReactionGif: "electrical-panel-explosion.jpeg",
    reactionLabel: "Brain: 'Racing.' Liver: 'Mayday!'",
    llmPrompt: "Write a sarcastic monologue from the liver after the person drank an energy drink. Include caffeine panic, vitamin overdose, and sugar-induced drama.",
  },
  {
    id: 2,
    name: "McNuggets",
    image: "/images/mcnuggets.jpeg",
    damageScore: -12,
    outsidePerception: "Comfort food",
    insideReactionGif: "factory-machine-fails.gif",
    reactionLabel: "Gut flora: 'Oil bath incoming!'",
    llmPrompt: "Create a dialogue between gut bacteria and the pancreas after receiving a delivery of McNuggets. Make it chaotic, greasy, and full of regret.",
  },
  {
    id: 3,
    name: "Gas Station Burrito",
    image: "/images/burrito.jpeg",
    damageScore: -15,
    outsidePerception: "Cheap & tasty",
    insideReactionGif: "fire-hose-out-of-control.gif",
    reactionLabel: "Colon: 'Emergency evacuate!'",
    llmPrompt: "Write an emergency gut broadcast as the burrito arrives. The intestines are staging a protest. Include riot metaphors.",
  },
  {
    id: 4,
    name: "Kombucha",
    image: "/images/kombucha.jpeg",
    damageScore: 5,
    outsidePerception: "I'm healthy now",
    insideReactionGif: "happy-party.gif",
    reactionLabel: "Microbiome: 'A pleasant surprise!'",
    llmPrompt: "Write a zen meditation from the gut microbiome after receiving kombucha. Gratitude, serenity, and healthy vibes only.",
  },
  {
    id: 5,
    name: "Protein Bar",
    image: "/images/protein-bar.jpeg",
    damageScore: -4,
    outsidePerception: "Fitness fuel",
    insideReactionGif: "man-spitting-out-coffee.gif",
    reactionLabel: "Liver: 'It's sugar in disguise!'",
    llmPrompt: "Write a sarcastic liver monologue after receiving a 'healthy' protein bar loaded with fake sweeteners and processed goo. The liver is skeptical.",
  },
  {
    id: 6,
    name: "Kale + Salmon Bowl",
    image: "/images/kale-salmon-bowl.jpeg",
    damageScore: 10,
    outsidePerception: "Goddess mode",
    insideReactionGif: "happy-party.gif",
    reactionLabel: "Gut: 'Happy party 🙏'",
    llmPrompt: "Write a celebration party between liver, gut, and brain after getting a kale and salmon bowl. Full of smug clean-eating energy.",
  },
]
