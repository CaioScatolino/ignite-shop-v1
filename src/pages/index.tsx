import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react';

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";

export default function Home(props) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return <HomeContainer ref= {sliderRef} className="keen-slider">

    <pre>{JSON.stringify(props.list)}</pre>
    <Product className="keen-slider__slide">
      <Image src={camiseta1} width={520} height={480} alt="" />

      <footer>
        <strong> Camiseta X </strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
    <Product className="keen-slider__slide">
      <Image src={camiseta2} width={520} height={480} alt="" />

      <footer>
        <strong> Camiseta X </strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
    <Product className="keen-slider__slide">
      <Image src={camiseta3} width={520} height={480} alt="" />

      <footer>
        <strong> Camiseta X </strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
    <Product className="keen-slider__slide">
      <Image src={camiseta3} width={520} height={480} alt="" />

      <footer>
        <strong> Camiseta Mamouse </strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
  </HomeContainer>;
}

export const getServerSideProps: GetServerSideProps = async () => {

  const response = await stripe.products.list()

  // const products = response.
  
  return {
    props: {
      list: [1,2,3]
    }
  }
}