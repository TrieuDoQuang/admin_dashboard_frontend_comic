import { memo, useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks";
const GetChapterImage = memo(() => {
  const [chapterImage, setChapterImage] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const fetchChapterImage = async () => {
    try {
      const response = await axiosPrivate.get(
        "http://comic.pantech.vn:8080/api/chapter/getChapter/1"
      );
      const data = response?.data?.result.imageUrls;
      console.log(data);
      setChapterImage(data);
    } catch (error) {
      console.error("Error fetching chapter images:", error);
    }
  };

  useEffect(() => {
    fetchChapterImage();
  }, []);
  return (
    <>
      <div className="py-12 w-[800px]">
        <div className="max-w-full mx-auto p-5 w-[800px] rounded border-2 shadow-lg bg-white">
          <h1 className="py-3 text-center text-2xl uppercase text-green-500">
            Preview Chapter Image
          </h1>
          <div className="grid grid-cols-1 gap-4 overflow-auto h-[800px]">
            {chapterImage &&
              chapterImage.map((image, index) => (
                <img
                  key={index}
                  src={`${image}`}
                  alt={`Chapter Image ${index}`}
                  className="w-full h-[800px] object-cover"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default GetChapterImage;
