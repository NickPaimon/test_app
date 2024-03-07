/* eslint-disable no-control-regex */
import React, { useState, useEffect } from "react";
import Popup from "../Popup";

function CreateUser({ setNewUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: null,
  });

  const [positions, setPositions] = useState([]);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState("");
  const [showPopup, setShowpopup] = useState(false);

  const validatePhoto = () => {
    const validTypes = ["image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (formData.photo) {
      if (!validTypes.includes(formData.photo.type)) {
        setErrors((prev) => ({
          ...prev,
          photo: "The photo must be a jpeg/jpg type",
        }));
      }

      if (formData.photo.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          photo: "The photo size must not be greater than 5 Mb",
        }));
      }

      const image = new Image();
      image.src = URL.createObjectURL(formData.photo);
      image.onload = () => {
        if (image.width < 70 || image.height < 70) {
          setErrors((prev) => ({
            ...prev,
            photo: "Minimum size of photo 70x70px",
          }));
        } else {
          setErrors((prev) => {
            const updatedErrors = { ...prev };
            delete updatedErrors.photo;
            return updatedErrors;
          });
        }
      };

      image.onerror = () => {
        URL.revokeObjectURL(image.src);
      };
    } else {
      setErrors((prev) => ({
        ...prev,
        photo: "Photo is required",
      }));
    }

    return true;
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 60
    ) {
      isValid = false;
      errors.name = "Username should contain 2-60 characters";
    }

    const emailRegex = new RegExp(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    );
    if (!emailRegex.test(formData.email)) {
      isValid = false;
      errors.email = "Must be a valid email";
    }

    const phoneRegex = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);
    if (!phoneRegex.test(formData.phone)) {
      isValid = false;
      errors.phone = "Must be a valid Ukrainian phone number";
    }

    if (!formData.position_id) {
      isValid = false;
      errors.position = "Please select a position.";
    }

    setErrors(errors);

    if (!validatePhoto()) {
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setPositions(data.positions);
        }
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
      });
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setToken(data.token);
        }
      })
      .catch((error) => {});
  }, []);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    if (!validateForm()) {
      console.log("submit");
      return;
    }

    const submissionFormData = new FormData();
    submissionFormData.append("position_id", formData.position_id);
    submissionFormData.append("name", formData.name);
    submissionFormData.append("email", formData.email);
    submissionFormData.append("phone", formData.phone);
    submissionFormData.append("photo", formData.photo);

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      body: submissionFormData,
      headers: {
        Token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowpopup(true);
          setNewUserAdded(true);
          setTimeout(() => {
            setShowpopup(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              position_id: "",
              photo: null,
            });
          }, 3000);
        } else {
          alert(data.message);
          console.log(data);
        }
      })
      .catch((error) => {
        // process network errors
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  return (
    <>
      <div
        id="#signUp"
        className="2xl:w-[1170px] lg:w-[1024px] md:w-[768px] w-[360px] bg-[rgb(245,245,245)] flex flex-col justify-center items-center"
      >
        <h1 className="text-[40px] leading-10 text-center pt-[60px]">
          Working with POST request
        </h1>
        <form
          onSubmit={handleSubmit}
          className="md:w-[380px] w-[328px] flex flex-col items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded mt-[20px] h-[54px] ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded mt-[20px] h-[54px] ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}

          <input
            type="tel"
            name="phone"
            placeholder="+38 (XXX) XXX - XX - XX"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded mt-[20px] h-[54px] ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && <div className="text-red-500">{errors.phone}</div>}
          <fieldset className="flex flex-col mt-[20px] self-start">
            <legend className="text-lg mb-4">Select your position</legend>
            {positions.map((position) => (
              <label key={position.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="position_id"
                  value={position.id}
                  onChange={handleInputChange}
                  checked={formData.position_id === String(position.id)}
                  className="text-blue-600 border-gray-300 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {position.name}
                </span>
              </label>
            ))}
          </fieldset>
          {errors.position && (
            <div className="text-red-500 text-sm mt-2">{errors.position}</div>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="photo"
              className="block mb-2 font-medium text-gray-700"
            >
              Upload your photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="photo"
                className="flex items-center justify-center px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-l-md cursor-pointer hover:bg-gray-50 h-[54px]"
              >
                Upload
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  className="sr-only"
                  accept=".jpg, .jpeg"
                  onChange={handleFileChange}
                />
              </label>
              <div className="flex-1 flex items-center border border-l-0 h-[54px] rounded-r-md px-2 border-gray-300 md:w-[310px] w-[250px]">
                {formData.photo ? formData.photo.name : "Upload your photo"}
              </div>
            </div>

            {errors.photo && (
              <p className="mt-2 text-sm text-red-600">{errors.photo}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-[100px] h-[34px] bg-[#F4E041] hover:bg-[#FFE302] flex justify-center items-center rounded-full cursor-pointer my-[20px]"
          >
            Sign up
          </button>
        </form>
      </div>
      <Popup show={showPopup} />
    </>
  );
}

export default CreateUser;
