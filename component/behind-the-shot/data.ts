export type StoryCardData = {
  title: string;
  quote: string;
  body: string;
  stat: string;
  tags: string[];
  src: string;
  alt: string;
};

export const CASE_STUDIES: StoryCardData[] = [
  {
    title: "The 72-Hour Blind",
    quote: "Sometimes the best tool isn't the lens, but the ability to become a statue.",
    body: "To capture the elusive Asian Openbill Stork, we spent three days in silence, moving only when necessary. The bird appeared on day three.",
    stat: "18 Days Total · Trip Duration",
    tags: ["Himalayan Corridor", "Asian Openbill Stork", "Patience"],
    src: "/Images/bird2.jpeg",
    alt: "Wildlife photography in high altitude",
  },
  {
    title: "Depths of the Wild",
    quote: "Light is a stranger in the deep; we must bring it with reverence.",
    body: "Photographing apex predators requires a delicate balance between distance and trust. We positioned along the natural corridor where survival is silent.",
    stat: "120 Hours · Field Mentorship",
    tags: ["Apex Predators", "Wild Habitat", "Natural Light"],
    src: "/Images/cat1.jpeg",
    alt: "Apex predator in wild habitat",
  },
  {
    title: "The Ghost Hour",
    quote: "Between 4 and 6 AM, the world belongs entirely to wildlife.",
    body: "In ancient peatland forests, I spent 11 mornings hidden before the first light found the blossoms and the bird found the perfect moment.",
    stat: "11 Mornings · Consecutive Days",
    tags: ["Borneo", "Pre-dawn", "Corridors"],
    src: "/Images/bird1.jpeg",
    alt: "Misty forest at pre-dawn blue hour",
  },
  {
    title: "Blossom & Flight",
    quote: "Precision timing captures moments invisible to the naked eye.",
    body: "High in the canopy, patience rewarded us with a fleeting interaction between wild flora and migrating fauna.",
    stat: "5 Days · Canopy Station",
    tags: ["Canopy", "Flora & Fauna", "High Speed"],
    src: "/Images/flower1.jpeg",
    alt: "Bird interacting with wild blossoms",
  },
  {
    title: "Stillness at Dawn",
    quote: "The wild speaks in pauses, and the camera learns to listen.",
    body: "We waited through the blue hour until the marsh settled into itself, allowing the light to reveal a delicate balance of movement and stillness.",
    stat: "9 Dawn Sessions · Private Access",
    tags: ["Marshlands", "Blue Hour", "Quiet Focus"],
    src: "/Images/bird2.jpeg",
    alt: "Calm marsh landscape at dawn",
  },
  {
    title: "Shadowline",
    quote: "The strongest frame is often the one built from restraint.",
    body: "Hidden near a ridge line, we tracked the play of shadow and texture until the scene transformed into something almost architectural.",
    stat: "6 Nights · Terrain Study",
    tags: ["Ridgeline", "Texture", "Nightfall"],
    src: "/Images/cat2.jpeg",
    alt: "Wildlife scene at dusk",
  },
];
