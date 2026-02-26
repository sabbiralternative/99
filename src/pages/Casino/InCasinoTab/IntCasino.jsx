/* eslint-disable react/no-unknown-property */
// import { useEffect, useState } from "react";
// import { useMac88AllQuery } from "../../../redux/features/casino/casino.api";
import CasinoThumbnail from "./CasinoThumbnail";
import Tab2 from "./Tab2";
import Tab1 from "./Tab1";
// import { useSelector } from "react-redux";
import { useGetIndex } from "../../../hooks";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
// import { useLocation } from "react-router-dom";

const IntCasino = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const category = params.get("category");
  // const [filteredData, setFilteredData] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  // const { data } = useMac88AllQuery();
  // /* all tables key data */
  // const allTables = data?.data?.allTables;
  // /* tables key data */
  // const tables = data?.data?.tables?.[100000];
  // /* Table category */
  // const tablesCategory = tables && Object.keys(tables);

  // const filterSubCategory = () => {
  //   if (selectedCategory !== "All") {
  //     const tableKeyData =
  //       tables &&
  //       Object.values(tables)
  //         .flatMap((obj) => Object.values(obj))
  //         .flat();
  //     /* Filter the category data which in clicked on first tab */
  //     const subCategoryData = tableKeyData?.filter(
  //       (item) => item?.product === selectedCategory
  //     );
  //     /* Make unique array of category from filtered result  */
  //     const subCategory =
  //       subCategoryData &&
  //       Array.from(new Set(subCategoryData.map((item) => item.category)));

  //     return subCategory;
  //   } else {
  //     const allTablesCategory = allTables && Object.keys(allTables);
  //     return allTablesCategory;
  //   }
  // };

  // useEffect(() => {
  //   const filterData = () => {
  //     if (selectedCategory !== "All") {
  //       if (selectedSubCategory !== "All") {
  //         const tableKeyData =
  //           tables &&
  //           Object.values(tables)
  //             .flatMap((obj) => Object.values(obj))
  //             .flat();
  //         const casinoData = tableKeyData?.filter(
  //           (item) => item?.category === selectedSubCategory
  //         );
  //         return casinoData;
  //       } else {
  //         const tableKeyData =
  //           tables &&
  //           Object.values(tables)
  //             .flatMap((obj) => Object.values(obj))
  //             .flat();
  //         const casinoData = tableKeyData?.filter(
  //           (item) => item?.product === selectedCategory
  //         );

  //         return casinoData;
  //       }
  //     } else {
  //       const casinoData =
  //         allTables && typeof allTables === "object"
  //           ? selectedSubCategory === "All"
  //             ? Object.values(allTables).flat()
  //             : Object.values(allTables)
  //                 .flat()
  //                 .filter((item) => item?.category === selectedSubCategory)
  //           : [];

  //       return casinoData;
  //     }
  //   };
  //   setFilteredData(filterData());
  // }, [selectedCategory, selectedSubCategory, allTables, tables]);

  // useEffect(() => {
  //   setSelectedSubCategory("All");
  // }, [selectedCategory]);

  // useEffect(() => {
  //   if (category) {
  //     if (category === "Fun Games") {
  //       setSelectedCategory(category);
  //     } else {
  //       setSelectedSubCategory(category);
  //     }
  //   }
  // }, [category]);

  // const { token } = useSelector((state) => state.auth);
  const { data } = useGetIndex({
    type: "99_all_casino",
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const category = params.get("category");

  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const allTables = data?.data?.allTables;
  // const tables = data?.data?.tables?.[100000];

  // const handleNavigateToIFrame = (casino) => {
  //   if (!token) return navigate("/login");
  //   navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`);
  // };

  const allGames =
    allTables &&
    Object.values(allTables).flatMap((provider) =>
      Object.values(provider).flat(),
    );

  // const tablesGames =
  //   tables &&
  //   Object.values(tables).flatMap((provider) => Object.values(provider).flat());

  const categories =
    allGames && Array.from(new Set(allGames?.map((game) => game?.product)));

  // const a =
  //   allGames && allGames?.find((game) => game.product === "BIKINI GAMES");
  // console.log(a);
  // console.log(categories);

  const subCategories = useMemo(() => {
    if (allGames && categories && product === "All") {
      return Array.from(new Set(allGames?.map((game) => game?.category)));
    }
    if (allGames && categories && product !== "All") {
      const allCategory = allGames?.filter((game) => game?.product === product);
      return Array.from(new Set(allCategory?.map((game) => game?.category)));
    }
  }, [categories, allGames, product]);

  const filteredData = useMemo(() => {
    if (allGames && categories && subCategories) {
      if (search) {
        return allGames?.filter((game) => game?.category?.includes(search));
      }
      if (!search) {
        if (product === "All" && category === "All") {
          return allGames;
        }
        if (product === "All" && category !== "All") {
          return allGames?.filter((game) => game?.category === category);
        }
        if (product !== "All" && category === "All") {
          return allGames?.filter((game) => game?.product === product);
        }
        if (product !== "All" && category !== "All") {
          return allGames?.filter(
            (game) => game?.product === product && game?.category === category,
          );
        }
      }
    }
  }, [allGames, categories, category, subCategories, product, search]);

  return (
    <div _ngcontent-hot-c46 className="tab-content">
      <div
        _ngcontent-hot-c97
        role="tabpanel"
        aria-labelledby
        className="tab-pane active"
      >
        <div _ngcontent-hot-c97 _nghost-hot-c96>
          <div _ngcontent-hot-c96 className="casino-tables">
            <div
              _ngcontent-hot-c96
              className="container-fluid"
              style={{ marginLeft: "5px", marginRight: "5px" }}
            >
              <div _ngcontent-hot-c96 className="row row5 mt-2">
                <div
                  _ngcontent-hot-c96
                  className="col-md-12"
                  style={{ paddingRight: "5px", paddingLeft: "5px" }}
                >
                  <div
                    _ngcontent-hot-c96
                    className="int-casino tab-container"
                    _nghost-hot-c46
                  >
                    <Tab1 categories={categories} selectedCategory={product} />

                    {/* Tab 2 */}
                    <div _ngcontent-hot-c46 className="tab-content">
                      <div
                        _ngcontent-hot-c96
                        role="tabpanel"
                        aria-labelledby="goto-p-casino-0-link"
                        id="goto-p-casino-0"
                        className="tab-pane active"
                      >
                        <div _ngcontent-hot-c96 className="icasino_ul_tabs">
                          <div
                            _ngcontent-hot-c96
                            _nghost-hot-c46
                            className="tab-container"
                          >
                            <Tab2
                              product={product}
                              selectedSubCategory={category}
                              subCategories={subCategories}
                            />
                            <CasinoThumbnail casinoData={filteredData} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntCasino;
