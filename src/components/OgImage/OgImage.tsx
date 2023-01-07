import { FC } from "react";

type Props = {
  title: string;
};

export const OgImage: FC<Props> = ({ title }) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(148 163 184)",
        width: "100%",
        height: "100%",
        padding: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFF",
          padding: "24px 40px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "4px",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: "88px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {decodeURI(title)}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <p style={{ fontSize: "32px" }}>ytakhs.com</p>
        </div>
      </div>
    </div>
  );
};
