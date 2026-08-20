import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Insanos MC — Nosso combustível é a irmandade",
  description: "Original de OZ. Uma irmandade em movimento desde 2015.",
};

export default function Home() {
  return <HomeClient />;
}
