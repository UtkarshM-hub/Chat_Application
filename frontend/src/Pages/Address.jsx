import React, { useEffect, useState } from "react";
import AddressForm from "../Components/Settings/AddressForm/JS/AddressForm";
import SettingsHeader from "../Components/UI/SettingsHeader/JS/SettingsHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../Store/store";
import AddressContainer from "../Components/Settings/AddressContainer/JS/AddressContainer";

const Address = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [State, setState] = useState("");
  const [District, setDistrict] = useState("");
  const [PinCode, setPinCode] = useState(0);
  const [Phone, setPhone] = useState(0);
  const Settings = useSelector((state) => state.Settings);

  useEffect(() => {
    GetSettings();
  }, []);
  const GetSettings = async () => {
    await axios
      .post(
        "http://localhost/users/getSettingsHandler",
        JSON.stringify({ userId: userId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => dispatch(ChatActions.SetSettings(res.data)));
  };

  const SaveFormHandler = async () => {
    if (
      FirstName !== "" &&
      LastName !== "" &&
      Address !== "" &&
      State !== "" &&
      District !== "" &&
      PinCode !== 0 &&
      Phone !== 0 &&
      PinCode.length === 6 &&
      Phone.length === 10
    ) {
      const data = {
        FirstName,
        LastName,
        Address,
        State,
        District,
        PinCode,
        Phone,
      };
      await axios
        .post(
          "http://localhost/users/AddAddress",
          JSON.stringify({ userId: userId, data: data }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => dispatch(ChatActions.AddAddressHandler(res.data)));
    }
  };

  console.log(Settings.GeneralDetails.Addresses);
  const [Checked, setChecked] = useState();
  return (
    <div>
      {Settings.GeneralDetails.Addresses !== undefined && (
        <>
          <SettingsHeader
            saveHandler={SaveFormHandler}
            Header="Address"
            Text="Update your Address details"
          />
          {Settings !== undefined &&
            Settings.GeneralDetails.Addresses.map((item) => {
              return (
                <AddressContainer
                  key={item._id}
                  _id={item._id}
                  Name={item.FirstName + " " + item.LastName}
                  Address={item.Address}
                  checked={setChecked}
                  checkedValue={Checked}
                  Selected={Settings.GeneralDetails.SelectedAddress}
                />
              );
            })}
          {Settings !== undefined && (
            <AddressForm
              firstName={FirstName}
              LastName={LastName}
              Address={Address}
              State={State}
              District={District}
              PinCode={PinCode}
              Phone={Phone}
              setName={setFirstName}
              setLastName={setLastName}
              setAddress={setAddress}
              setState={setState}
              setDistrict={setDistrict}
              setPinCode={setPinCode}
              setPhone={setPhone}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Address;
