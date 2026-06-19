import ArtistCTA from "@/components/ArtistCTA";
import FeaturedArtworks from "@/components/FeaturedArtworks";
import HeroPage from "@/components/HeroPage";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <HeroPage/>
    <FeaturedArtworks/>
    <ArtistCTA/>
   </div>
  );
}
