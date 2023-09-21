import React, { useEffect, useState } from "react";
import useFirestore from "../firebase/useFIrestore";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({ doc, setSelectedImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: doc.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <motion.li
      className="imgcard"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      layout
      whileHover={{ opacity: 1 }}
      onClick={() => setSelectedImage(doc.url)}
    >
      <motion.img
        src={doc.url}
        alt="uploaded pic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </motion.li>
  );
};

const Images = ({ setSelectedImage }) => {
  //   const { docs } = useFirestore("images");
  //   const { docs, setDocs } = useFirestore("images");
  const { docs } = useFirestore("images");

  const [docsState, setDocsState] = useState([]);

  useEffect(() => {
    setDocsState(docs);
  }, [docs]);
  // Define the onDragEnd function to handle the end of a drag operation
  const onDragEnd = (event) => {
    const { active, over } = event;
    // if (active?.id || "" === over?.id || "") {
    //     console.log(active?.id || 'active', over?.id || 'over');
    //   return;
    // }
    console.log(docsState);

    const oldIndex = (docsState ?? []).findIndex(
      (doc) => (doc?.id || "") === active.id
    );
    const newIndex = (docsState ?? []).findIndex(
      (doc) => (doc?.id || "") === over.id
    );

    //   const ol = docsState.find((docw, index) => {
    //     // console.log(index,docw);

    //     if (docw?.id || "" == active.id) {
    //       return true;
    //     }
    //   });
    //   let oldy = 0;
    //   docsState.forEach((item, i) => {
    //     if ((item?.id || "") == active.id) {
    //       console.log("found index", i, item.id);
    //       oldy = i;
    //       return;
    //     }
    //   });
    //   console.log("old", oldIndex, active.id, oldy);
    //   console.log("new", newIndex, over.id);

    let t = arrayMove(docsState, oldIndex, newIndex);
    console.log("t", t);
    // return t

    setDocsState(t);
  };

  //   useEffect(()=>{
  //     console.log('docsState',docsState)
  //   },[docsState])

  return (
    <ul className="imagecontainer">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={docsState} strategy={rectSortingStrategy}>
          {docsState &&
            docsState.map((doc) => (
              <SortableImage
                key={doc.id}
                doc={doc}
                setSelectedImage={setSelectedImage}
              />
            ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
};

export default Images;
