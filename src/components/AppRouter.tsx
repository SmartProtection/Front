import { Routes, Route } from "react-router-dom";
import Policy from "../containers/Policy";
import NewClaim from "../containers/NewClaim";
import ViewPolicy from "../containers/ViewPolicy";
import NewPolicy from "../containers/NewPolicy";
import ViewClaim from "../containers/ViewClaim";
import ViewClaims from "../containers/ViewClaims";
import ProcessClaim from "../containers/ProcessClaim";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Policy />}></Route>
      <Route path="/policy" element={<Policy />} />
      <Route path="/policy/view/" element={<ViewPolicy />} />
      <Route path="/policy/new" element={<NewPolicy />} />
      <Route path="/claim/new" element={<NewClaim />} />
      <Route path="/claim/view/" element={<ViewClaim />} />
      <Route path="/claim/view-all" element={<ViewClaims />} />
      <Route path="/claim/process:id" element={<ProcessClaim />} />
    </Routes>
  );
};

export default AppRouter;
