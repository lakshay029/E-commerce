import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import BestSeller from "./BestSeller";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2F302B]">

      {/* NAVBAR */}
      <nav className="border-b border-[#DED9CE]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer tracking-[0.25em] text-xl font-semibold"
          >
            SHOPEASE
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm tracking-wide">
            <button className="hover:text-[#8A7960] transition">
              Home
            </button>

            <button
              
              className="hover:text-[#8A7960] transition"
              ><Link
                    to="/products"
                    className="
                      hover:text-[#9A8567]
                      transition
                    "
                  >
                    Collection
                  </Link>
            </button>

            <button className="hover:text-[#8A7960] transition">
              About
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">

            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block text-sm hover:text-[#8A7960] transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="
                px-5 py-2.5
                bg-[#2F302B]
                text-[#F7F5F0]
                text-sm
                tracking-wide
                hover:bg-[#45463F]
                transition
              "
            >
              Sign Up
            </button>

            <button className="text-xl">
              🛒
            </button>

          </div>
        </div>
      </nav>


      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6">

        <div className="
          min-h-[620px]
          grid lg:grid-cols-2
          items-center
          gap-12
          py-16
        ">

          {/* Hero Text */}
          <div className="max-w-xl">

            <p className="
              text-xs
              tracking-[0.3em]
              uppercase
              text-[#9A8567]
              mb-6
            ">
              The new collection
            </p>

            <h1 className="
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-light
              leading-[1.05]
              tracking-tight
            ">
              Designed for
              <span className="block italic font-serif mt-2">
                everyday living.
              </span>
            </h1>

            <p className="
              mt-7
              text-[#6D6D64]
              leading-7
              max-w-md
            ">
              Discover thoughtfully selected products that
              combine timeless design, quality and everyday
              functionality.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="
                mt-9
                group
                flex
                items-center
                gap-4
                text-sm
                font-medium
                tracking-wide
              "
            >
              <span className="
                border-b
                border-[#2F302B]
                pb-1
                group-hover:border-[#9A8567]
              ">
                Explore collection
              </span>

              <span className="
                group-hover:translate-x-2
                transition-transform
              ">
                →
              </span>
            </button>

          </div>


          {/* Hero Image */}
          <div className="
            relative
            h-[500px]
            lg:h-[600px]
            overflow-hidden
            bg-[#E8E3D8]
          ">

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Premium product"
              className="
                w-full
                h-full
                object-cover
              "
            />

            {/* Image overlay */}
            <div className="
              absolute
              inset-0
              bg-black/5
            " />

            {/* Small label */}
            <div className="
              absolute
              bottom-6
              left-6
              bg-[#F7F5F0]/90
              backdrop-blur-sm
              px-5
              py-3
            ">
              <p className="text-xs tracking-widest uppercase">
                Curated selection
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* SMALL INTRO STRIP */}
      <section className="border-y border-[#DED9CE]">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-5
          text-center
          md:text-left
        ">

          <p className="text-sm tracking-wide text-[#6D6D64]">
            Quality products, thoughtfully selected.
          </p>

          <div className="flex gap-8 text-xs uppercase tracking-widest text-[#8A7960]">
            <span>Quality</span>
            <span>Crafted</span>
            <span>Reliable</span>
          </div>

        </div>

      </section>


      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          justify-between
          mb-12
        ">

          <div>

            <p className="
              text-xs
              tracking-[0.3em]
              uppercase
              text-[#9A8567]
            ">
              The edit
            </p>

            <h2 className="
              mt-3
              text-4xl
              md:text-5xl
              font-light
              tracking-tight
            ">
              Best Sellers
            </h2>

            <p className="
              mt-4
              text-sm
              text-[#77766D]
            ">
              Our most sought-after pieces.
            </p>

          </div>

          <button
            onClick={() => navigate("/products")}
            className="
              mt-6
              md:mt-0
              text-sm
              border-b
              border-[#2F302B]
              pb-1
              hover:text-[#9A8567]
              hover:border-[#9A8567]
              transition
            "
          >
            View all products →
          </button>

        </div>

        <BestSeller />

      </section>


      {/* LUXURY CTA */}
      <section className="
        bg-[#2F302B]
        text-[#F7F5F0]
      ">

        <div className="
          max-w-5xl
          mx-auto
          px-6
          py-24
          text-center
        ">

          <p className="
            text-xs
            tracking-[0.3em]
            uppercase
            text-[#B69B72]
          ">
            Shop differently
          </p>

          <h2 className="
            mt-5
            text-4xl
            md:text-5xl
            font-light
          ">
            Less noise.
            <span className="italic font-serif">
              {" "}Better choices.
            </span>
          </h2>

          <p className="
            mt-5
            text-[#BDBDB4]
            max-w-lg
            mx-auto
          ">
            Explore our collection and find products
            made for the way you live.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="
              mt-8
              px-7
              py-3
              border
              border-[#B69B72]
              text-[#F7F5F0]
              text-sm
              tracking-wide
              hover:bg-[#B69B72]
              hover:text-[#2F302B]
              transition
            "
          >
            Explore Collection
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="bg-[#F7F5F0]">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-12
          flex
          flex-col
          md:flex-row
          justify-between
          gap-8
        ">

          <div>

            <div className="
              tracking-[0.25em]
              font-semibold
            ">
              SHOPEASE
            </div>

            <p className="
              mt-3
              text-sm
              text-[#77766D]
            ">
              Thoughtfully selected. Simply yours.
            </p>

          </div>

          <div className="flex gap-8 text-sm text-[#6D6D64]">

            <a href="#" className="hover:text-[#2F302B]">
              About
            </a>

            <a href="#" className="hover:text-[#2F302B]">
              Contact
            </a>

            <a href="#" className="hover:text-[#2F302B]">
              Privacy
            </a>

          </div>

        </div>

        <div className="
          border-t
          border-[#DED9CE]
          text-center
          py-5
          text-xs
          text-[#929188]
        ">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>

      </footer>

    </div>
  );
};

export default HomePage;