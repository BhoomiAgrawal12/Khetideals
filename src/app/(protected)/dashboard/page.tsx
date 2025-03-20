import { auth, signOut } from "../../../../auth";
// import { getAllCoordinates } from "../../../../data/user";
import "../components/buyer.css";
import dynamic from "next/dynamic";
// import FarmerProfile from "../farmerManageProfile/page";
import Link from "next/link";
import BuyerSidebar from "../components/BuyerSidebar";
import BDash from "../components/BDash";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
import { GetServerSideProps } from "next";
import FDash from "../components/FDash";
// import FarmerDashboard from "../components/FarmerDashboard";
// import { GetServerSideProps } from "next";

// type Props = {
//   hasDocument: boolean;
// };

const SettingsPage = async () => {
  const session = await auth();


  const user = session?.user.role?.toLocaleLowerCase();
  console.log(user);
  // const coordinates = await getAllCoordinates();
  // console.log(
  //   coordinates.map((coord) => {
  //     console.log(coord.latitude);
  //     console.log(coord.longitude);
  //   })
  // );
  // const user = "farmer";

  const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
    ssr: false,
  });
  const MapWithNoSSRBuyer = dynamic(
    () => import("../components/MapComponentBuyer"),
    {
      ssr: false,
    }
  );

  // TODO form validation

  // const router = useRouter();
  return (
    <div>
      {/* {JSON.stringify(session?.user)} */}

      {/* <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form> */}

      {user === "farmer" ? (
        <div className="container">
          <div className="sidebar">
            <FDash />
          </div>
          <div className="main-content">
            <div className="section placeholder-container">
              {/* Placeholder for map or other content */}
              <div className="flex flex-row w-full">
                {/* Map component */}
                <MapWithNoSSR />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <BuyerSidebar />
          {/* <BDash /> */}

          {/* Farmer Dashboard and Search Section */}
          <div className="dashboard-content">
            <div className="farmer-finder">
              {/* <h1 className="search-profile">Search Potential Farmers</h1>
              <div className="form-group text-black">
                <label htmlFor="cropType">Crop Type</label>
                <select id="cropType" className="select2">
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="barley">Barley</option>
                  <option value="corn">Corn</option>
                </select>
              </div> */}

              {/* <div className="form-group text-black">
                <label htmlFor="quality">Quality</label>
                <select id="quality">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div> */}

              {/* <div className="form-group text-black">
                <label htmlFor="farmerLocation">Location</label>
                <input type="text" id="farmerLocation" />
              </div>
              <div className="form-group text-black">
                <label htmlFor="minQuantity">Minimum Quantity</label>
                <input type="number" id="minQuantity" />
              </div>
              <button
                id="searchBtn"
                // onClick={searchFarmers}
              >
                Search
              </button> */}

              {/* <div className="farmer-list">
                <h3>Farmers List</h3>
                <ul id="farmerList">
                </ul>
              </div>
              <div className="section" id="contracts-section">
                <h2>Current Contracts</h2>
              </div> */}
              {/* Replace map with a simple div */}
              <MapWithNoSSRBuyer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
