import Item from "./Item";

function Items(props) {
  return (
    <main>
      {props.items.map((el) => (
        <Item onShowItem={props.onShowItem} key={el.id} item={el} />
      ))}
    </main>
  );
}

export default Items;
