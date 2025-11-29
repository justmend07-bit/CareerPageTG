import SarthiForm from "./SarthiForm";
import Navbar from "@/components/navbar";
export default function SarthiPage() {

    
    return(
       <div className=" relative min-h-screen bg-gradient-to-t to-amber-100 via-orange-50 from-white overflow-hidden ">
            <Navbar/>
            <SarthiForm />
        </div>
    );
}