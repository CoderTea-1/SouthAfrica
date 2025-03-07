import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateDemographicForm } from "../actions"; // Redux action
import "../scss/DemographicForm.scss"; // Optional, make sure you have the SCSS file

const DemographicForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    education: "",
    city: "",
    ethnicity: "",
    politicalAffiliation: "",
    income: "",
    consentProject: false,
    consentResearch: false,
    otherGender: "", // Add a field for 'Other' gender input
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let tempErrors = {};

    if (formData.age && (isNaN(formData.age) || Number(formData.age) <= 0)) {
      tempErrors.age = "Age must be a positive number";
    }

    if (formData.income && (isNaN(formData.income) || Number(formData.income) < 0)) {
      tempErrors.income = "Income must be a positive number";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = type === "checkbox" ? checked : value;

    if (name === "age" || name === "income") {
      newValue = newValue.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    console.log("Form Data Submitted:", formData);

    dispatch(updateDemographicForm(formData));

    history.push("/test/power-happiness");
  };

  return (
    <div className="container">
      <h4 className="center-align">Demographic Information</h4>
      <form onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="card">
          <div className="card-content">
            <label>What is your gender?</label>
            <select
              className="browser-default styled-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Show a textbox if "Other" is selected */}
            {formData.gender === "other" && (
              <div>
                <label htmlFor="otherGender">Please specify:</label>
                <input
                  type="text"
                  id="otherGender"
                  name="otherGender"
                  value={formData.otherGender}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Age */}
        <div className="card">
          <div className="card-content">
            <label htmlFor="age">What is your age?</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="error-text">{errors.age}</p>}
          </div>
        </div>

        {/* Education */}
        <div className="card">
          <div className="card-content">
            <label>What is your highest level of education?</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="browser-default styled-select"
            >
              <option value="">Select...</option>
              {[
                "No Education",
                "Primary School",
                "Secondary School",
                "Vocational School",
                "High School",
                "Associate Degree",
                "Bachelor's Degree",
                "Master's Degree",
                "Doctoral Degree",
              ].map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City */}
        <div className="card">
          <div className="card-content">
            <label htmlFor="city">What city do you live in?</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Ethnicity */}
        <div className="card">
          <div className="card-content">
            <label>Ethnicity</label>
            <select
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
              className="browser-default styled-select"
            >
              <option value="">Select...</option>
              {[
                "White South African",
                "Black South African",
                "Colored South African",
                "Asian South African",
                "Congolese",
                "Kenyans",
                "Mozambicans",
                "Nigerians",
                "Somalian",
                "Zimbabwean",
                "Indian",
                "Bangladeshi",
                "Italian",
                "British",
              ].map((eth) => (
                <option key={eth} value={eth}>
                  {eth}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Political Affiliation */}
        <div className="card">
          <div className="card-content">
            <label>Political Affiliation</label>
            <select
              name="politicalAffiliation"
              value={formData.politicalAffiliation}
              onChange={handleChange}
              className="browser-default styled-select"
            >
              <option value="">Select...</option>
              {[
                "Did not vote",
                "ACTIONSA",
                "ACDP",
                "ANC",
                "ATM",
                "ALJAMA",
                "BOSA",
                "DA",
                "EFF",
                "VF+",
                "GOOD",
                "IFP",
                "CCC",
                "PAC",
                "PA",
                "RISE",
                "MK",
                "UAT",
                "UDM",
              ].map((party) => (
                <option key={party} value={party}>
                  {party}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Income */}
        <div className="card">
          <div className="card-content">
            <label htmlFor="income">
              How much money do you make in a year?
            </label>
            <input
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="R0"
            />
            {errors.income && <p className="error-text">{errors.income}</p>}
          </div>
        </div>

        {/* Consent Information */}
        <div className="card">
          <div className="card-content">
            <p style={{ textAlign: "justify" }}>
              {/* Consent details */}
            </p>
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="card">
          <div className="card-content">
            <label>
              <input
                type="checkbox"
                name="consentProject"
                checked={formData.consentProject}
                onChange={handleChange}
              />
              <span>I consent to participate in this project</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="consentResearch"
                checked={formData.consentResearch}
                onChange={handleChange}
              />
              <span>I consent to my responses being used in research</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="center-align">
          <button
            type="submit"
            className="red-btn waves-effect waves-light red"
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  );
};

export default DemographicForm;
