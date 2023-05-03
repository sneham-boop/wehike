import React from "react";
import "./Footer.css";
// import Heart from "@mui/icons-material/FavoriteRounded";

export default function Footer() {
  // const btnText = "GO UP";
  // const handleScroll = () => {
  //   const element = document.getElementById("navbar");
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <footer className="footer">
      <section className="made-by">
        <span>Made with </span>
        <span className="material-symbols-rounded">favorite</span>
        <span>
          by{" "}
          <a href="https://snehakmahajan.com/" target="_blank" rel="noopener noreferrer">
            Sneha Mahajan
          </a>
        </span>
      </section>
      <p className="coolers-text">
        Inspired by the{" "}
        <a href="https://www.parkrun.ca/" target="_blank" rel="noopener noreferrer">
          Parkrun Community
        </a>
      </p>
    </footer>
  );
}
