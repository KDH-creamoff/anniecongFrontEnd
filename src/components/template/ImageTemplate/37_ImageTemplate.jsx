import { useState, useRef } from "react";

const ImageTemplate37 = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [formData, setFormData] = useState({
    topLeftImage: null,
    topRightImage: null,
    middleLeftImage: null,
    middleRightImage: null,
    bottomLeftImage: null,
    bottomRightImage: null,
  });

  const handleImageChange = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div ref={contentRef} className="w-[210mm] mx-auto py-[10mm] px-[10mm] bg-white box-border">
      <div className="w-full h-full">
        <table className="w-full border-collapse border-2 border-black">
          <tbody>
            <tr>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px", width: "50%" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("topLeftImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.topLeftImage ? (
                    <img
                      src={formData.topLeftImage}
                      alt="상단 좌측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px", width: "50%" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("topRightImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.topRightImage ? (
                    <img
                      src={formData.topRightImage}
                      alt="상단 우측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
            </tr>

            <tr>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                주방 전체
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                주방 전체
              </td>
            </tr>

            <tr>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("middleLeftImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.middleLeftImage ? (
                    <img
                      src={formData.middleLeftImage}
                      alt="중간1 좌측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("middleRightImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.middleRightImage ? (
                    <img
                      src={formData.middleRightImage}
                      alt="중간1 우측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
            </tr>

            <tr>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                냉동고 내부 
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                비품진열대
              </td>
            </tr>

            <tr>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("bottomLeftImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.bottomLeftImage ? (
                    <img
                      src={formData.bottomLeftImage}
                      alt="중간2 좌측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("bottomRightImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.bottomRightImage ? (
                    <img
                      src={formData.bottomRightImage}
                      alt="중간2 우측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
            </tr>

            <tr>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                진공포장기
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                쓰레기통
              </td>
            </tr>

                        <tr>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("bottomLeftImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.bottomLeftImage ? (
                    <img
                      src={formData.bottomLeftImage}
                      alt="하단 좌측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
              <td className="border border-black p-0 text-center align-middle relative" style={{ height: "250px" }}>
                <label className="cursor-pointer flex items-center justify-center h-full w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange("bottomRightImage", e.target.files[0])}
                    className="hidden"
                  />
                  {formData.bottomRightImage ? (
                    <img
                      src={formData.bottomRightImage}
                      alt="하단 우측 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">이미지 선택</span>
                  )}
                </label>
              </td>
            </tr>

            <tr>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                냉장고 1
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                냉장고 2
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageTemplate37;
