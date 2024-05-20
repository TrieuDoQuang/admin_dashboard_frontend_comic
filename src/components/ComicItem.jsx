import { useState } from "react";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicItem = ({ comics }) => {
  return (
    <div className="grid overflow-x-auto overflow-auto max-h-screen grid-cols-3 gap-3 ml-5 p-5">
      {comics &&
        comics.map((comic) => (
          <Link
            to={`/comic/${comic.name}/chapter/${comic.id}`}
            key={comic.id}
            className="w-full border-2 rounded-lg p-4 shadow-sm gap-2"
          >
            <div
              className="w-80 h-80 bg-contain bg-no-repeat bg-center rounded-sm"
              style={{ backgroundImage: `url(${comic.thumbnailUrl})` }}
            ></div>
            <div className="flex flex-col mt-4 gap-2 items-start justify-center">
              <div className="text-xl font-bold">Title: {comic.name}</div>
              <div className="text-lg text-center hover:font-bold">
                Author: {comic.author}
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">Genre:</div>
                {comic.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="text-lg text-center flex flex-row hover:font-bold"
                  >
                    <div> {genre.name}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faEye} className=" mr-2" />
                <div className="text-2xl font-bold">{comic.view}</div>
              </div>
              <div>
                <span className="font-bold"> Description: </span>
                <span className=""> {comic.description}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ComicItem;
