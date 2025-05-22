import Item from "./Item";

function Items(props) {
  return (
    <main>
      {props.items.map((el) => (
        <Item
          onShowItem={props.onShowItem}
          key={el.id}
          item={el}
          onAdd={props.onAdd}
        />
      ))}
    </main>
  );
}

export default Items;
