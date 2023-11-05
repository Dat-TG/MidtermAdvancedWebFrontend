import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    document.title = "Landing";
  }, []);
  return <>Landing Page</>;
}

export default LandingPage;
