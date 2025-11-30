import Navbar from "@/components/navbar";
import HeroSection from '@/components/AboutSarthi/HeroSection';
import WhoIsSarthi from '@/components/AboutSarthi/WhoIsSarthi';
import WhyWeCreated from '@/components/AboutSarthi/WhyWeCreated';
import HowSarthiSupports from '@/components/AboutSarthi/HowSarthiSupports';
import WhyEldersLove from '@/components/AboutSarthi/WhyEldersLove';
import WhyBecomeSarthi from '@/components/AboutSarthi/WhyBecomeSarthi';
import WhoCanJoin from '@/components/AboutSarthi/WhoCanJoin';
import FinalCTA from '@/components/AboutSarthi/FinalCTA';
export default function SarthiPage() {


    return (
        <div className=" relative min-h-dvh bg-gradient-to-t to-amber-100 via-orange-50 from-white overflow-hidden ">
            <Navbar />
            <HeroSection  />
            <WhoIsSarthi />
            <WhyWeCreated />
            <HowSarthiSupports />
            {/* <WhyEldersLove /> */}
            <WhyBecomeSarthi />
            <WhoCanJoin />
            <FinalCTA  />
        </div>
    );
}