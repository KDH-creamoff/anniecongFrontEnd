import { useState } from "react";

const ImageTemplate36 = () => {
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
    <div className="w-[210mm] mx-auto py-[10mm] px-[10mm] bg-white box-border">
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
                주방 씽크대 (거름망) 1
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                주방 씽크대 (거름망) 2
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
                건조대
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                살균기 내부
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
                반죽기
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                육절기
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
                오븐 내부
              </td>
              <td className="border border-black p-3 text-center align-middle font-bold" style={{ height: "50px" }}>
                오븐 외부
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageTemplate36;
