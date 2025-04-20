import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.avif"
          alt="Spring Collection"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
        <h1 className="text-6xl font-bold mb-4">TULOS SPRING COLLECTION</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Find out our best spring collection. Offering our best quality product
          in a Tulus Spring Collection
        </p>
        <Button
          variant="default"
          size="lg"
          className="w-fit bg-white text-black hover:bg-gray-100"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
