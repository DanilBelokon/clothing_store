import { useState } from "react";

function Categories(props) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (key) => {
    setActiveCategory(key);
    props.chooseCategory(key);
  };

  return (
    <div className="categories">
      <span>{props.nameFilter}</span>
      {props.categories.map((el) => (
        <div
          key={el.key}
          onClick={() => handleCategoryClick(el.key)}
          className={activeCategory === el.key ? "active" : ""}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
}

export default Categories;
