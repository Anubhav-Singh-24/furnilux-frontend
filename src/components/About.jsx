import { NavLink } from 'react-router-dom';
import aboutBanner from '../assets/about_banner.jpg'
import logo from "../assets/logo.png";
import foundersImg from "../assets/founders.jpeg"
import furniture1 from "../assets/furniture1.jpg"
import furniture2 from "../assets/furniture2.jpg"

const About = () => {

  const philosophy = [
    {
      topic: "Customer Experience",
      content: `At FurniLux, our customers are at the heart of everything we do. We
            strive to create an exceptional shopping experience, from the moment
            you browse our collections to the day your new furniture piece finds
            its place in your home. Our dedicated customer service team is
            always ready to assist, ensuring that every interaction is seamless
            and satisfying. We value your feedback and continuously work to
            improve our products and services to meet your highest expectations`,
    },
    {
      topic: "Quality",
      content: `Quality is the cornerstone of FurniLux. We are committed to using
            only the finest materials and employing skilled artisans who take
            pride in their craftsmanship. Each piece of furniture is
            meticulously constructed to ensure durability and longevity, so you
            can enjoy its beauty and functionality for years to come. Our
            rigorous quality control processes guarantee that every item meets
            our high standards before it reaches your doorstep.`,
    },
    {
      topic: "Sustainability",
      content: `Sustainability is a core value at FurniLux. We believe in
            responsible sourcing and environmentally friendly practices that
            minimize our impact on the planet. From using sustainably harvested
            wood to incorporating eco-friendly finishes, we are dedicated to
            creating furniture that is as kind to the earth as it is to your
            home. Our commitment to sustainability extends beyond our products,
            as we continually seek ways to reduce our carbon footprint and
            promote green living.`,
    },
    {
      topic: "Comfort",
      content: `Comfort is essential in creating a home that feels welcoming and
            lived-in. At FurniLux, we design our furniture with ergonomics and
            relaxation in mind. Each piece is thoughtfully crafted to provide
            maximum comfort, whether it’s a cozy armchair for your reading nook
            or a spacious sofa for family gatherings. We understand that true
            comfort goes beyond physical ease; it’s about creating spaces that
            foster a sense of well-being and tranquility.`,
    },
    {
      topic: "Strong Aesthetics",
      content: `Aesthetics are at the forefront of our design philosophy at
            FurniLux. We believe that furniture should be a harmonious blend of
            form and function, reflecting both style and practicality. Our
            designs are inspired by the beauty of nature and the elegance of
            modern trends, resulting in pieces that are visually stunning and
            timeless. We aim to create furniture that not only enhances your
            home’s decor but also becomes a statement of your personal taste and
            style.`,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-20 pb-10">
      <div className="relative flex items-center justify-center w-full xl:h-[40vh] h-[30vh]">
        <img
          src={aboutBanner}
          alt="about"
          className="w-full h-full opacity-65 rounded-3xl"
        />
        <div className="absolute backdrop-blur-sm w-full rounded-3xl h-full flex flex-col gap-3 justify-center items-center">
          <img src={logo} alt="logo" className="w-10" />
          <span className="text-3xl font-semibold">About</span>
          <div className="flex gap-2 items-center">
            <NavLink to={"/"} className="hover:underline font-bold">
              Home
            </NavLink>
            <span className="font-bold text-lg">&gt;</span>
            <span>About</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center xl:px-40 md:px-10 px-5">
        <h1 className="text-4xl text-center">
          Nature inspired designs, Hand-crafted with love.
        </h1>
        <p className="text-center">
          At <span className="font-bold">FurniLux</span>, we bring the beauty of
          nature into your home with our exquisite, hand-crafted furniture. Each
          piece is thoughtfully designed and meticulously crafted with love,
          inspired by the serene and timeless elements of the natural world. Our
          commitment to quality and artistry ensures that every item not only
          enhances your living space but also tells a story of passion and
          dedication. Discover the perfect blend of nature and craftsmanship
          with FurniLux, where every piece is a masterpiece.
        </p>
      </div>
      <div className="flex xl:flex-row flex-col gap-10 xl:px-40 md:px-10 px-5 w-full">
        <div className="xl:w-1/2 w-full xl:h-[95vh] h-[70vh] flex items-center justify-center">
          <img
            src={foundersImg}
            alt="founders"
            className="xl:w-[90%] md:w-[70%] w-full h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-10 justify-center items-center xl:w-1/2 w-full">
          <h1 className="text-3xl font-bold">Meet Our Founders</h1>
          <p>
            FurniLux was founded by{" "}
            <span className="font-bold">Emily Harper and Jonathan Reed</span>,
            two passionate visionaries with a shared love for design and nature.
            Emily, with her background in fine arts and interior design, always
            dreamed of creating pieces that blend the elegance of modern
            aesthetics with the raw beauty of natural elements. Jonathan, an
            experienced craftsman with a deep appreciation for sustainable
            materials, brings a wealth of knowledge in woodworking and
            eco-friendly practices. Together, they embarked on a journey to
            create a brand that reflects their values of quality,
            sustainability, and timeless design.
          </p>
          <p>
            Emily's journey began in her small art studio, where she spent
            countless hours sketching and conceptualizing furniture pieces that
            could transform any space into a sanctuary. Her keen eye for detail
            and her ability to draw inspiration from the natural world quickly
            set her apart in the design community. Jonathan, on the other hand,
            grew up surrounded by the rich forests of the Pacific Northwest,
            where he learned the art of woodworking from his grandfather. His
            hands-on experience and dedication to using sustainably sourced
            materials perfectly complemented Emily's visionary designs.
          </p>
          <p>
            The partnership between Emily and Jonathan is the heart and soul of
            FurniLux. Their combined expertise and unwavering commitment to
            their craft have resulted in a collection of furniture that is not
            only beautiful but also environmentally conscious. Each piece is a
            testament to their belief that furniture should be more than just
            functional—it should be a work of art that enhances the lives of
            those who use it. Through FurniLux, Emily and Jonathan continue to
            inspire and be inspired, creating timeless pieces that bring the
            serenity of nature into homes around the world.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 lg:px-40 md:px-10 px-5">
        <h1 className="text-4xl text-center">Our Brand Philosophy</h1>
        <div className="flex xl:flex-row flex-col gap-5 justify-center items-center w-full">
          <img
            src={furniture1}
            alt="furnitures"
            className="xl:w-1/2 md:w-[70%] w-full xl:h-[95vh] h-[70vh] rounded-lg"
          />
          <img
            src={furniture2}
            alt="furnitures"
            className="xl:w-1/2 md:w-[70%] w-full xl:h-[95vh] h-[70vh] rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-7">
          {philosophy.map((items, index) => {
            return (
              <div className="flex flex-col gap-2" key={index}>
                <span className="text-xl font-semibold">{items.topic}</span>
                <p>{items.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default About
