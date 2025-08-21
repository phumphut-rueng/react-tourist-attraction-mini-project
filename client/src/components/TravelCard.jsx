import React from 'react';

function TravelCard({ title, description, imageUrl, url, tags, onTagClick }) {
  function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("คัดลอกลิงก์เรียบร้อยแล้ว!");
      })
      .catch((err) => {
        console.error("ไม่สามารถคัดลอกลิงก์ได้: ", err);
        alert("ไม่สามารถคัดลอกลิงก์ได้");
      });
  };

  return (
    <div className="flex flex-row justify-start w-full max-w-7xl px-2 py-4 bg-white shadow-lg rounded-lg mt-6 relative">
      <img
        src={imageUrl[0]}
        alt={title}
        className="h-72 w-92 object-cover rounded-3xl "
      />
      <div className="flex flex-col ml-8">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-bold text-gray-800 hover:cursor-pointer"
        >
          {title}
        </a>
        <p className="text-lg text-gray-600 mt-2">
          {truncateText(description, 100)}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          อ่านเพิ่มเติม
        </a>
        <div>
          หมวดหมู่:
          {tags && tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => onTagClick(tag)}
              className="text-gray-500 underline m-2 hover:cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-6 mt-4">
          {imageUrl.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={title}
              className="object-cover h-24 w-24 rounded-xl"
            />
          ))}
        </div>
        <button
          onClick={handleCopyLink}
          className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 focus:outline-none"
          title="คัดลอกลิงก์"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TravelCard;