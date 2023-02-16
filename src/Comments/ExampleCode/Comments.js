import React from "react";
import { Comment } from "./Comment";
// const root = [
//   {
//     id: "c1",
//     commentMessage: "com1",
//     child: [
//       { id: "c1r1", commentMessage: "com1rep1", child: [], parent: "c1" },
//       { id: "c1r2", commentMessage: "com1rep2", child: [], parent: "c1" }
//     ],
//     parent: "root"
//   },
//   { id: "c2", commentMessage: "com2", child: [], parent: "root" }
// ];

export default function Comments() {
  const [root, setRoot] = React.useState([]);

  const printCommentStructure = (comments) => {
    return comments.map((comment) => {
      return (
        <li key={comment.id}>
          <Comment
            id={comment.id}
            root={root}
            setRoot={setRoot}
            commentMessage={comment.commentMessage}
            parent={comment.parent}
          />
          {comment.child.length > 0 ? (
            <ul>{printCommentStructure(comment.child)}</ul>
          ) : (
            <></>
          )}
        </li>
      );
    });
  };

  return (
    <>
      <p>Comments</p>
      <Comment
        id={"root"}
        root={root}
        setRoot={setRoot}
        showCommentBoxInitial={true}
        parent={"groot"}
      />
      <ul>{printCommentStructure(root)}</ul>
    </>
  );
}
