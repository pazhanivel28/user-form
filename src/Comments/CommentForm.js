import { useState } from "react";

function CommentForm({ comments, setComments, value, index, id, parent }) {
  const [text, setText] = useState("");
  const [activeReply, setActiveReply] = useState(false);
  const handleInput = (e) => {
    setText(e.target.value);
  };

  const findParentAndAddChild = (comments, parent, commentMessage) => {
    // console.log("In findParentAndAddChild");
    if (comments.length === 0) {
      return [];
    }

    return comments.map((comment) => {
      //   console.log("comment: ", comment, "parent: ", parent);

      if (comment.id === parent) {
        // console.log("matched");
        return {
          ...comment,
          nestComment: [
            ...comment.nestComment,
            {
              id: Date.now(),
              commentMessage: commentMessage,
              nestComment: [],
              parent: comment.id,
            },
          ],
        };
      } else {
        return {
          ...comment,
          nestComment: findParentAndAddChild(
            comment.nestComment,
            parent,
            commentMessage
          ),
        };
      }
    });
  };

  const handleSubmit = () => {
    let updatedRoot = findParentAndAddChild(comments, id, text);
    setComments(updatedRoot);
  };

  const findParentAndDeleteComment = (comments, id, parent) => {
    if (comments.length === 0) {
      return [];
    }
    // console.log(id, comments, parent);
    if (parent === "root") {
      let deletedRest = comments.filter((values) => values.id !== id);
      return deletedRest;
    }
    let unDeletedRest = comments.filter((values) => values.id === id);
    if (unDeletedRest.length) {
      let deletedRest = comments.filter((values) => values.id !== id);
      return deletedRest;
    }

    return comments.map((comment) => {
      if (comment.id !== id) {
        return {
          ...comment,
          nestComment: findParentAndDeleteComment(
            comment.nestComment,
            id,
            parent
          ),
        };
      }
    });
  };
  const deleteComment = () => {
    let updatedRoot = findParentAndDeleteComment(comments, id, parent);
    console.log(updatedRoot);
    setComments(updatedRoot);
  };
  return (
    <div>
      <button
        onClick={() => {
          activeReply ? setActiveReply(false) : setActiveReply(true);
        }}
      >
        Add reply
      </button>

      <button onClick={deleteComment}>Delete</button>
      {activeReply && (
        <div>
          <input type="text" name="name" onChange={handleInput}></input>
          <button
            disabled={text.length === 0 ? true : false}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
export default CommentForm;
