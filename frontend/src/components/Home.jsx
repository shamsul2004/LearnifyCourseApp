import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  // Slider settings
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2300,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-black min-h-screen text-white">
      <div className="container mx-auto">

        {/* Navbar */}
        <header className="flex items-center justify-between p-6 shadow-lg backdrop-blur-md bg-white/5 rounded-xl mt-4 mx-2 md:mx-0">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="" className="w-10 h-10 rounded-full shadow-md" />
            <h1 className="text-2xl md:text-3xl text-orange-500 font-bold tracking-wide">
              Learnify
            </h1>
          </div>

          <div className="space-x-3 md:space-x-5">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-500 drop-shadow-lg">
            Learnify
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            Learn skills that move you ahead — Anytime. Anywhere.
          </p>

          <div className="space-x-4 mt-8">
            <Link
              to="/courses"
              className="bg-green-500 py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Explore Courses
            </Link>

            <Link
              to="https://www.youtube.com/learncodingofficial"
              target="_blank"
              className="bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition"
            >
              Course Videos
            </Link>
          </div>
        </section>

        {/* Courses Section */}
        <section className="px-6 pb-20">
          <h2 className="text-3xl font-bold mb-6 text-orange-400 text-center">
            Popular Courses
          </h2>

          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="bg-gray-900 rounded-xl overflow-hidden transform hover:scale-105 transition">
                  <img
                    src={course.image.url}
                    alt=""
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white">
                      {course.title}
                    </h3>

                    <Link
                      to={`/buy/${course._id}`}
                      className="mt-4 inline-block bg-orange-500 py-2 px-5 rounded-full hover:bg-blue-600 transition font-semibold"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr className="border-gray-600" />

        {/* Footer */}
        <footer className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

            {/* Logo + Socials */}
            <div>
              <div className="flex items-center space-x-3">
                <img src={logo} alt="" className="w-12 h-12 rounded-full" />
                <h1 className="text-3xl text-orange-500 font-bold">Learnify</h1>
              </div>

              <p className="mt-4">Follow us</p>
              <div className="flex space-x-4 mt-2">
                <FaFacebook className="text-2xl hover:text-blue-400 cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-pink-600 cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-blue-600 cursor-pointer" />
              </div>
            </div>

            {/* Connects */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">YouTube - Learn Coding</li>
                <li className="hover:text-white cursor-pointer">Telegram - Learn Coding</li>
                <li className="hover:text-white cursor-pointer">GitHub - Learn Coding</li>
              </ul>
            </div>

            {/* Policies */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">© 2025 Learnify</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Refund & Cancellation</li>
              </ul>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Home;
