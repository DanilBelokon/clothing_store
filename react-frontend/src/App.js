import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import SearchPanel from "./components/SearchPanel";
import StyleTest from "./components/styleTest/StyleTest";
import { results } from "./data/result";
import { removeFromCart } from "./api/cart";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    sex: "all",
  });
  const [currentItems, setCurrentItems] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState({});
  const [styleFilterActive, setStyleFilterActive] = useState(false);
  const [styleFilterResult, setStyleFilterResult] = useState(null);
  const [filteredByStyleItems, setFilteredByStyleItems] = useState([]);
  const [categoriesSex, setCategoriesSex] = useState([]);
  const [categoriesType, setCategoriesType] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getCategoriesType.php")
      .then((res) => res.json())
      .then((data) => setCategoriesType(data))
      .catch((err) =>
        console.error("Ошибка при получении типов категорий:", err)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/getCategoriesSex.php")
      .then((res) => res.json())
      .then((data) => setCategoriesSex(data))
      .catch((err) => console.error("Ошибка при получении категорий:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/getItems.php")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Ошибка при получении:", err));
  }, []);

  // Инициализация текущих товаров
  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const applyStyleFilter = (recommendedItems) => {
    const filteredItems = items.filter((item) =>
      recommendedItems.includes(item.id)
    );
    setFilteredByStyleItems(filteredItems);
    setStyleFilterActive(true);
    setStyleFilterResult(
      results.find(
        (r) =>
          JSON.stringify(r.recommendedItems) ===
          JSON.stringify(recommendedItems)
      )
    );
    applyFilters();
  };

  const resetStyleFilter = () => {
    setStyleFilterActive(false);
    setFilteredByStyleItems([]);
    setStyleFilterResult(null);
    applyFilters();
  };

  // Применение фильтров
  const applyFilters = useCallback(() => {
    let filtered = styleFilterActive ? [...filteredByStyleItems] : [...items];

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      filtered = filtered.filter((el) =>
        el.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтрация по категориям
    if (filters.category !== "all") {
      filtered = filtered.filter((el) => el.category === filters.category);
    }
    if (filters.sex !== "all") {
      filtered = filtered.filter((el) => el.sex === filters.sex);
    }

    setCurrentItems(filtered);
  }, [filters, items, searchQuery, styleFilterActive, filteredByStyleItems]); // Добавляем недостающие зависимости // Добавляем searchQuery в зависимости

  const toggleFilterActive = () => {
    setStyleFilterActive(!styleFilterActive);
  };

  // Эффект для применения фильтров
  useEffect(() => {
    applyFilters();
  }, [
    filters,
    searchQuery,
    styleFilterActive,
    filteredByStyleItems,
    applyFilters,
  ]); // Добавляем searchQuery в зависимости

  const onShowItem = (item) => {
    setFullItem(item);
    setShowFullItem((prev) => !prev);
  };

  const updateFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const deleteOrder = async (cartId) => {
    try {
      const res = await removeFromCart(cartId);
      if (res.success) {
        setOrders((prev) => prev.filter((el) => el.id !== cartId));
      } else {
        console.error("Ошибка при удалении:", res.error);
      }
    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  return (
    <div className="wrapper">
      <Header orders={orders} onDelete={deleteOrder} setOrders={setOrders} />
      <StyleTest
        onApplyFilter={applyStyleFilter}
        onResetFilter={resetStyleFilter}
        activeFilter={styleFilterResult}
        toggleFilterActive={toggleFilterActive}
        styleFilterActive={styleFilterActive}
      />
      <SearchPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Categories
        nameFilter="Тип одежды: "
        categories={categoriesType}
        chooseCategory={(key) => updateFilter("category", key)}
      />
      <Categories
        nameFilter="Пол: "
        categories={categoriesSex}
        chooseCategory={(key) => updateFilter("sex", key)}
      />
      <Items onShowItem={onShowItem} items={currentItems} />
      {showFullItem && (
        <ShowFullItem
          onShowItem={onShowItem}
          item={fullItem}
          setOrders={setOrders} // Добавьте это, если используете второй вариант
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
