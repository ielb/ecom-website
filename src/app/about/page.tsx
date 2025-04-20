import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about our story, mission, and values.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              We are crafting the future of fashion
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2018, our company started with a simple mission: to
              create high-quality, sustainable clothing that doesn&apos;t
              compromise on style or comfort. Today, we&apos;re a global brand
              with a commitment to ethical practices and innovative design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">Explore Products</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Team meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The journey from a small idea to a growing brand, driven by passion
            and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-3">2018: The Beginning</h3>
            <p className="text-gray-600">
              Started in a small studio with just three designers and a vision
              to create ethical, sustainable fashion that doesn&apos;t
              compromise on style.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-3">2020: Growth Phase</h3>
            <p className="text-gray-600">
              Expanded our team and product line, focusing on building an online
              presence and developing our unique brand identity in the
              marketplace.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-3">2023: Going Global</h3>
            <p className="text-gray-600">
              Launched international shipping, partnered with sustainable
              manufacturers worldwide, and committed to carbon-neutral
              operations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-20 bg-gray-50 p-12 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Mission"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe fashion should be ethical, sustainable, and accessible.
              Our mission is to create high-quality clothing that minimizes
              environmental impact while maximizing comfort and style.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-black text-white flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                  1
                </span>
                <span>
                  Source sustainable materials that reduce environmental impact
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-black text-white flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                  2
                </span>
                <span>
                  Partner with ethical manufacturers that provide fair wages
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-black text-white flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                  3
                </span>
                <span>
                  Design timeless pieces that transcend seasonal trends
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-black text-white flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                  4
                </span>
                <span>Make sustainable fashion accessible and affordable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind our brand who bring creativity,
            dedication, and expertise to everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              bio: "With over 15 years in fashion, Sarah founded our company with a vision for sustainable style.",
            },
            {
              name: "Michael Chen",
              role: "Creative Director",
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              bio: "Michael brings innovative design expertise from his background at major fashion houses.",
            },
            {
              name: "Amara Okafor",
              role: "Head of Sustainability",
              image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              bio: "Amara ensures our environmental commitments are met at every stage of production.",
            },
            {
              name: "James Rivera",
              role: "Operations Manager",
              image:
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              bio: "James oversees our global supply chain to ensure efficiency and ethical practices.",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Core principles that guide every decision we make and product we
            create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-3">Sustainability</h3>
            <p className="text-gray-600 mb-4">
              We use eco-friendly materials and processes to reduce our
              environmental footprint. Our packaging is 100% recyclable, and
              we&apos;re working toward carbon neutrality by 2025.
            </p>
          </div>
          <div className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-3">Ethical Production</h3>
            <p className="text-gray-600 mb-4">
              We work only with factories that provide fair wages and safe
              working conditions. Every partner must sign our code of conduct
              and undergo regular audits.
            </p>
          </div>
          <div className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-3">Quality Craftsmanship</h3>
            <p className="text-gray-600 mb-4">
              We believe in creating products that last. Our designs focus on
              durability and timeless style, not fast fashion that ends up in
              landfills.
            </p>
          </div>
          <div className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
            <p className="text-gray-600 mb-4">
              Fashion should be for everyone. We design for diverse body types
              and work to ensure our pricing makes sustainable fashion
              accessible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us On Our Journey</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Discover our latest collections and be part of a movement toward more
          sustainable and ethical fashion choices.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              size="lg"
            >
              Shop Collection
            </Button>
          </Link>
          <Link href="/newsletter">
            <Button className="bg-white text-black hover:bg-gray-200" size="lg">
              Subscribe to Newsletter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
