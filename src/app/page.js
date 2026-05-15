import Featured from "@/Components/Homepage/Featured";
import Banner from "../Components/Homepage/Banner";
import Choose from "@/Components/Homepage/Choose";
import Review from "@/Components/Homepage/Review";

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <Choose />
      <Review />
    </div>
  );
}
