"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Button from "./button";
import MyTextArea from "./textArea";
import randomColor from "randomcolor";
import moment from "moment-timezone";

const url = process.env.NEXT_PUBLIC_BKEND_URL;
export default function CommentsSection({ parentObject, collaborator }) {
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState(parentObject?.collaboratorComments);

  useEffect(() => {
    const withBgColors = comments?.map((c, i) => {
      c.bgColor = randomColor({ luminosity: "dark", alpha: "0.1" });
      return c;
    });
    setComments(withBgColors);
  }, []);

  function commentOnFile() {
    let collaboratorComment = {
      collaborator: collaborator?._id,
      comment,
    };

    let _fullCollaboratorComment = {
      collaborator,
      comment,
      bgColor: randomColor({ luminosity: "dark", alpha: "0.1" }),
    };

    let collaboratorComments = parentObject?.collaboratorComments
      ? [...parentObject?.collaboratorComments]
      : [];

    let _fullCollaboratorComments = parentObject?.collaboratorComments
      ? [...parentObject?.collaboratorComments]
      : [];

    collaboratorComments.push(collaboratorComment);
    _fullCollaboratorComments.push(_fullCollaboratorComment);
    parentObject.collaboratorComments = collaboratorComments;

    fetch(`${url}/filings/${parentObject._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        updates: parentObject,
        justAComment: true,
        newComment: _fullCollaboratorComment,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((res) => {
        setComments(_fullCollaboratorComments);
        _fullCollaboratorComments?.forEach((f) => {
          let c = getDarkColor;
          colors.push(c);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  return (
    <>
      <div className="mt-5">
        <div className="text-sm font-bold mb-5">Comments</div>
        <div className="flex flex-row space-x-3">
          <div className="w-8 h-8 text-xxs rounded-full items-center justify-center flex text-white p-1 bg-gray-600">
            {collaborator?.firstName?.toUpperCase()?.substring(0, 1)}
            {collaborator?.lastName?.toUpperCase()?.substring(0, 1)}
          </div>
          <div className="flex-grow flex-col space-y-2">
            <MyTextArea
              placeholder="Add comment"
              onChange={(e) => setComment(e)}
            />
            <Button onClick={commentOnFile}>
              <div className="text-xs flex flex-row items-center justify-center space-x-1">
                <div>Save</div>{" "}
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {comments?.map((c, i) => {
          return (
            <div key={i} className="flex flex-row mb-10 space-x-3">
              <div
                style={{ backgroundColor: c.bgColor }}
                className={`w-8 h-8 text-xxs rounded-full items-center justify-center flex text-white p-1`}
              >
                {c?.collaborator?.firstName?.toUpperCase()?.substring(0, 1)}
                {c?.collaborator?.lastName?.toUpperCase()?.substring(0, 1)}
              </div>
              <div className="flex flex-col space-y-3">
                <div className="text-xxs text-gray-500 font-bold">
                  {c?.collaborator?.firstName} {c?.collaborator?.lastName}
                </div>

                <div className="text-xxs text-gray-500">{c?.comment}</div>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="text-xxs text-gray-500">
                  {moment(c.createdAt).fromNow()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
