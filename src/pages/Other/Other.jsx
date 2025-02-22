import Header from "../../components/modules/Home/Header";

const Other = () => {
  return (
    <>
      <Header />
      <div className="tab-content">
        <tab role="tabpanel" aria-labelledby className="tab-pane active">
          <div className="container">
            <div className="row my-2">
              <div className="col-12">
                <img
                  src="/m/src/assets/img/poster-binary.webp"
                  className="img-fluid mb-2 ng-star-inserted"
                />
              </div>
            </div>
          </div>
        </tab>
      </div>
    </>
  );
};

export default Other;
