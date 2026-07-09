import { useState } from "react";
import "./Styles/tabNavigation.css"

export function TabNavigation() {
    const [selected, setSelected] = useState("inicio");

  return (
    <div className="a-tab-navigation__wrapper">
      <ul className="a-tab-navigation">
        <li className="a-tab-navigation__item">
          <button
            className={`a-tab-navigation__tab ${
              selected === "inicio" ? "-selected" : ""
            }`}
            onClick={() => setSelected("inicio")}
          >
            <span className="a-tab-navigation__tab-content">
              <span className="a-tab-navigation__label">Início</span>
            </span>
          </button>
        </li>

        <li className="a-tab-navigation__item">
          <button
            className={`a-tab-navigation__tab ${
              selected === "produtos" ? "-selected" : ""
            }`}
            onClick={() => setSelected("produtos")}
          >
            <span className="a-tab-navigation__tab-content">
              <span className="a-tab-navigation__label">Produtos</span>
            </span>
          </button>
        </li>

        <li className="a-tab-navigation__item">
          <button
            className={`a-tab-navigation__tab ${
              selected === "servicos" ? "-selected" : ""
            }`}
            onClick={() => setSelected("servicos")}
          >
            <span className="a-tab-navigation__tab-content">
              <span className="a-tab-navigation__label">Serviços</span>
            </span>
          </button>
        </li>

        <li className="a-tab-navigation__item">
          <button
            className={`a-tab-navigation__tab ${
              selected === "contato" ? "-selected" : ""
            }`}
            onClick={() => setSelected("contato")}
          >
            <span className="a-tab-navigation__tab-content">
              <span className="a-tab-navigation__label">Contato</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}