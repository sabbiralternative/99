/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useMac88AllQuery } from "../../../redux/features/casino/casino.api";
import CasinoThumbnail from "./CasinoThumbnail";
import Tab2 from "./Tab2";
import Tab1 from "./Tab1";

const CasinoTab = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("MAC88");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [filterCategoryData, setFilterCategoryData] = useState([]);
  const { data } = useMac88AllQuery();

  /* tables key data */
  const tables = data?.data?.tables?.[100000];

  useEffect(() => {
    const getCategory = () => {
      if (tables) {
        /* Get only four key */
        const {
          MAC88,
          ["Mac88 Virtuals"]: mac88Virtuals,
          ["Color Prediction"]: colorPrediction,
          ["Fun Games"]: funGames,
        } = tables;
        /* Make a object of four key */
        const filteredData = {
          MAC88,
          mac88Virtuals,
          colorPrediction,
          funGames,
        };
        /* Get data in a single array from four object */
        const tableKeyData =
          filteredData &&
          Object.values(filteredData)
            .flatMap((obj) => Object.values(obj))
            .flat();

        /*get category for first tab */
        const categories = Array.from(
          new Set(tableKeyData.map((item) => item.product))
        );
        setCategories(categories);
        /* get category for first tab */

        /* get sub category for first tabt */
        const filterCasinoByProduct = tableKeyData?.filter(
          (item) => item?.product === selectedCategory
        );
        const subCategory = Array.from(
          new Set(filterCasinoByProduct.map((item) => item.category))
        );

        setSubCategories(subCategory);
        /*get sub category for first tab*/

        /* Get actual data by  category */
        if (selectedSubCategory !== "All") {
          const filterCasinoByCategory = filterCasinoByProduct?.filter(
            (item) => item?.category === selectedSubCategory
          );
          setFilterCategoryData(filterCasinoByCategory);
        } else {
          setFilterCategoryData(filterCasinoByProduct);
        }
      }
    };
    getCategory();
  }, [tables, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    setSelectedSubCategory("All");
  }, [selectedCategory]);

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
              className="container-fluid "
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
                    <Tab1
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />

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
                              setSelectedSubCategory={setSelectedSubCategory}
                              selectedSubCategory={selectedSubCategory}
                              categories={subCategories}
                            />
                            <CasinoThumbnail casinoData={filterCategoryData} />
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

export default CasinoTab;
