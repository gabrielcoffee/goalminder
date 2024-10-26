import Image from "next/image";
import { Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

const metadata = {
  title: "Goalminder"
}

export default function HomePage() {
  return (
    <Hero/>
  );
}
