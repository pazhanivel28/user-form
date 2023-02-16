import React from "react";
export const Comment = ({
  id,
  root,
  setRoot,
  commentMessage,
  // child,
  // parent,
  showCommentBoxInitial,
}) => {
  //   console.log(id, root, commentMessage, showCommentBoxInitial);
  const [comment, setComment] = React.useState("");
  const [showCommentBox, setShowCommentBox] = React.useState(
    showCommentBoxInitial ? showCommentBoxInitial : false
  );

  const findParentAndAddChild = (comments, parent, commentMessage) => {
    console.log("comment", comments, parent, commentMessage);
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
          child: [
            ...comment.child,
            {
              id: Date.now(),
              commentMessage: commentMessage,
              child: [],
              parent: comment.id,
            },
          ],
        };
      } else {
        return {
          ...comment,
          child: findParentAndAddChild(comment.child, parent, commentMessage),
        };
      }
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    let updatedRoot = [...root];
    if (id === "root") {
      console.log("Hii");
      updatedRoot.push({
        id: Date.now(),
        commentMessage: comment,
        child: [],
        parent: "root",
      });
    } else {
      console.log("root", root, id, comment);
      updatedRoot = findParentAndAddChild(root, id, comment);
    }

    setRoot(updatedRoot);
    setComment("");

    !showCommentBoxInitial && setShowCommentBox(false);
  };

  const handleClick = (e) => {
    setShowCommentBox((showCommentBox) => !showCommentBox);
  };

  return (
    <>
      <p>{commentMessage}</p>
      {showCommentBox ? (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" disabled={comment.length === 0 ? true : false}>
            Submit
          </button>
        </form>
      ) : (
        <button onClick={handleClick}>Reply</button>
      )}
    </>
  );
};
