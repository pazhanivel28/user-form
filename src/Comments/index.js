import React, { useState } from "react";
import CommentForm from "./CommentForm";
function Comments() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const handleInput = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    const values = [
      ...comments,
      { id: Date.now(), commentMessage: text, nestComment: [], parent: "root" },
    ];
    setComments(values);
    setText("");
  };
  const CommentsRecursive = ({ value, index, initial }) => {
    return (
      <div>
        <ul>
          <div> {value.commentMessage}</div>

          <CommentForm
            comments={comments}
            value={value}
            setComments={setComments}
            index={index}
            initial={initial}
            parent={value.parent}
            id={value.id}
          />
        </ul>
        {value.nestComment && (
          <div>
            {value.nestComment.map((value, index) => {
              return (
                <div key={index}>
                  <ul>
                    <CommentsRecursive
                      value={value}
                      index={index}
                      initial={initial}
                    />
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <br />
      {/* <Comments /> */}
      Comment
      <input
        type="text"
        name="name"
        value={text}
        onChange={handleInput}
        placeholder="Add a comment.."
      ></input>
      <button
        disabled={text.length === 0 ? true : false}
        onClick={handleSubmit}
      >
        Comment
      </button>
      {comments.map((value, index) => {
        return (
          <div key={index}>
            <CommentsRecursive value={value} index={index} initial={value} />
          </div>
        );
      })}
    </div>
  );
}
export default Comments;
