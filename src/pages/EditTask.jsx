import { Link, useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/images/backIcon.png";
import Dropdown from "../components/Dropdown";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";

const EditTask = ({ baseURL }) => {
  const { id } = useParams();

  const { data, loading } = useFetch(`${baseURL}/api/task/edit/${id}`);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setTags(data.tags);
    }
  }, [data]);

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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`${baseURL}/api/task/edit/${id}`, options);

    const responseData = await res.json();

    if (res.status === 200) {
      toast.success(responseData.message);
      navigate("/tasks");
    } else {
      toast.error("Something went wrong");
    }
    setSending(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="d-flex gap-2 text-start">
        <img style={{ cursor: "pointer" }} src={backIcon} alt="" />
        <p className="fs-3 fw-semibold mb-0">Edit Task</p>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="d-flex flex-column gap-5 py-5"
      >
        <div className="position-relative">
          <label
            htmlFor=""
            className="position-absolute start-0 ms-3 px-2 text-secondary fw-semibold  bg-white"
          >
            Task Title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="title"
            value={title}
            className="w-100 border p-3 rounded-3 ps-4"
            type="text"
            placeholder="E.g Project Defense, Assignment ..."
          />
        </div>
        <div className="position-relative">
          <label
            htmlFor=""
            className="position-absolute start-0 ms-3 px-2 text-secondary fw-semibold bg-white"
          >
            Description
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="Description"
            value={description}
            placeholder="Briefly describe your task"
            className="w-100 border p-3 rounded-3 ps-4"
            name=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="position-relative">
          <label
            htmlFor=""
            className="position-absolute start-0 ms-3 px-2 text-secondary fw-semibold bg-white"
          >
            Tags
          </label>
          <Dropdown setTags={setTags} initialTag={tags} />
        </div>
        <button
          disabled={sending}
          className="w-100 btn bg-purple text-white fw-semi-bold"
        >
          Done
        </button>
      </form>

      <Link>Back To Top</Link>
    </div>
  );
};

export default EditTask;
