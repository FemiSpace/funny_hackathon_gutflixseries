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
    reactionLabel: "Liver: 'Red alert! Caffeine tsunami incoming! Abandon all detox protocols!'",
    llmPrompt: "Brain: 'I can see sounds and hear colors!' Liver: 'I'm drowning in a sea of artificial sweeteners and B-vitamins! This isn't energy, it's liquid panic!' Kidneys: 'We're filtering what now?!'"
  },
  {
    id: 2,
    name: "McNuggets",
    image: "/images/mcnuggets.jpeg",
    damageScore: -12,
    outsidePerception: "Factory machine fail",
    insideReactionGif: "factory-machine-fails.gif",
    reactionLabel: "Gut Microbiome: 'ALIEN INVASION!'",
    llmPrompt: "Good Gut Bacteria: 'What... what is this substance? It's like chicken, but also... plastic?' Bad Bacteria: 'MUAHAHA! Our time has come! Commence the grease party!' Pancreas: 'I don't even know what to do with this... is it food or a chemistry experiment?'"
  },
  {
    id: 3,
    name: "Gas Station Burrito",
    image: "/images/burrito.jpeg",
    damageScore: -15,
    outsidePerception: "Emergency evacuate!",
    insideReactionGif: "fire-hose-out-of-control.gif",
    reactionLabel: "Colon: 'CODE BROWN! REPEAT, CODE BROWN!'",
    llmPrompt: "Stomach: 'Oh no... not again...' Small Intestine: 'What is this? Is it food? Is it a weapon?' Colon: 'EVERYBODY OUT! ABANDON SHIP! I DON'T CARE IF IT'S ONLY BEEN 20 MINUTES! EMERGENCY EVACUATION PROTOCOLS ACTIVATED!"
  },
  {
    id: 4,
    name: "Kombucha",
    image: "/images/kombucha.jpeg",
    damageScore: 5,
    outsidePerception: "I'm healthy now",
    insideReactionGif: "happy-party.gif",
    reactionLabel: "Gut: 'Is this... is this love?'",
    llmPrompt: "Good Bacteria: 'Oh wow, is that... ginger? And a hint of turmeric? *sniff* It's beautiful...' Bad Bacteria: 'Ugh, not this healthy crap again.' Liver: 'Wait, something actually good for me? Did I die and go to organ heaven?'"
  },
  {
    id: 5,
    name: "Protein Bar",
    image: "/images/protein-bar.jpeg",
    damageScore: -4,
    outsidePerception: "Rocket launch fail",
    insideReactionGif: "rocket-launch-fail.gif",
    reactionLabel: "Liver: '3... 2... 1... MISSION FAILURE! I repeat, the rocket has failed to reach orbit!'",
    llmPrompt: "Liver: 'Initiating enzyme sequence... wait, what is this? Artificial sweeteners? Sugar alcohols? *sigh* Abort mission! I repeat, abort mission! This isn't fuel, it's a chemical weapon! Stomach: 'Too late! We have liftoff of the gas factory!'",
  },
  {
    id: 6,
    name: "Kale + Salmon Bowl",
    image: "/images/kale-salmon-bowl.jpeg",
    damageScore: 10,
    outsidePerception: "Happy party",
    insideReactionGif: "happy-party.gif",
    reactionLabel: "Brain & Gut Choir: 'OMEGA-3s! ANTIOXIDANTS! VITAMIN D!'",
    llmPrompt: "Brain: 'I can feel my neurons high-fiving each other!' Gut: 'Finally, some real food! And look at all these happy little microbes dancing!' Liver: 'I don't know what to do with all these nutrients... I'm not used to this!' Heart: 'Keep it coming, this is amazing!',"
  },
]
