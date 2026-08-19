import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const productsPerPage = 8;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:3000/products/all"
        );

        if (!response.ok) {
          throw new Error("No products found");
        }

        const receivedData = await response.json();

        console.log("Products:",products)

        setProducts(receivedData.products || []);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // ==========================================
  // FILTER
  // ==========================================

  const filteredProducts = products.filter((prod) => {

    const matchesSearch =
      prod.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesMin =
      minPrice === "" ||
      prod.price >= Number(minPrice);

    const matchesMax =
      maxPrice === "" ||
      prod.price <= Number(maxPrice);

    return matchesSearch && matchesMin && matchesMax;
  });


  // ==========================================
  // RESET PAGE WHEN FILTER CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice]);


  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );


  // ==========================================
  // PAGE CHANGE
  // ==========================================

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    // Scroll back to products
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="
        min-h-screen
        bg-[#F7F5F0]
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <div className="
            w-10
            h-10
            border-2
            border-[#DED9CE]
            border-t-[#2F302B]
            rounded-full
            animate-spin
            mx-auto
          " />

          <p className="
            mt-5
            text-sm
            text-[#77766D]
          ">
            Curating your collection...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="
        min-h-screen
        bg-[#F7F5F0]
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <p className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-[#9A8567]
          ">
            Collection
          </p>

          <h1 className="
            mt-4
            text-3xl
            font-light
          ">
            Unable to load products
          </h1>

          <p className="
            mt-3
            text-sm
            text-[#77766D]
          ">
            {error}
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="
      min-h-screen
      bg-[#F7F5F0]
      text-[#2F302B]
    ">


      {/* ========================================== */}
      {/* NAVBAR */}
      {/* ========================================== */}

      <nav className="
        border-b
        border-[#DED9CE]
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          h-20
          flex
          items-center
          justify-between
        ">

          <Link
            to="/"
            className="
              tracking-[0.25em]
              text-xl
              font-semibold
            "
          >
            SHOPEASE
          </Link>


          <div className="
            hidden
            md:flex
            gap-10
            text-sm
          ">

            <Link
              to="/"
              className="
                text-[#77766D]
                hover:text-[#2F302B]
              "
            >
              Home
            </Link>

            <Link
              to="/products"
              className="
                text-[#9A8567]
              "
            >
              Collection
            </Link>

          </div>


          <Link
            to="/login"
            className="
              text-sm
              text-[#77766D]
              hover:text-[#2F302B]
            "
          >
            Login
          </Link>

        </div>

      </nav>


      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <header className="
        max-w-7xl
        mx-auto
        px-6
        pt-16
        pb-12
      ">

        <p className="
          text-xs
          uppercase
          tracking-[0.35em]
          text-[#9A8567]
        ">
          Shop thoughtfully
        </p>

        <h1 className="
          mt-4
          text-5xl
          md:text-6xl
          font-light
        ">
          The Collection
        </h1>

        <p className="
          mt-5
          max-w-xl
          text-[#77766D]
          leading-7
        ">
          Explore our carefully selected collection
          of products designed for everyday living.
        </p>

      </header>


      {/* ========================================== */}
      {/* FILTERS */}
      {/* ========================================== */}

      <section className="
        border-y
        border-[#DED9CE]
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-5
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            gap-4
          ">


            {/* Search */}

            <div className="
              relative
              flex-1
            ">

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#9A988F]
              ">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search the collection..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="
                  w-full
                  bg-transparent
                  border
                  border-[#D5D1C8]
                  px-11
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#9A8567]
                "
              />

            </div>


            {/* Min */}

            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
              className="
                w-full
                lg:w-32
                bg-transparent
                border
                border-[#D5D1C8]
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#9A8567]
              "
            />


            {/* Max */}

            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="
                w-full
                lg:w-32
                bg-transparent
                border
                border-[#D5D1C8]
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#9A8567]
              "
            />


            {/* Clear */}

            {(searchTerm ||
              minPrice ||
              maxPrice) && (

              <button
                onClick={() => {
                  setSearchTerm("");
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="
                  px-5
                  py-3
                  border
                  border-[#D5D1C8]
                  text-sm
                  text-[#77766D]
                  hover:bg-[#ECE8DF]
                "
              >
                Clear
              </button>

            )}

          </div>

        </div>

      </section>


      {/* ========================================== */}
      {/* PRODUCTS */}
      {/* ========================================== */}

      <main className="
        max-w-7xl
        mx-auto
        px-6
        py-14
      ">


        {/* Results */}

        <div className="
          flex
          justify-between
          items-center
          mb-8
        ">

          <p className="
            text-sm
            text-[#77766D]
          ">

            Showing{" "}

            <span className="text-[#2F302B]">
              {filteredProducts.length === 0
                ? 0
                : startIndex + 1}
            </span>

            {" "}–{" "}

            <span className="text-[#2F302B]">
              {Math.min(
                endIndex,
                filteredProducts.length
              )}
            </span>

            {" "}of{" "}

            <span className="text-[#2F302B]">
              {filteredProducts.length}
            </span>

          </p>

        </div>


        {/* Product Grid */}

        {currentProducts.length === 0 ? (

          <div className="
            py-24
            text-center
          ">

            <h2 className="
              text-2xl
              font-light
            ">
              No products found
            </h2>

            <p className="
              mt-3
              text-sm
              text-[#77766D]
            ">
              Try changing your search or price range.
            </p>

          </div>

        ) : (

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-x-6
            gap-y-14
          ">

            {currentProducts.map((prod) => (

              <Link
                key={prod._id}
                to={`/products/${prod._id}`}
                className="group"
              >

                {/* Image */}

                <div className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  bg-[#ECE8DF]
                ">

                  <img
                    src={prod.images?.[0]}
                    alt={prod.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-700
                    "
                  />


                  {/* Wishlist */}

                  <button
                    onClick={(e) =>
                      e.preventDefault()
                    }
                    className="
                      absolute
                      top-4
                      right-4
                      w-10
                      h-10
                      rounded-full
                      bg-[#F7F5F0]/90
                      flex
                      items-center
                      justify-center
                      text-lg
                      hover:bg-white
                      transition
                    "
                  >
                    ♡
                  </button>


                  {/* Low Stock */}

                  {prod.stock <= 10 && (

                    <span className="
                      absolute
                      bottom-4
                      left-4
                      bg-[#F7F5F0]
                      px-3
                      py-2
                      text-[10px]
                      uppercase
                      tracking-widest
                    ">
                      Almost gone
                    </span>

                  )}

                </div>


                {/* Information */}

                <div className="pt-5">

                  <p className="
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-[#9A8567]
                  ">
                    {prod.category}
                  </p>


                  <div className="
                    flex
                    items-start
                    justify-between
                    gap-3
                    mt-2
                  ">

                    <h2 className="font-medium">
                      {prod.name}
                    </h2>

                    <span className="
                      whitespace-nowrap
                      text-sm
                      font-medium
                    ">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>

                  </div>


                  <p className="
                    mt-2
                    text-xs
                    leading-5
                    text-[#89877E]
                    line-clamp-2
                  ">
                    {prod.description}
                  </p>


                  <div className="
                    mt-4
                    text-xs
                    text-[#9A8567]
                    opacity-0
                    translate-y-1
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all
                  ">
                    View product →
                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}


        {/* ========================================== */}
        {/* PAGINATION */}
        {/* ========================================== */}

        {totalPages > 1 && (

          <div className="
            mt-20
            pt-8
            border-t
            border-[#DED9CE]
            flex
            items-center
            justify-center
            gap-2
          ">


            {/* Previous */}

            <button
              onClick={() =>
                goToPage(currentPage - 1)
              }
              disabled={currentPage === 1}
              className="
                px-4
                py-2
                text-sm
                border
                border-[#D5D1C8]
                disabled:opacity-30
                disabled:cursor-not-allowed
                hover:bg-[#ECE8DF]
                transition
              "
            >
              ←
            </button>


            {/* Page Numbers */}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`
                  w-10
                  h-10
                  text-sm
                  transition

                  ${
                    currentPage === page
                      ? "bg-[#2F302B] text-[#F7F5F0]"
                      : "text-[#77766D] hover:bg-[#ECE8DF]"
                  }
                `}
              >
                {page}
              </button>

            ))}


            {/* Next */}

            <button
              onClick={() =>
                goToPage(currentPage + 1)
              }
              disabled={
                currentPage === totalPages
              }
              className="
                px-4
                py-2
                text-sm
                border
                border-[#D5D1C8]
                disabled:opacity-30
                disabled:cursor-not-allowed
                hover:bg-[#ECE8DF]
                transition
              "
            >
              →
            </button>

          </div>

        )}

      </main>


      {/* ========================================== */}
      {/* FOOTER */}
      {/* ========================================== */}

      <footer className="
        border-t
        border-[#DED9CE]
        mt-10
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-10
          flex
          justify-between
          text-xs
          text-[#89877E]
        ">

          <span className="tracking-[0.2em]">
            SHOPEASE
          </span>

          <span>
            © {new Date().getFullYear()}
          </span>

        </div>

      </footer>

    </div>
  );
};

export default ProductSection;