import { useState } from "react";
import { useEffect } from "react";

export default function Icon({ name, height = "40px", ...rest }) {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchIcon = async (filePath) => {
      const fetchedIcon = await import(
        /* @vite-ignore */
        filePath
      );

      setIcon(fetchedIcon.default);
    };

    fetchIcon(`../assets/${name.toLowerCase()}.svg`);
  }, []);

  return <img src={icon} alt={`${name}-icon`} height={height} {...rest} />;
}
