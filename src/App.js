import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import SearchPanel from "./components/SearchPanel";
import categoriesType from "./data/categoriesType";
import categoriesSex from "./data/categoriesSex";
import itemsData from "./data/itemsData";
import StyleTest from "./components/styleTest/StyleTest";
import { results } from "./data/result";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState(itemsData); // eslint-disable-line no-unused-vars
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

  // Инициализация текущих товаров
  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const applyStyleFilter = (recommendedItems) => {
    const filteredItems = itemsData.filter((item) =>
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

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((el) => el.id !== id));
  };

  const addToOrder = (item) => {
    const isInArray = orders.some((el) => el.id === item.id);
    if (!isInArray) {
      setOrders((prev) => [...prev, item]);
    }
  };

  return (
    <div className="wrapper">
      <Header orders={orders} onDelete={deleteOrder} />
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
      <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder} />
      {showFullItem && (
        <ShowFullItem
          onAdd={addToOrder}
          onShowItem={onShowItem}
          item={fullItem}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
