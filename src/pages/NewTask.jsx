import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/backIcon.png";
import Dropdown from "../components/Dropdown";
import toast from "react-hot-toast";

const NewTask = ({ baseURL }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("Urgent");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setSending(true);
    e.preventDefault();

    const formData = {
      title,
      description,
      tags,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${baseURL}/api/task/create`, options);

    const data = await res.json();

    if (res.status === 400) {
      toast.error(data.message);
      setSending(false);
      return;
    }

    toast.success(data.message);
    setSending(false);
    navigate("/tasks");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="d-flex gap-2 text-start">
        <img
          style={{ cursor: "pointer" }}
          onClick={handleGoBack}
          src={backIcon}
          alt=""
        />
        <p className="fs-3 fw-semibold mb-0">New Task</p>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="d-flex flex-column gap-5 py-5"
      >
        <div className=" position-relative">
          <label
            htmlFor=""
            className=" position-absolute start-0 ms-3 px-2 text-secondary fw-semibold bg-white"
          >
            Task Title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-100 border p-3 rounded-3 ps-4"
            type="text"
            placeholder="E.g Project Defense, Assignment ..."
          />
        </div>

        <div className="position-relative">
          <label
            htmlFor=""
            className=" position-absolute start-0 ms-3 px-2 text-secondary fw-semibold bg-white"
          >
            Description
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Breifly describe your task"
            className="w-100 border p-3 rounded-3 ps-4"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div className=" position-relative">
          <label
            htmlFor=""
            className=" position-absolute start-0 ms-3 px-2 text-secondary fw-semibold bg-white"
          >
            Tags
          </label>
          {<Dropdown setTag={setTags} />}
        </div>

        <button
          disabled={sending}
          className="w-100 btn bg-purple text-white fw-semibold"
        >
          Done
        </button>
      </form>

      <div className="my-2">
        <a href="#top"> Back to top</a>
      </div>
    </div>
  );
};

export default NewTask;