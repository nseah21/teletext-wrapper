"use client";

import Credits from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Results from "@/components/OtherResults";

export default function Home(props) {
  return (
    <>
      <Layout>
        <Header firstPrize={props.firstPrize} secondPrize={props.secondPrize} thirdPrize={props.thirdPrize} drawDate={props.drawDate} metadata={props.metadata} />
          <Results />
          <Credits />
      </Layout>
    </>
  );
}
