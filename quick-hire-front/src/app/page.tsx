import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Companies from "@/components/Companies/Companies";
import Category from "@/components/Category/Category";
import CTABanner from "@/components/CTABanner/CTABanner";
import FeaturedJobs from "@/components/FeaturedJobs/FeaturedJobs";
import LatestJobs from "@/components/LatestJobs/LatestJobs";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Header />
        <Companies />
        <Category />
        <CTABanner />
        <FeaturedJobs />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  );
}
