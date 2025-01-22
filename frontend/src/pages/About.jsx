import React from "react";
import Title from "../components/Title";
import NewsletterBox from '../components/NewsletterBox'
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            consequatur distinctio facere fugiat natus, nam tenetur cum,
            veritatis dicta, repellendus ad? Ratione natus totam tempora itaque
            laborum culpa, odit debitis. Animi minima, ipsa alias eius a, non
            autem esse quas ab natus harum? Aperiam mollitia repellat cumque
            quas iste porro non voluptate. Quo, autem rerum excepturi vel nihil
            totam placeat?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            quo voluptas sapiente, beatae eius sequi pariatur harum labore
            veritatis. Ipsum veniam, maiores tempore praesentium ab cupiditate
            sit est iste aliquid! Culpa distinctio impedit expedita quisquam sit
            quos accusamus consectetur corporis voluptates modi perferendis odit
            quam iusto, ad adipisci? Quaerat odit animi sequi cum dolores
            maiores quae odio eum suscipit autem.
          </p>
          <b className="text-gray-800">Our mission </b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Exercitationem quos dignissimos nulla est obcaecati quidem ut quo
            tempore cupiditate ipsam.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-20 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            maiores nisi soluta illum sit repellat quia architecto numquam, eos
            sunt reprehenderit officiis impedit exercitationem! Provident, nobis
            obcaecati sint voluptate esse, laudantium officiis saepe at illum
            aperiam commodi deleniti inventore rerum.
          </p>
        </div>
        <div className="border px-20 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            maiores nisi soluta illum sit repellat quia architecto numquam, eos
            sunt reprehenderit officiis impedit exercitationem! Provident, nobis
            obcaecati sint voluptate esse, laudantium officiis saepe at illum
            aperiam commodi deleniti inventore rerum.
          </p>
        </div>
        <div className="border px-20 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            maiores nisi soluta illum sit repellat quia architecto numquam, eos
            sunt reprehenderit officiis impedit exercitationem! Provident, nobis
            obcaecati sint voluptate esse, laudantium officiis saepe at illum
            aperiam commodi deleniti inventore rerum.
          </p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
