import React, { useEffect, useState } from "react";
import classes from "../CSS/AddressForm.module.css";
import data from "../../../../utils/States.json";

const AddressForm = ({
  firstName,
  LastName,
  Address,
  PinCode,
  Phone,
  setName,
  setLastName,
  setAddress,
  setState,
  setDistrict,
  setPinCode,
  setPhone,
}) => {
  const [SelectedState, setSelectedState] = useState(0);
  const [SelectedDistrict, setSelectedDistrict] = useState(0);

  useEffect(() => {
    setState(data.states[SelectedState].state);
    setDistrict(data.states[SelectedState].districts[SelectedDistrict]);
  }, [SelectedState, SelectedDistrict]);
  return (
    <div className={classes.AddressForm}>
      <form>
        <div className={classes.AddressForm_ElementContainer}>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              Firstname<span className={classes.AddressForm_Important}>*</span>
            </p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={firstName}
              type="text"
              placeholder="Enter First Name"
            />
          </div>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              Lastname<span className={classes.AddressForm_Important}>*</span>
            </p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={LastName}
              type="text"
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div className={classes.AddressForm_ElementContainer}>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              Street Address
              <span className={classes.AddressForm_Important}>*</span>
            </p>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={Address}
              type="text"
              placeholder="Enter the Address"
            />
          </div>
        </div>
        <div className={classes.AddressForm_ElementContainer}>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              State<span className={classes.AddressForm_Important}>*</span>
            </p>
            <select
              defaultValue={data.states[0].state}
              value={data.states[SelectedState].state}
              onChange={(e) => {
                setState(e.target.value);
                setSelectedState(e.target.selectedIndex);
              }}
            >
              {data.states.map((item) => (
                <option key={item.state} value={item.state}>
                  {item.state}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              District<span className={classes.AddressForm_Important}>*</span>
            </p>
            <select
              defaultValue={data.states[SelectedState].districts[0]}
              value={data.states[SelectedState].districts[SelectedDistrict]}
              onChange={(e) => {
                setDistrict(e.target.value);
                setSelectedDistrict(e.target.selectedIndex);
              }}
            >
              {data.states[SelectedState].districts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={classes.AddressForm_ElementContainer}>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              PinCode<span className={classes.AddressForm_Important}>*</span>
            </p>
            <input
              onChange={(e) => setPinCode(e.target.value)}
              value={PinCode}
              type="number"
              minLength="6"
              placeholder="Enter the Pin Code"
            />
          </div>
          <div className={classes.AddressForm_MainElementContainer}>
            <p>
              Phone Number
              <span className={classes.AddressForm_Important}>*</span>
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              type="number"
              minLength="10"
              placeholder="Enter the Phone number"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
