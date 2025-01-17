import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PlanHandIcon } from "./common/Icons";

const PricePlan = () => {
  const location = useLocation();

  return (
    <div className="mt-4">
      {location.pathname === "/dashboard/pricing/price" ? (
        ""
      ) : (
        <div>
          <div className="text-center mb-3 bg-white shadow-sm p-3 rounded-lg">
            <h5 className="text-primary_clr mb-3 text-base font-bold">
              Brokers Available in 1Cliq
            </h5>
            <div className="d-flex flex-wrap justify-content-center mt-2">
              {[
                "FYERS",
                "ZERODHA*",
                "TRADESMART",
                "FINVASIA",
                "KOTAK NEO",
                "FLAT TRADE",
                "PROSTOCKS",
                "5 PAISA",
                "ALICE BLUE",
                "DHAN",
                "GOODWILL",
                "ESPRESSO",
                "ZEBU",
                "UPSTOX",
                "ASTHA TRADE",
                "TRADEJINI",
                "AC AGARWAL XTS",
                "CHOICE INDIA",
                "JAINAM DUCK",
                "JAINAM XTS RETAIL*",
                "JAINAM XTS-SERVER A*",
                "JAINAM XTS-SERVER B*",
                "NIRMAL BANG XTS*",
              ].map((broker, index) => (
                <button
                  key={index}
                  className="btn_light btn-outline-secondary flex items-center  btn-sm mx-1 mb-2 !py-1.5 rounded-5 h-[28px] justify-center"
                >
                  {broker}
                </button>
              ))}
            </div>
            <p className="mb-0 pt-3">
              <small className="text-primary_clr text-[13px] font-light">
                (Broker having * in name charges separate fee from user for api
                access which they have to pay directly to the broker only)
              </small>
            </p>
          </div>

          <div className="row ">
            <div className="col-md-6 mb-3">
              <div className="text-center h-100 flex flex-col justify-between bg-white rounded-md !border !border-tertiary_clr p-3">
                <div className="">
                  <div className="card-header flex flex-col items-center">
                    <PlanHandIcon />
                    <h5 className="mb-2 mt-3 text-primary_clr font-medium text-lg sm:text-xl lg:text-2xl">
                      Go Cliq
                    </h5>
                    <p className="text-[13px] text-tertiary_clr rounded-2xl  !bg-secondry_clr px-2 py-1">
                      FOR 1 MONTH
                    </p>
                  </div>
                  <div className="card-body">
                    <div className=" flex justify-center gap-1 text-primary_clr">
                      ₹
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl mb-0 text-tertiary_clr ">
                        1599{" "}
                        <span className="text-sm text-primary_clr">/ month</span>
                      </h3>
                    </div>
                    <p className="text-muted ms-2 text-primary_clr">
                      {" "}
                      ( Excluding GST)
                    </p>
                    <ul className="list-unstyled">
                      <li className="text-sm pb-3 text-primary_clr">
                        7 Broker(s) Allowed
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Basket Order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Place Unlimited Qty
                      </li>

                      <li className="text-sm pb-3 text-primary_clr">
                        All Market Order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        MTM Target And SL
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Take trade on single click
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Multiple Broker at single place (1 Broker at a time)
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Close All Positions
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Trailing SL & Manual SL
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Live MTM update
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Predefined Auto SL & Target
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Limit order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        LTP Limit order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Keyboard Shortcuts
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Email Support Only
                      </li>
                    </ul>
                  </div>
                </div>
                <Link to={"price"} className="btn_dark text-sm">
                  SUBSCRIBE
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-6 mb-3 !ps-0">
              <div className="text-center h-100 flex flex-col justify-between bg-white  rounded-md !border !border-tertiary_clr p-3">
                <div className="flex flex-col items-center">
                  <PlanHandIcon />
                  <h5 className="mb-2 mt-3 text-primary_clr font-medium text-lg sm:text-xl lg:text-2xl">
                    Go Cliq Annual
                  </h5>
                  <p className="text-[13px] text-tertiary_clr rounded-2xl  !bg-secondry_clr px-2 py-1">
                    FOR 12 MONTHS
                  </p>
                </div>
                <div className="card-body flex flex-col justify-between">
                  <div>
                    <div className=" flex justify-center gap-1 text-primary_clr">
                      ₹
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl mb-0 text-tertiary_clr ">
                        1167{" "}
                        <span className="text-sm text-primary_clr">/ month</span>
                      </h3>
                    </div>
                    <p className="text-muted ms-2 text-primary_clr">
                      (Excluding GST)
                    </p>
                    <ul className="list-unstyled">
                      <li className="text-sm pb-3 text-primary_clr">
                        7 Broker(s) Allowed
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        LTP Limit order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Keyboard Shortcuts
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Basket Order
                      </li>

                      <li className="text-sm pb-3 text-primary_clr">
                        Place Unlimited Qty
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        All Market Order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        MTM Target And SL
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Take trade on single click
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Multiple Broker at single place (1 Broker at a time)
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Close All Positions
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Trailing SL & Manual SL
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Live MTM update
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Predefined Auto SL & Target
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Limit order
                      </li>
                      <li className="text-sm pb-3 text-primary_clr">
                        Email Support Only
                      </li>
                    </ul>
                  </div>
                  <Link to={"price"} className="btn_dark text-sm">
                    SUBSCRIBE
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="text-center pt-3 bg-white shadow-sm rounded-lg px-2">
            <h5 className="text-lg md:text-xl text-primary_clr">Disclaimer</h5>
            <p className="text-base text-primary_clr">
              Although information has been obtained from and is based upon
              sources we believe to be reliable, we do not guarantee its
              accuracy and the information may be incomplete or condensed. All
              opinions and estimates constitute our judgment as of the date of
              the report and are subject to change without notice. This report
              is for informational purposes only and none of the stock
              information, data and company information presented herein
              constitutes a legally binding recommendation or a solicitation of
              any offer to buy or sell any securities. Information presented is
              general information that does not take into account your
              individual circumstances, financial situation, or needs, nor does
              it present a personalized recommendation to you. Individual stocks
              presented may not be suitable for you.
            </p>
            <p className="text-base text-primary_clr border-b pb-3">
              Any opinions, chats, messages, news, research, analyses, prices,
              or other information contained on this Website are provided as
              general market information for educational and entertainment
              purposes only, and do not constitute investment advice. The
              Website should not be relied upon as a substitute for extensive
              independent market research before making your actual trading
              decisions. Opinions, market data, recommendations or any other
              content is subject to change at any time without notice. Options
              Scalping Private Limited will not accept liability for any loss or
              damage, including without limitation any loss of profit, which may
              arise directly or indirectly from use of or reliance on such
              information. Options Scalping Private Limited is a research and
              information company and not investment/trading adviser. Please
              consult an adviser about the appropriateness of your
              investment/trading decisions.
            </p>
            <div className="text-center mt-3 pb-3">
              <h5 className="text-lg md:text-xl text-primary_clr">Note</h5>
              <p className="text-base text-primary_clr font-semibold w-[82%] mx-auto">
                We are not SEBI Registered Advisor and We are NOT responsible
                for your trading profits/losses if you use our charts and data
                for trading. Please consult your investment advisor.
              </p>

              <small className="text-base text-primary_clr">
                Monthly subscription means 30 days of subscription period.
              </small>

              <br />
              <p className="text-base text-primary_clr mt-3">
                All Plans are under 18% GST.
              </p>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default PricePlan;
