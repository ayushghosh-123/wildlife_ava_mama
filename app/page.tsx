import Hero from "@/component/Hero";
import FeaturedStories from "@/component/FeaturedStories";
import AboutSection from "@/component/AboutSection";
import Collections from "@/component/Collection"
import BehindTheShot from "@/component/BehindTheShot";
import Newsletter from "@/component/Newsletter";
import WebinarSection from "@/component/WebinarSection";
import React from "react";


export default function Home() {
  return (
      <main className="flex-1 w-full min-w-0 overflow-x-hidden">
        <Hero />
        <FeaturedStories />
        <AboutSection />
        <Collections /> 
        <BehindTheShot />
         <WebinarSection />
        <Newsletter />
      </main>
 
  );
}
