import type { Work } from "@/features/work/types/work";
import afterRain from "./images/after-rain/thumbnail.jpg";
import betweenSeasons from "./images/between-seasons/thumbnail.jpg";
import blueHour from "./images/blue-hour/thumbnail.jpg";
import cobaltRoom from "./images/cobalt-room/thumbnail.jpg";
import dayDream from "./images/day-dream/thumbnail.jpg";
import distantMusic from "./images/distant-music/thumbnail.jpg";
import everydaySun from "./images/everyday-sun/thumbnail.jpg";
import familiarStranger from "./images/familiar-stranger/thumbnail.jpg";
import fieldNotes from "./images/field-notes/thumbnail.jpg";
import goldenWeather from "./images/golden-weather/thumbnail.jpg";
import greenhouseStudy from "./images/greenhouse-study/thumbnail.jpg";
import lilacEvening from "./images/lilac-evening/thumbnail.jpg";
import longWeekend from "./images/long-weekend/thumbnail.jpg";
import lunarTide from "./images/lunar-tide/thumbnail.jpg";
import newRituals from "./images/new-rituals/thumbnail.jpg";
import offSeason from "./images/off-season/thumbnail.jpg";
import ordinaryLight from "./images/ordinary-light/thumbnail.jpg";
import paperFlowers from "./images/paper-flowers/thumbnail.jpg";
import quietBloom from "./images/quiet-bloom/thumbnail.jpg";
import softArchitecture from "./images/soft-architecture/thumbnail.jpg";
import softFocus from "./images/soft-focus/thumbnail.jpg";
import stillMoving from "./images/still-moving/thumbnail.jpg";
import summerNotation from "./images/summer-notation/thumbnail.jpg";
import thePinkWall from "./images/the-pink-wall/thumbnail.jpg";

/**
 * Portfolio entries, newest first. Every image lives beside this file under
 * images/<slug>/ — thumbnail.jpg for the index, numbered files for the
 * detail page. See docs/content-guide.md for how to add a work.
 */
export const works = [
  {
    slug: "quiet-bloom",
    category: "Editorial",
    title: "Quiet Bloom",
    client: "Personal Work",
    publishedAt: "2026",
    thumbnail: {
      image: quietBloom,
      alt: "Soft morning light across a green meadow",
    },
    images: [],
  },
  {
    slug: "soft-architecture",
    category: "Campaign",
    title: "Soft Architecture",
    client: "Atelier M",
    publishedAt: "2026",
    thumbnail: {
      image: softArchitecture,
      alt: "Tall forest trees fading into mist",
    },
    images: [],
  },
  {
    slug: "between-seasons",
    category: "Photo Book",
    title: "Between Seasons",
    client: "Self Published",
    publishedAt: "2025",
    thumbnail: {
      image: betweenSeasons,
      alt: "Mountain lake beneath a quiet blue sky",
    },
    images: [],
  },
  {
    slug: "blue-hour",
    category: "Portrait",
    title: "Blue Hour",
    client: "Paper Journal",
    publishedAt: "2025",
    thumbnail: {
      image: blueHour,
      alt: "Rolling green hills under evening clouds",
    },
    images: [],
  },
  {
    slug: "ordinary-light",
    category: "Editorial",
    title: "Ordinary Light",
    client: "Union Magazine",
    publishedAt: "2025",
    thumbnail: {
      image: ordinaryLight,
      alt: "Sunlight reaching through a forest valley",
    },
    images: [],
  },
  {
    slug: "summer-notation",
    category: "Campaign",
    title: "Summer Notation",
    client: "Linen Studio",
    publishedAt: "2024",
    thumbnail: {
      image: summerNotation,
      alt: "Clear ocean water meeting pale sand",
    },
    images: [],
  },
  {
    slug: "still-moving",
    category: "Look Book",
    title: "Still, Moving",
    client: "Nue",
    publishedAt: "2024",
    thumbnail: {
      image: stillMoving,
      alt: "Evergreen forest and mountains in soft light",
    },
    images: [],
  },
  {
    slug: "day-dream",
    category: "Portrait",
    title: "Day Dream",
    client: "Personal Work",
    publishedAt: "2024",
    thumbnail: {
      image: dayDream,
      alt: "Still lake reflecting green mountains",
    },
    images: [],
  },
  {
    slug: "field-notes",
    category: "Editorial",
    title: "Field Notes",
    client: "Common Ground",
    publishedAt: "2024",
    thumbnail: {
      image: fieldNotes,
      alt: "Waterfall falling through dense greenery",
    },
    images: [],
  },
  {
    slug: "after-rain",
    category: "Campaign",
    title: "After Rain",
    client: "Moss Objects",
    publishedAt: "2024",
    thumbnail: {
      image: afterRain,
      alt: "River winding through a wide mountain valley",
    },
    images: [],
  },
  {
    slug: "cobalt-room",
    category: "Portrait",
    title: "Cobalt Room",
    client: "Rive Studio",
    publishedAt: "2023",
    thumbnail: {
      image: cobaltRoom,
      alt: "Starry night sky above a dark mountain range",
    },
    images: [],
  },
  {
    slug: "long-weekend",
    category: "Look Book",
    title: "Long Weekend",
    client: "Serein",
    publishedAt: "2023",
    thumbnail: {
      image: longWeekend,
      alt: "Forest path surrounded by tall trees",
    },
    images: [],
  },
  {
    slug: "the-pink-wall",
    category: "Editorial",
    title: "The Pink Wall",
    client: "Kindred Journal",
    publishedAt: "2023",
    thumbnail: {
      image: thePinkWall,
      alt: "Wildflowers blooming across a bright field",
    },
    images: [],
  },
  {
    slug: "everyday-sun",
    category: "Campaign",
    title: "Everyday Sun",
    client: "Aster Goods",
    publishedAt: "2023",
    thumbnail: {
      image: everydaySun,
      alt: "Sunset light over a broad natural landscape",
    },
    images: [],
  },
  {
    slug: "off-season",
    category: "Photo Book",
    title: "Off Season",
    client: "Self Published",
    publishedAt: "2022",
    thumbnail: {
      image: offSeason,
      alt: "Muted hills beneath an overcast sky",
    },
    images: [],
  },
  {
    slug: "golden-weather",
    category: "Portrait",
    title: "Golden Weather",
    client: "Paper Journal",
    publishedAt: "2022",
    thumbnail: {
      image: goldenWeather,
      alt: "Golden sunlight over open hills",
    },
    images: [],
  },
  {
    slug: "greenhouse-study",
    category: "Editorial",
    title: "Greenhouse Study",
    client: "Vernacular",
    publishedAt: "2022",
    thumbnail: {
      image: greenhouseStudy,
      alt: "Green leaves and tree trunks in a quiet forest",
    },
    images: [],
  },
  {
    slug: "new-rituals",
    category: "Campaign",
    title: "New Rituals",
    client: "Forma",
    publishedAt: "2022",
    thumbnail: {
      image: newRituals,
      alt: "Close view of flowers in natural daylight",
    },
    images: [],
  },
  {
    slug: "lunar-tide",
    category: "Look Book",
    title: "Lunar Tide",
    client: "Nue",
    publishedAt: "2021",
    thumbnail: {
      image: lunarTide,
      alt: "Quiet shoreline under cool evening light",
    },
    images: [],
  },
  {
    slug: "familiar-stranger",
    category: "Portrait",
    title: "Familiar Stranger",
    client: "Personal Work",
    publishedAt: "2021",
    thumbnail: {
      image: familiarStranger,
      alt: "Dense garden leaves with a soft natural texture",
    },
    images: [],
  },
  {
    slug: "distant-music",
    category: "Editorial",
    title: "Distant Music",
    client: "Sable Review",
    publishedAt: "2021",
    thumbnail: {
      image: distantMusic,
      alt: "Pale woodland path beneath a soft canopy",
    },
    images: [],
  },
  {
    slug: "lilac-evening",
    category: "Campaign",
    title: "Lilac Evening",
    client: "Aster Goods",
    publishedAt: "2021",
    thumbnail: {
      image: lilacEvening,
      alt: "Warm light filtering through green forest trees",
    },
    images: [],
  },
  {
    slug: "paper-flowers",
    category: "Photo Book",
    title: "Paper Flowers",
    client: "Self Published",
    publishedAt: "2020",
    thumbnail: {
      image: paperFlowers,
      alt: "Delicate green fern leaves in warm daylight",
    },
    images: [],
  },
  {
    slug: "soft-focus",
    category: "Portrait",
    title: "Soft Focus",
    client: "Personal Work",
    publishedAt: "2020",
    thumbnail: {
      image: softFocus,
      alt: "Soft mist resting over a quiet forest",
    },
    images: [],
  },
] satisfies readonly Work[];
