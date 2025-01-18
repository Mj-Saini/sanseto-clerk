import { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const AdminForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("Select Payment Method");

  const handleDropdownClick = (e) => {
    e.preventDefault();
  };

  const handleDropdownItemClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="mx-auto mt-5 w-full md:w-2/5">
      <MDBRow>
        <MDBCol className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="pt-3 border-0">
              <MDBTypography
                tag="h5"
                className="font-bold text-lg lg:text-xl text-black mb-0 z-10 relative flex justify-between items-center"
              >
                Add Broker
                <span
                  onClick={() => {
                    // Handle close logic here
                  }}
                  className="text-4xl text-primary_clr cursor-pointer"
                >
                  {" "}
                  &times;
                </span>
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody className="pt-0">
              <form>
              <div className="mb-4">
                  {/* Dropdown with Input */}
                  <MDBDropdown onClick={handleDropdownClick} className="w-full">
                    <MDBDropdownToggle
                      className="w-full text-left"
                      color="primary"
                    >
                      {selectedValue || "Select or Enter a Payment Method"}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="w-full p-3">
                      {/* Input Field */}
                      <MDBInput
                        label="Enter payment method"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="mb-3"
                      />
                      {/* Dropdown Items */}
                      <MDBDropdownItem
                        link
                        onClick={() => handleDropdownItemClick("Credit Card")}
                      >
                        Credit Card
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={() => handleDropdownItemClick("PayPal")}
                      >
                        PayPal
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={() => handleDropdownItemClick("Bank Transfer")}
                      >
                        Bank Transfer
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label="First name" type="text" />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Last name" type="text" />
                  </MDBCol>
                </MDBRow>

                <MDBInput label="Company name" type="text" className="mb-4" />
                <MDBInput label="Address" type="text" className="mb-4" />
                <MDBInput label="Email" type="text" className="mb-4" />
                <MDBInput label="Phone" type="text" className="mb-4" />
                <MDBTextArea
                  label="Additional information"
                  rows={4}
                  className="mb-4"
                />

                <div className="flex gap-3">
                  <MDBBtn size="lg" block className="btn_light">
                    cancel
                  </MDBBtn>
                  <MDBBtn size="lg" block className="m-0 btn_dark">
                    submit
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default AdminForm;
