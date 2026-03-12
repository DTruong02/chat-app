import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import multiavatar from "@multiavatar/multiavatar";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

const generateAvatarOptions = () =>
  Array.from({ length: 4 }, (_, index) => {
    const seed = `avatar-${Date.now()}-${index}-${Math.random()}`;
    const svg = multiavatar(seed);
    return btoa(svg);
  });

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      try {
        const user = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(user)
          );
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.msg || "Unable to save avatar right now.",
          toastOptions
        );
      }
    }
  };

  useEffect(() => {
    setAvatars(generateAvatarOptions());
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={avatar}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="avatar-button"
                    onClick={() => setSelectedAvatar(index)}
                    aria-label={`Select avatar ${index + 1}`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                    />
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar-button {
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
      }
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
