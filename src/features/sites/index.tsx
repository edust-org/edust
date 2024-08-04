import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Sites = () => {
  const params = useParams();
  console.log(params);
  const [htmlData, setHtmlData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/organization_page/f634")
      .then((data) => setHtmlData(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (htmlData?.css) {
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = htmlData.css;

      document.head.appendChild(style);
    }
  }, [htmlData?.css]);

  return (
    <>
      {htmlData && (
        <div dangerouslySetInnerHTML={{ __html: htmlData?.html }}></div>
      )}
    </>
  );
};
